import { deleteBoard, getBoards } from "../../store/boards";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import "./DeleteBoards.css";

const DeleteBoard = ({ id, name }) => {
	const dispatch = useDispatch();
	const { closeModal } = useModal();

	const [errors, setErrors] = useState({});

	const handleYes = async (e) => {
		setErrors({});
		e.preventDefault();

		try {
			await dispatch(deleteBoard(id));
			closeModal();
		} catch (data) {
			setErrors(data);
			alert(errors.errors);
		} finally {
			//await dispatch(getBoards());
		}

		//dispatch(getBoards());
	};

	useEffect(() => {
		dispatch(getBoards());
	}, [dispatch]);

	return (
		<>
			<h1>Are you sure you want to delete {name} ?</h1>
			<button onClick={handleYes}>Yes</button>
			<button onClick={() => closeModal()}>No</button>
		</>
	);
};

export default DeleteBoard;
