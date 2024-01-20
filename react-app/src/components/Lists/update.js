import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateLists } from '../../store/lists';
import {getBoards} from '../../store/boards'
import * as sessionActions from '../../store/session';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {useModal} from '../../context/Modal'


const UpdateList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
  console.log(useParams())
    const { id } = useParams();
    const list_id = parseInt(id)
    const currentList = null

    let userId
    if (sessionUser) userId = sessionUser.id;

    //state 
    const [name, setName] = useState('');
    const [errors, setErrors] = useState('');
    const { closeModal } = useModal();


    //handles 
    const handleName = e => setName(e.target.value);


    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            userId,
            list_id,
            name
        };

        // reset
        const reset = () => {
            setName(currentList)
        }

        let createdList;

        createdList = await dispatch(updateLists(list_id, payload)).then(dispatch(getBoards())).catch(
            async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }).then(closeModal)
        
        if (!createdList) return createdList;

        history.push(`/lists/${list_id}`)

    }

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
                <button type='submit' className='submitButton'> Update List</button>
            </form>
        </div>
    )
}  

export default UpdateList;
