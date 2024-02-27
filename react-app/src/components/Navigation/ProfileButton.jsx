import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (ulRef.current) {
				if (!ulRef.current.contains(e.target)) {
					setShowMenu(false);
				}
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout()).then(() => history.push("/"));
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	const closeMenu = () => setShowMenu(false);

	return (
		<>
			<i
				onClick={openMenu}
				className="fas fa-user-circle fa-2x user-icon"
				style={{ color: "#e6e6fa" }}
			/>
			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<p className="account-text">Account</p>
						<div className="user-info">
							<i
								onClick={openMenu}
								className="fas fa-user-circle fa-3x"
								style={{ color: "#e6e6fa" }}
							/>
							<div className="name-email">
								<p>{user.username}</p>
								<p>{user.email}</p>
							</div>
						</div>
						{/* <li onClick={() => alert("Feature coming soon...")}>
							Switch accounts
						</li>
						<li onClick={() => alert("Feature coming soon...")}>
							Manage account
						</li>
						<hr /> */}
						<li onClick={handleLogout}>Logout</li>
					</>
				) : (
					<>
						<OpenModalButton
							buttonText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>

						<OpenModalButton
							buttonText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
