import React, { useState, useEffect, useRef } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { createCommentThunk, getCommentsByCardThunk } from "../../store/comments";
import UserComment from "../UserComment/UserComment";
import { deleteCardThunk, updateCardThunk } from "../../store/cards";
import { useModal } from "../../context/Modal";
import { readLists } from "../../store/lists";
import "draft-js/dist/Draft.css";
import "./CommentModal.css";

export default function CommentModal({
	boardId,
	cardId,
	listId,
	listName,
	cardName,
	cardDesc,
	cardComments,
	coverColor,
	setCoverColor,
}) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [name, setName] = useState(cardName);
	const [description, setDescription] = useState(cardDesc);
	const [list, setList] = useState(listId);
	const [showMenu, setShowMenu] = useState(false);
	const [clicked, setClicked] = useState(false);
	const [clicked2, setClicked2] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const colorOptions = ['#226e4f', '#7f5f01', '#a64800', '#ae2f24', '#5e4db2', '#0056cc', '#206a84', '#4d6b1f', '#953d73', '#596773' ]
	const [localCoverColor, setLocalCoverColor] = useState(coverColor)
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
		);
		const [editorState2, setEditorState2] = useState(() =>
		EditorState.createEmpty()
		);

	const lists = useSelector((state) => {
		return Object.values(state.lists);
	});

	const card = cardId;
	// console.log('CARDID', card);
	const id = boardId;
	const comments = useSelector((state) => state.comments) || cardComments;
	const userId = useSelector((state) => state.session.user.id);

	const payload = {
		name,
		description,
		listId: list,
	};

	const ulRef = useRef();

	const closeMenu = () => setShowMenu(false);

	// useEffect(() => {
	// 	setLocalCoverColor(coverColor)
	// }, [coverColor])

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			await dispatch(deleteCardThunk(card));
			closeModal();
			await dispatch(readLists(id));
		} catch (error) {
			console.log("hi");
			alert(error);
		}
	};

	const handleNameChange = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const handleListUpdate = async (listId) => {
		setList(listId);
		closeMenu();

		const payload = {
			name,
			description,
			listId: listId,
		};

		try {
			await dispatch(updateCardThunk(boardId, listId, cardId, payload));
			dispatch(readLists(id));
		} catch (error) {
			alert(error);
		}
	};

	const handleNameUpdate = async (e) => {
		e.preventDefault();
		try {
			await dispatch(updateCardThunk(boardId, listId, cardId, payload));
			await dispatch(readLists(id));
		} catch (error) {
			alert(error);
		}
	};

	console.log('description', description);
	const handleDescriptionUpdate = async (e) => {
		e.preventDefault();

		if (editorState.getCurrentContent().getPlainText().length > 255) {
			alert("Description must be less than 255 characters");
			return;
		}
		try {
			await setDescription(editorState.getCurrentContent().getPlainText("\u0001"));
			payload.description = editorState.getCurrentContent().getPlainText()
			await dispatch(updateCardThunk(boardId, listId, cardId, payload));
			await dispatch(readLists(id));
			setClicked(false);
		} catch (error) {
			alert(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newComment = editorState2.getCurrentContent().getPlainText();

		if (newComment.length > 100) {
			alert("Comment must be less than 100 characters");
			return;
		}

		const comment = {
			card_id: cardId,
			user_id: userId,
			comment: newComment,
		};

		await dispatch(createCommentThunk(cardId, comment));
		setEditorState2(EditorState.createEmpty());
		await dispatch(readLists(id));
	};

	const onBoldClick = () => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
	};
	const onBoldClick2 = () => {
		setEditorState2(RichUtils.toggleInlineStyle(editorState2, "BOLD"));
	};
	const onItalicClick = () => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
	};
	const onItalicClick2 = () => {
		setEditorState2(RichUtils.toggleInlineStyle(editorState2, "ITALIC"));
	};
	const onUnderlineClick = () => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
	};
	const onUnderlineClick2 = () => {
		setEditorState2(RichUtils.toggleInlineStyle(editorState2, "UNDERLINE"));
	};
	const onRedClick = () => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, "RED"));
	};
	const onRedClick2 = () => {
		setEditorState2(RichUtils.toggleInlineStyle(editorState2, "RED"));
	};
	const onHighlightClick = () => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
	};
	const onHighlightClick2 = () => {
		setEditorState2(RichUtils.toggleInlineStyle(editorState2, "HIGHLIGHT"));
	};

	const className = showMenu ? "" : " hidden";

	useEffect(() => {
		dispatch(readLists(parseInt(id)));
		dispatch(getCommentsByCardThunk(cardId));
	}, [dispatch, cardId, id]);

	return (
		<>
		{localCoverColor && (
			<div
				className="card-cover-modal"
				style={{ backgroundColor: `${localCoverColor}` }}
			/>
		)}
		<div className="commentModal">
			<div className="commentModal-body">
				<div className="cardTitle">
					<i class="fa-solid fa-table fa-xl" style={{ color: "#e6e6fa" }}></i>
					<div className="title-information">
						{/* <i class="fa-regular fa-pen-to-square"></i> */}
						<input
							type="text"
							value={name}
							onChange={(e) => handleNameChange(e)}
							onBlur={handleNameUpdate}
							className="title-input"
						/>
						<p>In list: {listName}</p>
					</div>
				</div>
				<div className="description">
					<div className="row-container">
						<i
							class="fa-solid fa-align-left fa-xl"
							style={{ color: "#e6e6fa" }}
						></i>
						<p>Description</p>
					</div>
				</div>
				<div className="editor-container-1">
					{clicked && (
						<>
							<div className="toolbar">
								<button onClick={onBoldClick}>
									<i className="fa-solid fa-bold"></i>
								</button>
								<button onClick={onItalicClick}>
									<i className="fa-solid fa-italic"></i>
								</button>
								<button onClick={onUnderlineClick}>
									<i className="fa-solid fa-underline"></i>
								</button>
								<button onClick={onRedClick}>
									<i className="fas fa-palette" style={{ color: "red" }}></i>
								</button>
								<button onClick={onHighlightClick}>
									<i
										className="fa-solid fa-highlighter"
										style={{ color: "goldenrod" }}
									></i>
								</button>
							</div>
							<hr />
						</>
					)}
					<div style={{ height: clicked ? "200px" : "50px" }}>
						<Editor
							className="editor"
							onFocus={() => setClicked(true)}
							editorState={editorState}
							onChange={setEditorState}
							onBlur={handleDescriptionUpdate}
							placeholder={description ? description : "Add a description..."}
							customStyleMap={{
								BOLD: { fontWeight: "bold" },
								ITALIC: { fontStyle: "italic" },
								UNDERLINE: { textDecoration: "underline" },
								RED: { color: "red" },
								HIGHLIGHT: { backgroundColor: "yellow" },
							}}
						/>
					</div>
				</div>
				{clicked && (
					<div className="button-container">
						<button className="save" onClick={handleDescriptionUpdate}>
							Save
						</button>
						<button className="cancel" onClick={() => setClicked(false)}>
							Cancel
						</button>
					</div>
				)}
				<div id="activity">
					<div className="row-container">
						<div className="comment-icon">
							<i
								class="fa-sharp fa-regular fa-comments fa-lg"
								style={{ color: "#e6e6fa" }}
							></i>
							<p>Comments</p>
						</div>
						{/* <button onClick={showDetails}>Show Details</button> */}
					</div>
				</div>
				<div className="comment-container">
					<i
						className="fas fa-user-circle fa-2xl"
						style={{ color: "#e6e6fa" }}
					/>
					<div className="editor-container">
						{clicked2 && (
							<>
								<div className="toolbar">
									<button onClick={onBoldClick2}>
										<i className="fa-solid fa-bold"></i>
									</button>
									<button onClick={onItalicClick2}>
										<i className="fa-solid fa-italic"></i>
									</button>
									<button onClick={onUnderlineClick2}>
										<i className="fa-solid fa-underline"></i>
									</button>
									<button onClick={onRedClick2}>
										<i className="fas fa-palette" style={{ color: "red" }}></i>
									</button>
									<button onClick={onHighlightClick2}>
										<i
											className="fa-solid fa-highlighter"
											style={{ color: "goldenrod" }}
										></i>
									</button>
								</div>
								<hr />
							</>
						)}
						<div style={{ height: clicked2 ? "50px" : "initial" }}>
							<Editor
								className="editor"
								onFocus={() => setClicked2(true)}
								editorState={editorState2}
								onChange={setEditorState2}
								placeholder="Write a comment..."
								customStyleMap={{
									BOLD: { fontWeight: "bold" },
									ITALIC: { fontStyle: "italic" },
									UNDERLINE: { textDecoration: "underline" },
									RED: { color: "red" },
									HIGHLIGHT: { backgroundColor: "yellow" },
								}}
							/>
						</div>
					</div>
				</div>
				{!clicked2 && (
					<>
						<br />
						<br />
						<br />
					</>
				)}
				{clicked2 && (
					<>
						<button onClick={handleSubmit} className="save-2">
							Save
						</button>
						<hr />
					</>
				)}
				{Object.values(comments)
					.reverse()
					.map((comment) => (
						<UserComment key={comment.id} comment={comment} />
					))}
					<div className="comment-btn-container">
						<div className="delete-card comment-btn" onClick={handleDelete}>
							<i class="fa-regular fa-trash-alt"></i>
							Delete card
						</div>
						<div className={`move-card comment-btn`} onClick={() => { openMenu(); setHidden(!hidden); }}>
							<i class="fa-solid fa-arrow-right"></i>
							Move
						</div>
						<button className="add-cover-btn comment-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
							<i class="fa-solid fa-image" style={{ color: "#e6e6fa" }}></i>
							Cover
						</button>
						{dropdownOpen && (
							<div className="color-dropdown">
								{colorOptions.map(color => (
									<div
										key={color}
										className="color-option"
										style={{ backgroundColor: color }}
										onClick={() => {
											setCoverColor(color);
											setLocalCoverColor(color)
											dispatch(updateCardThunk(boardId, listId, cardId, { cover: color }));
											setDropdownOpen(false);
										}}
									/>
								))}
								<button onClick={() => {setCoverColor(null); setLocalCoverColor(null)}} className="remove-cover">Remove Cover</button>
							</div>
						)}
					</div>
					<div ref={ulRef} className={`${className}`}>
						<div className="move-list__container">
							<>
							{hidden && (
								<div className="destination">
									<p>Move to list...</p>
									<div className="list-options">
										{lists.map((list) => {
											if (hidden && list.id) {
												return (
													<div
														className={`move-lists`}
														onClick={() => handleListUpdate(list.id)}
													>
														{list.name}
													</div>
												);
											} else {
												return null;
											}
										})}
									</div>
								</div>
							)}
							</>
						</div>
					</div>
			</div>
			{/* <div className="additions">
				<div onClick={handleDelete}>
					<i class="fa-solid fa-archive" style={{ color: "#2c2a31" }}></i>
					Delete
				</div>
				<p>Add to card</p>
				<div className="additions-container">
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-regular fa-user" style={{ color: "#2c2a31" }}></i>
						Members
					</div>
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-tag" style={{ color: "#2c2a31" }}></i>
						Labels
					</div>
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-check" style={{ color: "#2c2a31" }}></i>
						Checklists
					</div>
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-calendar" style={{ color: "#2c2a31" }}></i>
						Dates
					</div>
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-paperclip" style={{ color: "#2c2a31" }}></i>
						Attachments
					</div>
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-image" style={{ color: "#2c2a31" }}></i>
						Cover
					</div>
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-columns" style={{ color: "#2c2a31" }}></i>
						Custom Fields
					</div>
				</div>
				<p>Actions</p>
				<div className="additions-container-2">
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-arrow-right" style={{ color: "#2c2a31" }}></i>
						Move
					</div>
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-copy" style={{ color: "#2c2a31" }}></i>
						Copy
					</div>
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-columns" style={{ color: "#2c2a31" }}></i>
						Make Template
					</div>
					<div onClick={() => alert("Feature coming soon")}>
						<i class="fa-solid fa-share" style={{ color: "#2c2a31" }}></i>
						Share
					</div>
				</div>
			</div> */}
		</div>
		</>
	);
}
