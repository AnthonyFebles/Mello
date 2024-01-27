import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../store/boards";
import { NavLink } from "react-router-dom";
import "./AllBoards.css";
import NewBoard from "../CreateBoard";
import UpdateBoard from "../UpdateBoard";
import OpenModalButton from "../OpenModalButton";
import DeleteBoard from "../DeleteBoards";
import { useHistory } from "react-router-dom";

const AllBoards = () => {
	const dispatch = useDispatch();

	const ulRef = useRef();

	const [isLoading, setIsLoading] = useState(true);
	const [targetBoard, setTargetBoard] = useState("");

	const sessionUser = useSelector((state) => state.session.user);

	const history = useHistory();

	const boards = useSelector((state) => {
		return state.boards.list.map((boardId) => state.boards[boardId]);
	});

	useEffect(() => {
		dispatch(getBoards()).then(() => setIsLoading(false));

		const closeOptions = async (e) => {
			if (ulRef.current) {
				if (!ulRef.current.contains(e.target)) {
					setTargetBoard(0);
					dispatch(getBoards());
				}
			}
		};

		if (!sessionUser) return history.push("/");

		document.addEventListener("click", closeOptions);

		return () => {
			document.removeEventListener("click", closeOptions);
		};
	}, [dispatch]);

	const handleMoreOptions = async (e) => {
		setTargetBoard(e.target.className.split(" ")[2]);
		e.stopPropagation();
		e.preventDefault();
		dispatch(getBoards());
	};

	if (isLoading)
		return <img src="https://i.imgur.com/mWjbe4Q.gif" alt="...Loading"></img>;

	if (boards.length > 0)
		return (
			<>
				<div className="outer__boards__container">
					<div className="boards__container">
						<NewBoard />
						<div className="boards__group">
							{boards.toReversed().map((board) => {
								if (board)
									return (
										<>
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
													<button
														className="board-options__button"
														onClick={handleMoreOptions}
													/>
													<p className="board__name">{`${board.name}`}</p>
													<button
														className="board-options__button"
														onClick={handleMoreOptions}
													>
														<i
															className={`fa-solid fa-ellipsis ${board.id} `}
														></i>
													</button>
													<img
														src={`${board.color}`}
														alt="Board "
														className={`board-${board.color} boards__img`}
														title={`${board.name}`}
													/>
												</NavLink>
												{targetBoard == board.id ? (
													<div className={`board__options`} ref={ulRef}>
														<ul ref={ulRef}>
															<li>
																<OpenModalButton
																	className={"update__board-button"}
																	buttonText={`Update Board`}
																	modalComponent={
																		<UpdateBoard
																			id={board.id}
																			color={board.color}
																			name={board.name}
																		/>
																	}
																/>
															</li>
															<li>
																<OpenModalButton
																	className={"delete__board-button"}
																	buttonText={"Delete Board"}
																	modalComponent={
																		<DeleteBoard
																			id={board.id}
																			name={board.name}
																		/>
																	}
																/>
															</li>
														</ul>
													</div>
												) : (
													<div> </div>
												)}
											</div>
										</>
									);
							})}
						</div>
					</div>
				</div>
			</>
		);

	if (boards.length == 0)
		return (
			<>
				<div className="outer__boards__container">
					<div className="boards__container">
						<NewBoard />
						<h1 style={{ color: "white" }}>
							You don't have any boards...you should create one the top left
						</h1>
						<div className="boards__group"></div>
					</div>
				</div>
			</>
		);
};

export default AllBoards;
