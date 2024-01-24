import { getBoards, updateBoard } from "../../store/boards";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { colors} from "../Colors";
import { useModal } from "../../context/Modal";
import "./UpdateBoard.css";


const UpdateBoard = ({ id, color, name }) => {
	const dispatch = useDispatch();

	const ulRef = useRef();

    
	const [newColor, setNewColor] = useState(color);
	const [newName, setNewName] = useState(name);
	const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    const boardPayLoad = {
            id,
			color: newColor,
            name :newName
		};

    const handleSubmit = async (e) => {
        setErrors({})
        e.preventDefault()

        try {
            await dispatch(updateBoard(boardPayLoad))
            await dispatch(getBoards());
            closeModal()
        } catch (data) {
            setErrors(data)
            alert(data.errors)
        } finally {
            await dispatch(getBoards()) 
        }

        dispatch(getBoards())
        // return history.push(`/boards/${id}`)
    }

    useEffect (() => {
        dispatch(getBoards())
    }, [dispatch, newName, newColor])


	return (
		<>
			<div className={`new__board__container`}>
				<div ></div>
				<form className="new__board__form" onSubmit={handleSubmit} ref={ulRef}>
					<label>
						Board Name
						<input
							type="text"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							required
						/>
					</label>
					<label>
						Select Your Theme
						<select value={newColor} onChange={(e) => setNewColor(e.target.value)}>
							{/* Map through an array of themes and make an option for each one  */}
							{colors.map((color_option, index) => {
								return (
									<option
										key={color_option}
										value={color_option}
										label={`Theme ${index + 1}`}
									>
										Theme
									</option>
								);
							})}
						</select>
						{/* work around the getting images on the select field. Will show an updated 
                        image thanks to the useEffect whenever a new "Color" is selected from the
                        select onChange func */}
						<ul className="board__images__ul">
							<li className="board__images__li">
								<div>
									<img src={newColor} height="100px" width="180px" alt="Theme" />
								</div>
							</li>
						</ul>
					</label>
					{errors && <p>{errors.errors}</p>}
					<button className="Submit" type="submit">
						Update Board
					</button>
				</form>
			</div>
		</>
	);
};

export default UpdateBoard;
