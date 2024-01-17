import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../store/boards";
import { NavLink } from "react-router-dom";

const AllBoards = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBoards());
	}, [dispatch]);

	const boards = useSelector ((state)  => {
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
			<div>
				<nav>
					{boards.toReversed().map((board) => {
						return (
							<div key={board.id}>
								<div>
									<NavLink to={`/boards/${board.id}`}>{board.description}</NavLink>
								</div>
							</div>
						);
					})}
				</nav>
			</div>
		</>
	);
};

export default AllBoards;
