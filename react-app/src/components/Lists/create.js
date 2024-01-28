import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { createLists, readLists } from "../../store/lists";
import { useModal } from "../../context/Modal";
import "./Lists.css";

const ListForm = (info) => {
	const dispatch = useDispatch();

	const { board_id } = info;
	const boardId = parseInt(board_id);

	//state
	const [name, setName] = useState("");
	const [errors, setErrors] = useState("");
	const { closeModal } = useModal();

	//reset

	//handles
	const handleName = (e) => setName(e.target.value);

	// payload

	const payload = {
		name,
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		try {
			await dispatch(createLists(boardId, payload))
				.then(() => dispatch(readLists(boardId)))
				.then(() => closeModal());
		} catch (data) {
			setErrors({ ...data });
		}

		setName("");
	};

	useEffect(() => {
		dispatch(readLists(boardId));
	}, [dispatch, boardId]);

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
				<button type="submit" className="submitButton">
					Add list
				</button>
			</form>
		</div>
	);
};

export default ListForm;
