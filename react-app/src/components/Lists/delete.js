import React, {useState, useEffect } from "react";
import {  useDispatch } from "react-redux";
import { deleteList } from "../../store/lists";
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { getBoards } from "../../store/boards";
import './Lists.css'


const DeleteIt = (info) => {
    const dispatch = useDispatch();
    const { list_id, board_id} = info.info;
    console.log(list_id)
    const history = useHistory();
    const closeModal = useModal();

    const [isLoading, setIsLoading] = useState('')

    // handles
    const handle_delete = e => {
        e.preventDefault();
        dispatch(deleteList(parseInt((list_id)))).then(() => dispatch(getBoards())).then(closeModal);
     //!   history.push(`/lists`)
    }
    useEffect(() => {
        return dispatch(getBoards()).then(() => setIsLoading(false));
    }, [dispatch, list_id])

    if (isLoading) { <h1>...Loading</h1> }
    return (
        <div className="deleteContainer">
            <h1>Confirm Delete</h1>
            <p>Are you sure you would like to delete this list </p>
            <div>
                <button onClick={handle_delete}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </div>
    )
}

export default DeleteIt;