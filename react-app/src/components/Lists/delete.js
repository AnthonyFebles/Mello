import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteList, readLists } from "../../store/lists";
import { useModal } from "../../context/Modal";
import { getBoards } from "../../store/boards";
import "./Lists.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const DeleteIt = (info) => {
	const dispatch = useDispatch();
	const { list_id, board_id } = info.info;

	const { closeModal } = useModal();

	const [isLoading, setIsLoading] = useState("");
	const [errors, setErrors] = useState("");

	// handles
	const handle_delete = async (e) => {
		e.preventDefault();
		setErrors({});

		try {
			dispatch(deleteList(parseInt(list_id)))
				.then(() => dispatch(readLists(board_id)))
				.then(Redirect(`/boards/${board_id}`));
		} catch (data) {
			setErrors(data);
			alert(errors.errors);
		} finally {
			closeModal();
			// Redirect(`/boards/${board_id}`)
		}
	};
	useEffect(() => {
		return dispatch(getBoards()).then(() => setIsLoading(false));
	}, [dispatch]);

	if (isLoading) {
		<img src="https://i.imgur.com/mWjbe4Q.gif" alt="...Loading"></img>;
	}
	return (
		<div className="deleteContainer">
			<h2>Confirm Delete</h2>
			<p>Are you sure you would like to delete this list </p>
			<div>
				<button className="yes-btn" onClick={handle_delete}>Yes</button>
				<button className="no-btn" onClick={closeModal}>No</button>
			</div>
		</div>
	);
};

export default DeleteIt;
