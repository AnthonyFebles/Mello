import { csrfFetch } from "./csrf";
const CREATE = 'lists/CREATE'
const UPDATE = 'lists/UPDATE'
const READ = 'lists/READ'
const DELETE = "lists/DELETE"



const create = payload => ({
    type: CREATE,
    payload
})

// const read = (list) => ({
//     type: READ,
//     list
// })



const update = list => ({
    type: UPDATE,
    list
})
const deleted = list => ({
    type: DELETE,
    list
})


export const createLists = (board_id, payload) => async dispatch => {
    console.log(board_id, payload)
    const res = await csrfFetch(`/api/boards/${board_id}/lists`, {
        method: "POST",
        Headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data, "This is the to be created lists!!!!! :^)")
        dispatch(create(data));
        return data
    }
    return res;
}

// export const readLists = (board_id) => async (dispatch) => {
//     const res = await csrfFetch(`/boards/${board_id}/lists`)


//     if (res.ok) {
//         const lists = await res.json()
//         console.log(lists, "This is all Lists!!!!!!!!!")
//         dispatch(read(lists))
//     }

//     return res;
// }


export const updateLists = (payload, list_id) => async dispatch => {
   
    const res = await csrfFetch(`/api/lists/${list_id}`, {
        method: "PUT",
        Headers: { 'Content-Type': 'application/json' },
        body: payload
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data, "this is the to be updated list!!!")
        dispatch(update(data))
    }

    return res;

}


export const deleteList = (list_id) => async dispatch => {
    const res = await csrfFetch(`/api/lists/${list_id}`);

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
            console.log(action, "console.log the action")
            const id = action.payload.id
            const newObj = { ...state };
            newObj.lists[id] = action.payload
            return newObj;
        
        // case READ:
        //     console.log(action, "console.log the action")
        //     const allLists = {};
        //     if (action.list) {
        //         action.list.forEach((list) => {
        //             allLists[list.id] = list;
        //         });
        //         console.log(action, "console.log the action")
        //         return {
        //             ...allLists,
        //             ...initState
        //         }
        //     } else {
        //         return {...initState, lists:{...allLists},  };
        //     }
        
        case UPDATE: 
            console.log(action, "console.log the action")
            const list_id = action.payload.id 
            const new_state = { ...state };
            new_state.lists[list_id] = action.payload
            return new_state
        case DELETE: 
        console.log(action, "console.log the action")
            const newState = {...state}
            delete newState.lists[action.list]
            return newState
        default:
            return state
    }
};

export default ListsReducer;


