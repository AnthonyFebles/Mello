import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsThunk } from "../../store/cards";
import { readLists } from "../../store/lists";

const AddCards = ({ listId }) => {
	const dispatch = useDispatch();

	const list = listId;

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
	const [isLoading, setIsLoading] = useState(true);

	let cards = useSelector((state) => {
		return state.cards.Cards;
	});

    const payload = {
       listId: list,
       name,
       description 
    }

    

	console.log(cards, "state.cards ******************");
	// console.log(board, list, "board and list ******")

	useEffect(() => {
		dispatch(getCardsThunk(list)).then(() => setIsLoading(false));
	}, [dispatch]);

	const cardsArr = Object.values(cards);

	

	return (
		<div className="new__cards-container">
			<form>

            </form>
		</div>
	);
};

export default AddCards;
