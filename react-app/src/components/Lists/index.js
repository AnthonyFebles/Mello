import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";

import "./Lists.css";

import { useParams } from "react-router-dom";

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
	//console.log(boardColor.boardColor);

	//! Color stuff
	let nameColor;
	let listImage;
	let listHeadColor;
	let listNameColor;
	let listGroup;
	let listColor;

	switch (color) {
        case "https://th.bing.com/th/id/OIG.OoOd9Dks6SQIeJc3lV_8?w=1024&h=1024&rs=1&pid=ImgDetMain":
			listImage = "imageOne__image"
			 nameColor = "imageOne__Component_name_color"
			 listHeadColor = "imageOne__head"
			 listNameColor = "imageOne__list__name"
			 listGroup = "imageOne__list__group"
			 listColor = "imageOne__lists"
            break;

            case "https://th.bing.com/th/id/OIG.Tm4j5l5hso8iB85_iqNf?w=1024&h=1024&rs=1&pid=ImgDetMain":

			listImage = 'imageTwo__image'
			nameColor = "imageTwo__Component_name_color"
			listHeadColor = "imageTwo__list__head"
			listNameColor = "imageTwo__list__name"
			listGroup = "imageTwo__list__group"
			listColor = "imageTwo__lists"
            break;

        case "https://th.bing.com/th/id/OIG.OGoMI4XVVcASjUF2Hb3N?pid=ImgGn":
			listImage = 'imageSix__image'
			nameColor = "imageThree__Component_name_color"
			listHeadColor = "imageThree__list__head"
			listNameColor = "imageThree__list__name"
			listGroup = "imageThree__list__group"
			listColor = "imageThree__lists"
            break;

        case "https://th.bing.com/th/id/OIG.rt3EmryUoYQKIjK86m_p?pid=ImgGn":
			listImage = 'imageFour__image'
			nameColor = "imageFour__list__Component_name_color"
			listHeadColor = "imageFour__list__head"
			listNameColor = "imageFour__list__name"
			listGroup = "imageFour__list__group"
			listColor = "imageFour__lists"

            break;

        case "https://th.bing.com/th/id/OIG.idCzopGsrbq9HoGGWuLq?w=1024&h=1024&rs=1&pid=ImgDetMain":

			listImage = 'imageThree__image'
			nameColor = "imageFive__list__Component_name_color"
			listHeadColor = "imageFive__list__head"
			listNameColor = "imageFive__list__name"
			listGroup = "imageFive__list__group"
			listColor = "imageFive__lists"

            break;

        case "https://th.bing.com/th/id/OIG.fEHxWkIYkumMxQZLmYc5?w=1024&h=1024&rs=1&pid=ImgDetMain":
			listImage = 'imageFive__image'
			nameColor = "imageSix__list__Component_name_color"
			listHeadColor = "imageSix__list__head"
			listNameColor = "imageSix__list__name"
			listGroup = "imageSix__list__group"
			listColor = "imageSix__lists"

            break;
        default:
            listImage = 'default_image';
            nameColor = 'default_component_name_color';
           listHeadColor = 'default_list__head';
           listNameColor = 'default_list__name';
            listColor = 'default_lists'
            listGroup = 'default_list__group'

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
				<OpenModalButton
					className={"create_list_button"}
					buttonText="Add another list"
					onButtonClick={closeMenu}
					modalComponent={<ListForm board_id={id} />}
				/>
				<div className="lists__group"></div>
			</div>
		);
	return (
		<div className={`lists__container ${listImage}`}>
			{/* <h1 className={`list__head ${listHeadColor}`}> Lists</h1> */}

			<div className={`lists__group ${listGroup}`}>
				{listsArr.map((list) => (
					<div className={`list ${listColor}`} key={list.id}>
						<div>
							<h2 className={listNameColor}>{list.name}</h2>
						</div>
						<div className="cards">
							<>
								{Object.values(list?.cards).map((card) => {
									return <AddCards key={card.id} list={list} boardId={id} cardId={card.id} />;
								})}
							</>
						</div>
						<Cards listId={list.id} boardId={id} />
						<UpdateDelete
							info={{
								board_id: id,
								list_id: list.id,
								list_name: list.name,
							}}
						/>
					</div>
				))}
				<OpenModalButton
					className={'create_list_button'}
					buttonText={
						<div className="new-list-container">
							<div className="new-list">
								<i class="fa-regular fa-plus"></i>
								<p>Add another list</p>
							</div>
						</div>
					}
					onButtonClick={closeMenu}
					modalComponent={<ListForm board_id={id} />}
				/>
			</div>
		</div>
	);
};

export default List;
