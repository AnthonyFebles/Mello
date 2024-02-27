import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";
// import CreateBoard from "../CreateBoard/index"
import { colors, getRandomInt } from "../Colors";
import { createNewBoard, getBoards } from "../../store/boards";
import Testing from "../Testing/Testing";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	const dispatch = useDispatch();

	const ulRef = useRef();

	const [color, setColor] = useState(colors[getRandomInt(colors.length)]);
	const [name, setName] = useState("");
	const [errors, setErrors] = useState({});
	const [showMenu, setShowMenu] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	const boardPayLoad = {
		color,
		name,
	};

	const ulClassName = "new__board-dropdown" + (showMenu ? " " : " hidden");
	const handleSubmit = async (e) => {
		setErrors({});
		e.preventDefault();

		try {
			await dispatch(createNewBoard(boardPayLoad));
		} catch (data) {
			setErrors(data);
			alert(data.errors);
		} finally {
			setShowMenu(false);
			setColor(colors[getRandomInt(colors.length)]);
			setName("");
			dispatch(getBoards());
		}
	};

	useEffect(() => {
		dispatch(getBoards()).then(() => setIsLoading(false));
		if (!showMenu) return;

		const closeMenu = async (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [dispatch, color, showMenu]);

	if (isLoading)
		return <img src="https://i.imgur.com/mWjbe4Q.gif" alt="...Loading"></img>;

	return (
		<header>
			<nav className="nav-bar">
				<NavLink exact to="/boards">
					<div className="logo-name">
						<i
							class="fa-brands fa-trello fa-xl"
							style={{ color: "#e6e6fa" }}
						></i>
						<p>mello</p>
					</div>
				</NavLink>
				<button onClick={openMenu} className="create">
					Create
				</button>
				<Testing
					ulClassName={ulClassName}
					ulRef={ulRef}
					handleSubmit={handleSubmit}
					name={name}
					setName={setName}
					color={color}
					setColor={setColor}
					errors={errors}
				/>
			</nav>
			<div className="right_side_nav">
				{/* <span className="search-container">
					<input type="search" name="search" id="search" placeholder="Search" />
					<i
						className="fa-sharp fa-solid fa-magnifying-glass search-icon"
						style={{ color: "#e6e6fa71" }}
					></i>
				</span> */}
				<SpotifyPlayer />
				{/* <i
					onClick={() => alert("Feature coming soon...")}
					class="fa-regular fa-bell fa-lg"
					style={{ color: "#e6e6fa71" }}
				></i>
				<i
					onClick={() => alert("Feature coming soon...")}
					class="fa-regular fa-circle-question fa-lg"
					style={{ color: "#e6e6fa71" }}
				></i> */}
				{isLoaded && <ProfileButton user={sessionUser} />}
			</div>
		</header>
	);
}

export default Navigation;
