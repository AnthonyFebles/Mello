import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import List from "../Lists";
import { loadDetails } from "../../store/boardDetail";
import { useHistory } from "react-router-dom";
import "./BoardDetails.css";

const CurrentBoard = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const board = useSelector((state) => state.boardDetail);
	const sessionUser = useSelector((state) => state.session.user);
	const { color, name } = board;
	const { id } = useParams();

	useEffect(() => {
		dispatch(loadDetails(id));
	}, [dispatch, id]);

	if (!sessionUser) return <>{history.push("/")}</>;

	return (
		<div className="header">
			{/* <h1>{name}</h1> */}
			<List boardColor={color} />
		</div>
		// <>
		// 	<List boardColor={color} />
		// </>
	);
};
export default CurrentBoard;
