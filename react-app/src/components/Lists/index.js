import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import UpdateList from "./update";
import "./Lists.css";
import "../AllBoards/AllBoards.css"
import { useParams } from "react-router-dom";
import Card from "../Cards";
import ListForm from "./create";
import DeleteIt from "./delete";
import { readLists } from "../../store/lists";
import { getCardsThunk } from "../../store/cards";
import CommentModal from "../CommentModal/CommentModal";
import UpdateDelete from "../DeleteUpdate";
import AddCards from "../AddCards";
import './Cards.css'
import Cards from "./Cards";

const List = (boardColor) => {
    const dispatch = useDispatch();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [showMenu, setShowMenu] = useState(false);
	const lists = useSelector((state) => state.lists);
	const listsArr = Object.values(lists);
    const color  = boardColor.boardColor;
    console.log(boardColor.boardColor)

    //! Color stuff
    let nameColor;
    let listImage;
    let listHeadColor;
    let listNameColor;
    let listGroup;
    let listColor;
    let defaultImage;

    switch (color) {
        case "https://th.bing.com/th/id/OIG.OoOd9Dks6SQIeJc3lV_8?w=1024&h=1024&rs=1&pid=ImgDetMain":
            listImage = "imageOne__image"
            break;
        
            case "https://th.bing.com/th/id/OIG.Tm4j5l5hso8iB85_iqNf?w=1024&h=1024&rs=1&pid=ImgDetMain":
   
            
            break;
        
        case "https://th.bing.com/th/id/OIG.OGoMI4XVVcASjUF2Hb3N?pid=ImgGn":

            break;
        
        case "https://th.bing.com/th/id/OIG.rt3EmryUoYQKIjK86m_p?pid=ImgGn":
            listImage = 'imageFour__image'

            break;
        
        case "https://th.bing.com/th/id/OIG.idCzopGsrbq9HoGGWuLq?w=1024&h=1024&rs=1&pid=ImgDetMain":
    
            
            break;
        case "https://th.bing.com/th/id/OIG.fEHxWkIYkumMxQZLmYc5?w=1024&h=1024&rs=1&pid=ImgDetMain":

            break;
        default:
            listImage = 'default_image';
            nameColor = 'default_component_name_color';
           listHeadColor = 'default_list__head';
           listNameColor = 'default_list__name';
            listColor = 'default_lists'
            listGroup = 'default_list__group'
            
    }


	if (listsArr.length > 1) {
		listsArr.pop();
	}
	// console.log(listsArr, "*****listArr state.lists");

	useEffect(() => {
		dispatch(readLists(parseInt(id))).then(() => setIsLoading(false));
		if (!showMenu) return;
		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [dispatch, showMenu, id]);

	const ulRef = useRef();
	const closeMenu = () => setShowMenu(false);

	if (isLoading)
		return <img src="https://i.imgur.com/mWjbe4Q.gif" alt="...Loading"></img>;

	// console.log(Object.values(listsArr[0]).length < 1, "LSTARRRRRRRR")

	if (Object.values(listsArr[0]).length < 1)
		return (
			<div className={`lists__container ${listImage}`}>
				<h1> Lists</h1>
                <OpenModalButton
                    className={'delete__board-button'}
					buttonText="Create A List"
					onButtonClick={closeMenu}
					modalComponent={<ListForm board_id={id} />}
				/>
				<div className="lists__group"></div>
			</div>
		);
	return (
		<div className={`lists__container ${listImage}`}>
			<h1 className={`list__head ${listHeadColor}`}> Lists</h1>
			<OpenModalButton
				buttonText="Create A List"
				onButtonClick={closeMenu}
				modalComponent={<ListForm board_id={id} />}
			/>
			<div className={`lists__group ${listGroup}`}>
				{listsArr.toReversed().map((list) => (
					<div className={`list ${listColor}`} key={list.id}>
						{/* <NavLink to={`/boards/${parseInt(id)}/lists/${parseInt(id)}`}>Edit List</NavLink> */}
						{/* <OpenModalButton
							buttonText="Edit List"
							onButtonClick={closeMenu}
							modalComponent={
								<UpdateList
									info={{
										board_id: id,
										list_id: list.id,
										list_name: list.name,
									}}
								/>
							}
						/>

						<OpenModalButton
							buttonText="Delete List"
							onButtonClick={closeMenu}
							modalComponent={
								<DeleteIt
									info={{
										board_id: id,
										list_id: list.id,
										list_name: list.name,
									}}
								/>
							}
                        /> */}
                        <div>
                            <h2 className={listNameColor}>{list.name}</h2>
                        </div>



						<div className="cards">
							<h3>
								{list.cards ? (
									list.cards.toReversed().map((card) => {
										return (
											<div className="card__container" key={card.id}>
												<OpenModalButton
													buttonText={card.name}
													modalComponent={
														<CommentModal
															cardName={card.name}
															listName={list.name}
															boardId={id}
															cardId={card.id}
															cardDesc={card.description}
															cardComments={card.comments}
														/>
													}
												></OpenModalButton>
											</div>
										);
									})
								) : (
									<div></div>
								)}
							</h3>
						</div>
						<Cards listId={list.id} boardId={id} />
							<OpenModalButton
								buttonText={<i class="fa-solid fa-plus"></i>}
								className={"new__card__modal-button icon"}
								modalComponent={<AddCards listId={list.id} boardId={id} />}
							/>
							<UpdateDelete info={{
								board_id: id,
								list_id: list.id,
								list_name: list.name,
							}} />
					</div>
				))}
			</div>
		</div>
	);
};

export default List;
