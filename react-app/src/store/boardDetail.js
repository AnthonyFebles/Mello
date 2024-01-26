import { csrfFetch } from "./csrf";

const GET_DETAILS = 'details/getDetails'

const getDetails = board => ({
    type: GET_DETAILS,
    board
})



export const loadDetails = boardId => async dispatch => {
    const res = await csrfFetch(`/api/boards/${boardId}`)
  

    if (res.ok) {
        const data = await res.json();
        dispatch(getDetails(data))
        return data
    }
    return res;
    
}


const initState = {};

const BoardDetailReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_DETAILS:
            const details = action.board;
            // console.log(details)
            return {...state, ...details}
        default:
            return state;
    }
}


export default BoardDetailReducer
