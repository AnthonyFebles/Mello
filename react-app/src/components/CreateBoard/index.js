import { createNewBoard, deleteBoard } from "../../store/boards";
import { getBoards } from "../../store/boards";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./CreateBoard.css";
import { colors, getRandomInt } from "../Colors";




const NewBoard = () => {
	const dispatch = useDispatch();
	
	const ulRef = useRef();
    

	const [color, setColor] = useState(colors[getRandomInt(colors.length)]);
	const [name, setName] = useState("");
	const [errors, setErrors] = useState({});
	const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const openMenu = () => {
			if (showMenu) return;
			setShowMenu(true);
		};



	const boardPayLoad = {
		color,
		name,
	};

    //if show menu is false, the hidden classname will be added. 
    const ulClassName = "new__board-dropdown" + (showMenu ? " " : " hidden");

    //updates color on submit to a new random one, catches errors and alerts them.
    //creates a new board and updates the db
	const handleSubmit = async (e) => {
        setErrors({});
		e.preventDefault();
		
		try {
			await dispatch(createNewBoard(boardPayLoad));
		} catch (data) {
			setErrors(data);
			alert(data.errors);
		}finally {
        setShowMenu(false)
        setColor(colors[getRandomInt(colors.length)]);
        setName('')
        dispatch(getBoards())
        }
	};

	////////////////////////////
    // Test Delete Button
    const handleTest = async (e) => {
        e.preventDefault()

        try {
					await dispatch(deleteBoard("6"))
                    console.log("no error")
						
				} catch (data) {
                    console.log(data.message)
					setErrors(data.message)  
                    alert(data.message);
					;
				}  finally {
                    dispatch(getBoards())
					.then(() => setIsLoading(false));
                }
    }

    	useEffect(() => {
				dispatch(getBoards()).then(() => setIsLoading(false));
				if (!showMenu) return;

				// click outside of un-hidden form and it will close

				const closeMenu = async (e) => {
					if (!ulRef.current.contains(e.target)) {
						setShowMenu(false);
					}
				};

				document.addEventListener("click", closeMenu);

				return () => document.removeEventListener("click", closeMenu);
			}, [dispatch, color, showMenu]);
    //////////////////////////////
    if (isLoading) return <img src="https://i.imgur.com/mWjbe4Q.gif" alt="...Loading"></img>;
	return (
		<>
        <button onClick={handleTest}></button>
			<div className="boards__sidebar">
				<div className="boards__sidebar-content">
					<p className="title">Create A New Board</p>
					<p className="description side_bar_description">
						<button
							className="description side_bar_description"
							onClick={openMenu}
						>
							<i className="fa-solid fa-plus"></i>
						</button>
					</p>
				</div>
			</div>
			<div className={`new__board__container ${ulClassName}`}>
				<div className={ulClassName} ref={ulRef}></div>
				<form className="new__board__form" onSubmit={handleSubmit} ref={ulRef}>
					<label>
						Name of your new board
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</label>
					<label>
						Select Your Theme
						<select value={color} onChange={(e) => setColor(e.target.value)}>
                            {/* Map through an array of themes and make an option for each one  */}
							{colors.map((color_option, index) => {
								return (
									<option
										key={color_option}
										value={color_option}
										label={
											`Theme ${index + 1}`
										}
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
									<img src={color} height="100px" width="180px" alt="Theme" />
								</div>
							</li>
						</ul>
					</label>
					{errors && <p>{errors.errors}</p>}
					<button className="Submit" type="submit">
						Create New Board
					</button>
				</form>
			</div>
		</>
	);
};

export default NewBoard;
