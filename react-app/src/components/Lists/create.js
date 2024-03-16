import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { createLists, readLists } from "../../store/lists";
import { useModal } from "../../context/Modal";
import "./Lists.css";

const ListForm = ({boardId, setClicked }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [errors, setErrors] = useState("");
	const { closeModal } = useModal();
	const handleName = (e) => setName(e.target.value);
	const payload = { name };

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		setClicked(false);
		try {
			await dispatch(createLists(boardId, payload))
				.then(() => dispatch(readLists(boardId)))
				.then(() => closeModal());
		} catch (data) {
			alert(data.errors);
			setErrors({ ...data });
		}

		setName("");
	};

	useEffect(() => {
		dispatch(readLists(boardId));
	}, [dispatch, boardId]);

	if (errors) {
		
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="list_form_container">
				{errors && <p>{errors.errors}</p>}
				<input
					className="list_form_input"
					type="text"
					value={name}
					onChange={handleName}
					name="name"
					placeholder="Enter list title..."
					required
				/>
				<div className="new-list-btns">
					<button type="submit" className="submitButton">Add list</button>
					<button type='button' onClick={() => handleSubmit()} className="x">X</button>
				</div>
			</form>
		</div>
	);
};

export default ListForm;
