import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsThunk } from "../../store/cards";
import { readLists } from "../../store/lists";

const Card = ({ boardId, listId }) => {
	const dispatch = useDispatch();

	const board = boardId;
	const list = listId;

	const [isLoading, setIsLoading] = useState(true);

	let cards = useSelector((state) => {
		return state.cards.Cards;
	});

	console.log(cards, "state.cards ******************");
	// console.log(board, list, "board and list ******")

	useEffect(() => {
		dispatch(getCardsThunk(board, list))
			.then(() => setIsLoading(false))
	}, [dispatch]);

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
