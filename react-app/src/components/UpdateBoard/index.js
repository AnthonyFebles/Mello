import { getBoards, updateBoard } from "../../store/boards";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { colors, getRandomInt } from "../Colors";
import "./UpdateBoard.css"

const UpdateBoard = () => {
    const dispatch = useDispatch()

    const [color, setColor] = useState(colors[getRandomInt(colors.length)]);
	const [name, setName] = useState("");

	const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getBoards())
    }, [dispatch])

    const boardPayLoad = {
        color,
        name
    }

}