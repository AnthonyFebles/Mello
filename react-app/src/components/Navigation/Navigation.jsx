import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<header>
			<nav className="nav-bar">
				<NavLink exact to="/boards">
					<div className="logo-name">
						<i class="fa-brands fa-trello fa-xl" style={{color: '#e6e6fa'}}></i>
						<p>mello</p>
					</div>
				</NavLink>
			</nav>
			<div className="right_side_nav">
				<span className="search-container">
					<input type="search" name="search" id="search" placeholder="Search"/>
					<i className="fa-sharp fa-solid fa-magnifying-glass search-icon" style={{color: '#e6e6fa71'}}></i>
				</span>
				<i class="fa-regular fa-bell fa-lg" style={{color: '#e6e6fa71'}}></i>
				<i class="fa-regular fa-circle-question fa-lg" style={{color: '#e6e6fa71'}}></i>
				{isLoaded && (
					<ProfileButton user={sessionUser} />
				)}
			</div>
		</header>
	);
}

export default Navigation;
