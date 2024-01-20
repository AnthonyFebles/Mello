import React, { useEffect, useState } from "react";
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getBoards } from "../../store/boards";
import { createLists, readLists } from "../../store/lists";
import { useModal } from "../../context/Modal"; 
import './Lists.css';


const ListForm = (info) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { board_id } = info;
    const boardId = parseInt(board_id);
   
   

    let userId
    if (sessionUser) userId = sessionUser.id;

    //state 
    const [name, setName] = useState('');
    const [errors, setErrors] = useState('');
    const { closeModal } = useModal();


    //reset 
   

    //handles 
    const handleName = e => setName(e.target.value);


    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            board_id:boardId,
            name
        };

        let createdList;

        createdList = await dispatch(createLists(boardId, payload)).then(dispatch(getBoards())).catch(
            async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }).then(closeModal)
        
        if (!createdList) return createdList;

        history.push(`/lists/${boardId}`)

    }
   
    useEffect(() => {
    
    }, [dispatch])


    return (
        <div>
            <form onSubmit={handleSubmit} className='list_form_container'>
                <p>{errors.name}</p>
                <section>
                    <label for={name}> Name for list {errors.name}
                        <input 
                            type='text'
                            value={name}
                            onChange={handleName}
                            name='name'
                            placeholder='List Name'
                            required
                        />
                    </label>
                </section>
                <button type='submit' className='submitButton'> Create List</button>
            </form>
        </div>
    )
}


export default ListForm;