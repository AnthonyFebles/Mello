import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { useDrop } from "react-dnd";
import "./Lists.css";
import { updateCardThunk } from "../../store/cards";
import { useParams } from "react-router-dom";
import ListForm from "./create";

import { readLists } from "../../store/lists";

import CommentModal from "../CommentModal/CommentModal";
import UpdateDelete from "../DeleteUpdate";
import "./Cards.css";
import Cards from "./Cards";
import AddCards from "../AddCards/AddCards";

const DroppableList = ({ list, listColor, listNameColor }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [showMenu, setShowMenu] = useState(false);

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

	const [, drop] = useDrop(() => ({
		accept: "CARD",
		drop: (item, monitor) => {
			handleListUpdate(list.id, item.cardId, item.name, item.description);
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	return (
		<div className={`list ${listColor}`} key={list.id} ref={drop}>
			<div>
				{/* {console.log('Name', name)} */}
				<h2 className={listNameColor}>{list.name}</h2>
			</div>
			<div className="cards">
				<>
					{list?.cards &&
						Object.values(list?.cards).map((card) => {
							return (
								<AddCards
									key={card.id}
									list={list}
									boardId={id}
									cardId={card.id}
								/>
							);
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
	);
};

export default DroppableList;
