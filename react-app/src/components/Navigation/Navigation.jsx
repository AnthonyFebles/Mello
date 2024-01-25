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
				<NavLink exact to="/">
					<div className="logo-name">
						<i class="fa-brands fa-trello fa-xl" style={{color: 'white'}}></i>
						<p>mello</p>
					</div>
				</NavLink>
					{/* <img
						class="header-nav__trello-logo"
						id="trello-logo"
						src="https://www.logo.wine/a/logo/Trello/Trello-Logo.wine.svg"
						width={100}
						height={35}
					/> */}

				<NavLink exact to="/boards" className="nav__boards">
					Boards
				</NavLink>
			</nav>
			<div className="right__side__nav">
				{/* Extras */}
				{/* <span>
					<a class="header-nav__link">
						<div class="header-nav__button" id="search">
							<i class="fas fa-search"></i>{" "}
							<input type="search" value="search" />
						</div>
					</a>
				</span>
				<span>
					<a class="header-nav__link">
						<div class="header-nav__button" id="alerts">
							<i class="far fa-bell"></i>
						</div>
					</a>
				</span>
				<span>
					<a class="header-nav__link">
						<div class="header-nav__button" id="info">
							<i class="fas fa-info-circle"></i>
						</div>
					</a>
				</span> */}
				{isLoaded && (
					<span>
						<ProfileButton user={sessionUser} />
					</span>
				)}
			</div>
		</header>
	);
}

export default Navigation;
