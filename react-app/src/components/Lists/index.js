import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import UpdateList from "./update";
import "./Lists.css";
import { useParams } from "react-router-dom";
import Card from "../Cards";
import ListForm from "./create";
import DeleteIt from "./delete";
import { readLists } from "../../store/lists";
import { getCardsThunk } from "../../store/cards";
import CommentModal from "../CommentModal/CommentModal";
import AddCards from "../AddCards";




const List = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [showMenu, setShowMenu] = useState(false);
	const lists = useSelector((state) => state.lists);
	const listsArr = Object.values(lists);
	if (listsArr.length > 1) {
		listsArr.pop();
	}
	console.log(listsArr, "*****listArr state.lists");

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
		return <img src="https://i.imgur.com/mWjbe4Q.gif" alt="...Loading"></img>;

	if (listsArr[0].length < 1)
		return (
			<OpenModalButton
				buttonText="Create A List"
				onButtonClick={closeMenu}
				modalComponent={<ListForm board_id={id} />}
			/>
		);
	return (
		<div className="lists__container">
			<h1> Lists</h1>
			<OpenModalButton
				buttonText="Create A List"
				onButtonClick={closeMenu}
				modalComponent={<ListForm board_id={id} />}
			/>
			<div className="lists__group">
				{listsArr.toReversed().map((list) => (
					<div className="list" key={list.id}>
						{/* <NavLink to={`/boards/${parseInt(id)}/lists/${parseInt(id)}`}>Edit List</NavLink> */}
						<OpenModalButton
							buttonText="Edit List"
							onButtonClick={closeMenu}
							modalComponent={
								<UpdateList
									info={{
										board_id: id,
										list_id: list.id,
										list_name: list.name,
									}}
								/>
							}
						/>

						<OpenModalButton
							buttonText="Delete List"
							onButtonClick={closeMenu}
							modalComponent={
								<DeleteIt
									info={{
										board_id: id,
										list_id: list.id,
										list_name: list.name,
									}}
								/>
							}
						/>

						<div>
							<h2>{list.name}</h2>
						</div>
						<div className="cards">
							<h3>
								{list.cards ? (
									list.cards.toReversed().map((card) => {
										return (
											<div className="card__container">
												<OpenModalButton
                                                buttonText={card.name}
                                                modalComponent={<CommentModal cardId={card.id} />}>
                                                </OpenModalButton>
											</div>
										);
									})
								) : (
									<div></div>
								)}
							</h3>
                            <OpenModalButton
                            buttonText={"Add New Card"}
                            className={"new__card__modal-button"}
                            modalComponent={<AddCards listId={list.id} boardId={id}/>}
                            >
                            

                            </OpenModalButton>
							{/* <Card state={list.id} />         */}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default List;
