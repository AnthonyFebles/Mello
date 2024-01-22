import React, {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import List from "../Lists";
import { loadDetails } from "../../store/boardDetail";

const CurrentBoard = () => {
    const dispatch = useDispatch();
    const board = useSelector(state => state.boardDetail)
    const { color, lists, name, owner, user_id, users } = board;
    const { id } = useParams();
    console.log(board)
    useEffect(() => {
            dispatch(loadDetails(parseInt(id)))
    },[dispatch, id])
    return (
        <div>
            <h1>{name}</h1>
            <List />
        </div>
    )
}
export default CurrentBoard;

