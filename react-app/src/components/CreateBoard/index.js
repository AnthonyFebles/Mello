import { createNewBoard } from "../../store/boards";
import { getBoards } from "../../store/boards";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./CreateBoard.css";
import { colors, getRandomInt } from "../Colors";




const NewBoard = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const ulRef = useRef();
    const randomColor = colors[getRandomInt(colors.length)];

	const [color, setColor] = useState(colors[getRandomInt(colors.length)]);
	const [name, setName] = useState("");
	const [errors, setErrors] = useState({});
	const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
			if (showMenu) return;
			setShowMenu(true);
		};

	useEffect(() => {
		dispatch(getBoards());
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu, dispatch]);



	const boardPayLoad = {
		color,
		name,
	};

    const ulClassName = "profile-dropdown" + (showMenu ? " " : " hidden");

	const handleSubmit = async (e) => {
        setErrors({});
		e.preventDefault();
		let createdBoard;
		try {
			createdBoard = await dispatch(createNewBoard(boardPayLoad));
		} catch (data) {
			setErrors(data);
			alert(data.errors);
		}
        setShowMenu(false)
        setColor(colors[getRandomInt(colors.length)]);
        setName('')
	};

	

	return (
		<>
			<div class="boards__sidebar">
				<div class="boards__sidebar-content">
					<p class="title">Create A New Board</p>
					<p class="description side_bar_description">
						<button
							className="description side_bar_description"
							onClick={openMenu}
						>
							<i class="fa-solid fa-plus"></i>
						</button>
					</p>
				</div>
			</div>
			<div className={`new__board__container ${ulClassName}`}>
				<div className={ulClassName} ref={ulRef}></div>
				<form className="new__board__form" onSubmit={handleSubmit} ref={ulRef}>
					<label>
						Name of your new board
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</label>
					<label>
						Select Your Theme
						<select value={color} onChange={(e) => setColor(e.target.value)}>
							{colors.map((color_option, index) => {
								return (
									<option
										key={color_option}
										backgroundImage={`url(${color_option})`}
										value={color_option}
										label={
											`Theme ` + `${index + 1}`
										}
									>
										Theme
									</option>
								);
							})}
						</select>
						<ul className="board__images__ul">
							<li className="board__images__li">
								<div>
									<img src={color} height="100px" width="155px" />
								</div>
							</li>
						</ul>
					</label>
					{errors && <p>{errors.errors}</p>}
					<button className="Submit" type="submit">
						Create New Board
					</button>
				</form>
			</div>
		</>
	);
};

export default NewBoard;
