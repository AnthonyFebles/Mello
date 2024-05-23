import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { useDrop } from "react-dnd";
import "./Lists.css";
import { updateCardThunk } from "../../store/cards";
import { useParams } from "react-router-dom";
import DroppableList from "./DropableList";
import ListForm from "./create";

import { readLists } from "../../store/lists";

import CommentModal from "../CommentModal/CommentModal";
import UpdateDelete from "../DeleteUpdate";
import "./Cards.css";
import Cards from "./Cards";
import AddCards from "../AddCards/AddCards";

const List = (boardColor) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [showMenu, setShowMenu] = useState(false);
	const lists = useSelector((state) => state.lists);
	const listsArr = Object.values(lists);
	const color = boardColor.boardColor;
	const board = useSelector((state) => state.boardDetail);
	const [clicked, setClicked] = useState(false);
	const currentListId = useRef(null);
	const [{ isOver }, drop] = useDrop(() => ({
		accept: "CARD",
		drop: (item, monitor) => {
			const targetListId = currentListId.current;
			handleListUpdate(targetListId, item.cardId, item.name, item.description);
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const handleListUpdate = async (listId, cardId, name, description) => {
		closeMenu();

		const payload = {
			name,
			description,
			listId: listId,
		};

		try {
			await dispatch(updateCardThunk(id, listId, cardId, payload));
			dispatch(readLists(id));
		} catch (error) {
			alert(error);
		}
	};

	//! Color stuff
	let nameColor;
	let listImage;
	let listHeadColor;
	let listNameColor;
	let listGroup;
	let listColor;

	switch (color) {
		case "https://imgur.com/XfzEQ4V.jpeg":
			listImage = "imageOne__image";
			nameColor = "imageOne__Component_name_color";
			listHeadColor = "imageOne__head";
			listNameColor = "imageOne__list__name";
			listGroup = "imageOne__list__group";
			listColor = "imageOne__lists";
			break;

		case "https://imgur.com/A4Y76t2.jpeg":
			listImage = "imageTwo__image";
			nameColor = "imageTwo__Component_name_color";
			listHeadColor = "imageTwo__list__head";
			listNameColor = "imageTwo__list__name";
			listGroup = "imageTwo__list__group";
			listColor = "imageTwo__lists";
			break;

		case "https://imgur.com/ek59kot.jpeg":
			listImage = "imageSix__image";
			nameColor = "imageThree__Component_name_color";
			listHeadColor = "imageThree__list__head";
			listNameColor = "imageThree__list__name";
			listGroup = "imageThree__list__group";
			listColor = "imageThree__lists";
			break;

		case "https://imgur.com/BdTGQmT.jpeg":
			listImage = "imageFour__image";
			nameColor = "imageFour__list__Component_name_color";
			listHeadColor = "imageFour__list__head";
			listNameColor = "imageFour__list__name";
			listGroup = "imageFour__list__group";
			listColor = "imageFour__lists";

			break;

		case "https://imgur.com/Gaf7yTG.jpeg":
			listImage = "imageThree__image";
			nameColor = "imageFive__list__Component_name_color";
			listHeadColor = "imageFive__list__head";
			listNameColor = "imageFive__list__name";
			listGroup = "imageFive__list__group";
			listColor = "imageFive__lists";

			break;

		case "https://imgur.com/LCD7Cke.jpeg":
			listImage = "imageFive__image";
			nameColor = "imageSix__list__Component_name_color";
			listHeadColor = "imageSix__list__head";
			listNameColor = "imageSix__list__name";
			listGroup = "imageSix__list__group";
			listColor = "imageSix__lists";

			break;

		default:
			listImage = "default_image";
			nameColor = "default_component_name_color";
			listHeadColor = "default_list__head";
			listNameColor = "default_list__name";
			listColor = "default_lists";
			listGroup = "default_list__group";
	}

	if (listsArr.length > 1) {
		listsArr.pop();
	}

	useEffect(() => {
		dispatch(readLists(parseInt(id))).then(() => setIsLoading(false));
		if (!showMenu) return;
		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [dispatch, showMenu, id]);

	const ulRef = useRef();
	const closeMenu = () => setShowMenu(false);

	if (isLoading)
		return (
			<div className="outer__boards__container">
				<div class="loader"></div>
			</div>
		);

	if (Object.values(listsArr[0]).length < 1)
		return (
			<div className={`lists__container ${listImage}`}>
				<h1 className={`list__head ${listHeadColor}`}> Lists</h1>
				<div className="create_list_container">
					<button
						className={"create_list_button"}
						buttonText={
							<div className="new-list-container">
								<div className="new-list">
									<i class="fa-regular fa-plus"></i>
									<p>Add another list</p>
								</div>
							</div>
						}
						onButtonClick={closeMenu}
					>
						{!clicked && (
							<div className="new-list" onClick={() => setClicked(true)}>
								<i class="fa-regular fa-plus"></i>
								<p>Add another list</p>
							</div>
						)}
						{clicked && <ListForm boardId={id} setClicked={setClicked} />}
					</button>
				</div>
				<div className="lists__group"></div>

				<h1 style={{ color: "white", textAlign: "center" }}>
					You don't have any lists yet...you can create one by clicking the "Add
					another list" button on the top left!
				</h1>
			</div>
		);
	return (
		<div className={`lists__container ${listImage}`}>
			<h2 className={`list__head ${listHeadColor}`}>{board.name}</h2>

			<div className={`lists__group ${listGroup}`}>
				{listsArr.map((list) => (
					<DroppableList
						list={list}
						listColor={listColor}
						listNameColor={listNameColor}
					/>
				))}
				<button
					className={"create_list_button"}
					buttonText={
						<div className="new-list-container">
							<div className="new-list">
								<i class="fa-regular fa-plus"></i>
								<p>Add another list</p>
							</div>
						</div>
					}
					onButtonClick={closeMenu}
				>
					{!clicked && (
						<div className="new-list" onClick={() => setClicked(true)}>
							<i class="fa-regular fa-plus"></i>
							<p>Add another list</p>
						</div>
					)}
					{clicked && <ListForm boardId={id} setClicked={setClicked} />}
				</button>
			</div>
		</div>
	);
};

export default List;
