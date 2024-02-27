import React, { useState, useEffect, useRef } from "react";

import OpenModalButton from "../OpenModalButton";

import DeleteIt from "../Lists/delete";
import UpdateList from "../Lists/update";
import "./deleteUpdate.css";

const UpdateDelete = (info) => {
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const { board_id, list_id, list_name } = info.info;

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

	const className = showMenu ? "" : "hidden";
	const closeMenu = () => {
		setShowMenu(false);
	};
	return (
		<>
			<button onClick={openMenu} className={"icon"}>
			<i class="fa-solid fa-ellipsis"></i>
			</button>

			<div ref={ulRef} className={`${className} list-modal-container`}>
				<OpenModalButton
					buttonText="Edit List"
					onButtonClick={closeMenu}
					className={'create_list_button2'}
					modalComponent={
						<UpdateList
							info={{
								board_id: board_id,
								list_id: list_id,
								list_name: list_name,
							}}
						/>
					}
				/>

				<OpenModalButton
					buttonText="Delete List"
					onButtonClick={closeMenu}
					className={'create_list_button2'}
					modalComponent={
						<DeleteIt
							info={{
								board_id: board_id,
								list_id: list_id,
								list_name: list_name,
							}}
						/>
					}
				/>
			</div>
		</>
	);
};

export default UpdateDelete;
