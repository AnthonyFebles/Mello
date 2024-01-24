import { csrfFetch } from "./csrf";
const CREATE = 'lists/CREATE'
const UPDATE = 'lists/UPDATE'
const READ = 'lists/READ'
const DELETE = "lists/DELETE"



const create = payload => ({
    type: CREATE,
    payload
})

const read = (list) => ({
    type: READ,
    list
})



const update = list => ({
    type: UPDATE,
    list
})
const deleted = list => ({
    type: DELETE,
    list
})


export const createLists = (board_id, payload) => async dispatch => {
    try {
        
       
        const res = await csrfFetch(`/api/boards/${board_id}/lists`, {
            method: "POST",
            Headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    
        if (res.ok) {
            const data = await res.json();
            dispatch(create(data));
            return data
        }
        return res;
    } catch (error) {
        const res = await error.json();
        throw res;
    }
}

export const readLists = (board_id) => async (dispatch) => {
    
        const res = await csrfFetch(`/api/boards/${board_id}/lists`)
        if (res.ok) {
            const lists = await res.json()
            dispatch(read(lists))
        }
    
        return res;
        
    
}


export const updateLists = (payload, list_id) => async dispatch => {
    try {
       
        const res = await csrfFetch(`/api/lists/${list_id}`, {
            method: "PUT",
            Headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    
        if (res.ok) {
            const data = await res.json();
            dispatch(update(data))
        }
    
        return res;
    } catch(error) {
        const res = await error.json();
        throw res;
   }

}


export const deleteList = (list_id) => async dispatch => {
    const res = await csrfFetch(`/api/lists/${list_id}`, { method: "DELETE"});

    if (res.ok) {
        const data = await res.json();
        dispatch(deleted(list_id))
        return data;
    }
    return res;
}

const initState = {lists: {}}


const ListsReducer = (state = initState, action) => {
    switch (action.type) {
        case CREATE:
            const id = action.payload.id
            const newObj = { ...state };
            newObj.lists[id] = action.payload
            return newObj;
        
        case READ:
            const allLists = {};
            if (action.list) {
                const list = action.list.lists
                if(!list) return {...state}
               list.forEach((list) => {
                    allLists[list.id] = list;
                });
                return {
                    ...allLists,
                    ...initState
                }
            } else {
                return {...initState, lists:{...allLists},  };
            }
        
        case UPDATE: 
            const list_id = action.list.id 
            const new_state = { ...state };
            new_state.lists[list_id] = action.payload
            return new_state
        case DELETE: 
            const newState = {...state}
            delete newState.lists[action.list]
            return newState
        default:
            return state
    }
};

export default ListsReducer;


