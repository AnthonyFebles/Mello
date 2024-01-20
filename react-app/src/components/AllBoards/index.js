import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../store/boards";
import { NavLink } from "react-router-dom";
import "./AllBoards.css";
<<<<<<< HEAD
import NewBoard from "../CreateBoard";
=======
>>>>>>> 13b3df6 (all-boards-component partially done, logic is there)

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

<<<<<<< HEAD
    

	// console.log(boards, "board")
=======
	// console.log(boards, "board")
    let source_color_image;
>>>>>>> 13b3df6 (all-boards-component partially done, logic is there)

	return (
		<>
			<h1>Hello From All Boards</h1>
<<<<<<< HEAD
			<div className="tabbed-nav__container">
				<div className="tabbed-nav__group">
=======
			<div class="tabbed-nav__container">
				<div class="tabbed-nav__group">
>>>>>>> 13b3df6 (all-boards-component partially done, logic is there)
					
						<NavLink to={`/boards`} className={"tabbed-nav__link"} id="boards-tab">
							Boards
						</NavLink>
					

<<<<<<< HEAD
					<a className="tabbed-nav__link" id="settings-tab" href=" ">
=======
					<a class="tabbed-nav__link" id="settings-tab">
>>>>>>> 13b3df6 (all-boards-component partially done, logic is there)
						{/* Insert page for editing user details here  */}
						Settings
					</a>
				</div>
			</div>

			<div className="boards__container">
<<<<<<< HEAD

                <NewBoard/>
				
=======
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
>>>>>>> 13b3df6 (all-boards-component partially done, logic is there)
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
<<<<<<< HEAD
									
									<img
										src={`${board.color}`}
										alt="Board "
										className={`board-${board.color} boards__img`}
										title={`${board.name}`}
=======

									<img
										src={`${board.color}`}
										alt="Board Preview Image"
										className={`board-${board.color} boards__img`}
										title={`${board.description}`}
>>>>>>> 13b3df6 (all-boards-component partially done, logic is there)
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
