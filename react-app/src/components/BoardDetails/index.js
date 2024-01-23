import React, {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import List from "../Lists";
import { loadDetails } from "../../store/boardDetail";
import { getCardsThunk } from "../../store/cards";

const CurrentBoard = () => {
    const dispatch = useDispatch();
    const board = useSelector(state => state.boardDetail)
    const { color, lists, name, owner, user_id, users } = board;
    const { id } = useParams();
    useEffect(() => {
            dispatch(loadDetails(parseInt(id))).then(() => dispatch(getCardsThunk(parseInt(id), parseInt(id))))
    },[dispatch, id])
    return (
        <div>
            <h1>{name}</h1>
            <List />
        </div>
    )
}
export default CurrentBoard;

