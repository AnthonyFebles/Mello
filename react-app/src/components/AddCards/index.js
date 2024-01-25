import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCardThunk, getCardsThunk } from "../../store/cards";
import { readLists } from "../../store/lists";
import { useModal } from "../../context/Modal";

const AddCards = ({ listId, boardId }) => {
	const dispatch = useDispatch();

	const list = listId.toString();
    const board = boardId.toString();

    

   const { closeModal } = useModal();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	let cards = useSelector((state) => {
		return state.cards.Cards;
	});

    const payload = {
        listId,
       name,
       description 
    }

    const handleSubmit = async (e) => {
        setErrors({})
        e.preventDefault()

        try {
            await dispatch(addCardThunk(list, board, payload))
        } catch (data) {
            setErrors(data)
            console.log(data, "DATAAAAAAAAAAAAAAA")
            alert(data.errors)
        } finally {
            dispatch(readLists(board))
            closeModal()
        }
    }

	console.log(cards, "state.cards ******************");
	console.log(board, list, "board and list ******")

	useEffect(() => {
		dispatch(readLists(board)).then(() => setIsLoading(false));
	}, [dispatch]);


	

	return (
		<div className="new__cards-container">
			<form onSubmit={handleSubmit}>
				<label>
					Name of your new card
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>
				<label>
					Card description
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</label>
				{errors && <p>{errors.errors}</p>}
				<button className="create__card-submit" type="submit">
					Create New Card
				</button>
			</form>
		</div>
	);
};

export default AddCards;
