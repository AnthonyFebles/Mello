import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsThunk } from "../../store/cards";

const Card = ({ boardId, listId }) => {
	const dispatch = useDispatch();

	const board = boardId;
	const list = listId;

	let cards = useSelector((state) => {
		return state.cards.Cards;
	});

	// console.log(cards, "state.cards ******************");
	// console.log(board, list, "board and list ******")

	useEffect(() => {
		dispatch(getCardsThunk(board, list));
	}, [dispatch, board, list]);

	const cardsArr = Object.values(cards);

	if (!cardsArr.length) {
		return null;
	}

	return (
		<div>
			{cardsArr.map((card) => {
				if (card.listId == list)
					return (
						<div>
							<p>{card.name}</p>
							<p>{list}</p>
						</div>
					);
			})}
		</div>
	);
};

export default Card;
