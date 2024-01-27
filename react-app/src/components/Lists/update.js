import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readLists, updateLists } from "../../store/lists";
import { useModal } from "../../context/Modal";
import { Redirect } from "react-router-dom";

const UpdateList = (info) => {
	const dispatch = useDispatch();
	const { list_id, list_name, board_id } = info.info;
	const listId = parseInt(list_id);

	//state
	const [name, setName] = useState("");
	const [errors, setErrors] = useState("");
	const { closeModal } = useModal();

	const payload = {
		name,
	};

	//handles
	const handleName = (e) => setName(e.target.value);

	const handleSubmit = async (e) => {
		setErrors({});
		e.preventDefault();

		try {
			await dispatch(updateLists(payload, listId))
				.then(() => dispatch(readLists(board_id)))
				.then(Redirect(`/boards/${board_id}`));
		} catch (data) {
			setErrors({ data });
			alert(data.errors);
		} finally {
			closeModal();
		}
	};

	useEffect(() => {
		dispatch(readLists(board_id));
	}, [dispatch, board_id]);

	return (
		<div>
			<form onSubmit={handleSubmit} className="list_form_container">
				<p>{errors.name}</p>
				<section>
					<label for={name}>
						{" "}
						Name for list {errors.name}
						<input
							type="text"
							value={name}
							onChange={handleName}
							name="name"
							placeholder={list_name}
							required
						/>
					</label>
				</section>
				<button type="submit" className="submitButton">
					{" "}
					Update List
				</button>
			</form>
		</div>
	);
};

export default UpdateList;
