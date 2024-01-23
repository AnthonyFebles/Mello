import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../store/boards";
import { NavLink } from "react-router-dom";
import "./AllBoards.css";
import NewBoard from "../CreateBoard";

import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";


const AllBoards = () => {

	const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    
    
	const boards = useSelector((state) => {
        //console.log(state, "STATE");
		return state.boards.list.map((boardId) => state.boards[boardId]);
	});
    
    useEffect(() => {
            dispatch(getBoards()).then(() => setIsLoading(false));
        }, [dispatch]);
	// if (!boards) {
    //     //console.log('nothing here')
	// 	return null;
	// }
    
    
    

	// console.log(boards, "board")
    if (isLoading) return (
				<h1>...Loading</h1>
			)

    if (boards.length > 0)  
	return (
		<>
			<div className="tabbed-nav__container">
				<div className="tabbed-nav__group">
					<NavLink
						to={`/boards`}
						className={"tabbed-nav__link"}
						id="boards-tab"
					>
						Boards
					</NavLink>

					<a className="tabbed-nav__link" id="settings-tab" href=" ">
						{/* Insert page for editing user details here  */}
						Settings
					</a>
				</div>
			</div>
			<div className="outer__boards__container">
				<div className="boards__container">
					<NewBoard />

					<div className="boards__group">
						{boards.toReversed().map((board) => {
							if (board)
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
												alt="Board "
												className={`board-${board.color} boards__img`}
												title={`${board.name}`}
											/>
										</NavLink>
									</div>
								);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default AllBoards;
