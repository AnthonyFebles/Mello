import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Lists.css";
import { Route, Switch } from "react-router-dom";
import { getBoards } from "../../store/boards";
import { useParams } from "react-router-dom";
import Card from "../Cards"

const List = () => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const boardLists = useSelector((state) => state.boards);
    const lists = boardLists[id].lists
    console.log(lists[1])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
       dispatch(getBoards()).then(()=> setIsLoading(false))
   }, [dispatch])

    if(isLoading) return <h1>Loading</h1>
    return (
        <div>
            <h1>Hello From Lists</h1>
            {lists.toReversed().map(list => (
                <>
            
                <div>
                    <h2>{list.name}</h2>
                </div>
                    <div>
                        <h3> cards insert</h3>
                {/* <Card state={list.cards} />         */}
                </div>
                </>
                    ))
            }

                    
                </div>
            )
}



export default List;
