import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../store/boards";
import { NavLink } from "react-router-dom";
import "./AllBoards.css";

import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";


const AllBoards = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBoards());
	}, [dispatch]);

	const boards = useSelector((state) => {
		//console.log(state, "STATE");
		return state.boards.list.map((boardId) => state.boards[boardId]);
	});

	if (!boards) {
		//console.log('nothing here')
		return null;
	}

	// console.log(boards, "board")

	return (
		<>
			<h1>Hello From All Boards</h1>
			<div class="tabbed-nav__container">
				<div class="tabbed-nav__group">
					
						<NavLink to={`/boards`} className={"tabbed-nav__link"} id="boards-tab">
							Boards
						</NavLink>
					

					<a class="tabbed-nav__link" id="settings-tab">
						{/* Insert page for editing user details here  */}
						Settings
					</a>
				</div>
			</div>

			<div className="boards__container">
				<div class="boards__sidebar">
					<div class="boards__sidebar-content">
						<p class="title">Need unlimited boards?</p>
						<p class="description">
							Upgrade to Business Class to get unlimited Boards and Power-ups,
							automation, and much more.
						</p>
						<p class="cta">
							<a href="" className="learn-more-link">
								Learn More
							</a>
						</p>
					</div>
				</div>
				<div className="boards__group">
					{boards.toReversed().map((board) => {
						return (
							<div
								key={board.id}
								className={`board-${board.color} boards__board`}
								id={`board-${board.id}`}
							>
								<NavLink
									to={`/boards/${board.id}`}
									className={`board-${board.color} boards__img__navlink`}
								>
									<p className="board__name">{`${board.name}`}</p>

									<img
										src={`${board.color}`}
										alt="Board Preview Image"
										className={`board-${board.color} boards__img`}
										title={`${board.name}`}
									/>
								</NavLink>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default AllBoards;
