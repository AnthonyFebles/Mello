import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import UpdateList from "./update";
import "./Lists.css";
import { Route, Switch } from "react-router-dom";
import { getBoards } from "../../store/boards";
import { useParams } from "react-router-dom";
import ListDetails from './ListDetails'
import Card from "../Cards"
import ListForm from "./create";
import { readLists } from "../../store/lists";
import DeleteIt from "./delete";

const List = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false)
    const board = useSelector(state => state.boards[parseInt(id)])
    

    useEffect(() => {
        dispatch(getBoards()).then(() => setIsLoading(false));
        if (!showMenu) return;
        const closeMenu = e => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false)
            };
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [dispatch, id, showMenu]);

    const ulRef = useRef();
    const closeMenu = () => setShowMenu(false)
    const lists = board.lists
    // const currBoard = boardLists.filter(())



  
    if(isLoading) return <h1>...Loading</h1>
    return (
        <div className="lists__container">
            <h1>Hello From Lists</h1>
            <OpenModalButton buttonText="Create A List" onButtonClick={closeMenu} modalComponent={<ListForm board_id={id} />} />
            <div className="lists__group">
                {lists.toReversed().map(list => (
                    <div className="list" key={list.id}>
                      
                        {/* <NavLink to={`/boards/${parseInt(id)}/lists/${parseInt(id)}`}>Edit List</NavLink> */}
                        <OpenModalButton buttonText="Edit List" onButtonClick={closeMenu} modalComponent={<UpdateList info={{ board_id: id, list_id: list.id, list_name: list.name }} />} />
                        
                        <OpenModalButton buttonText="Delete List" onButtonClick={closeMenu} modalComponent={<DeleteIt info={{board_id:id, list_id: list.id, list_name: list.name }} />} />

                    <div>
                        <h2>{list.name}</h2>
                    </div>
                        <div className="cards">
                            <h3> cards insert</h3>
                    {/* <Card state={list.cards} />         */}
                    </div>
                    </div>
                        ))
                    }
            </div>   
        </div>
            )
}



export default List;
