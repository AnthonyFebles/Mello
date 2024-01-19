import { csrfFetch } from "./csrf";

const LOAD = 'boards/LOAD'
const CREATE = 'boards/CREATE'
const UPDATE = 'boards/UPDATE'

const load = (list) => ({
    type: LOAD,
    list
})

const create = (boardPayLoad) => ({
	type: CREATE,
	boardPayLoad,
});

const update = (boardPayLoad) => ({
    type: UPDATE,
    boardPayLoad
})

export const getBoards = () => async (dispatch) => {
    const res = await csrfFetch('/api/boards')

    if (res.ok) {
        const list = await res.json()
        //console.log(list, "This is the list **********");
        dispatch(load(list))
    }

    return res
}

export const createNewBoard = (boardPayload) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/boards`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(boardPayload),
		});

		if (response.ok) {
			//console.log("res is ok?")
			const newBoard = await response.json();
			dispatch(create(newBoard));
			return newBoard;
		}
	} catch (error) {
		const res = await error.json();
		//console.log(res, "error")
		throw res;
	}
};

export const updateBoard = (boardPayLoad) => async (dispatch) => {
    try {
			const response = await csrfFetch(`/api/boards${boardPayLoad.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(boardPayLoad),
			});

			if (response.ok) {
				//console.log("res is ok?")
				const updatedBoard = await response.json();
				dispatch(update(updatedBoard));
				return updatedBoard;
			}
		} catch (error) {
			const res = await error.json();
			//console.log(res, "error")
			throw res;
		}
}

const initialState = {
    list: []
}

const sortList = (list) =>  {
	return list
		.sort((BoardA, BoardB) => {
			return BoardA.id - BoardB.id;
		})
		.map((Board) => Board.id);
};

const BoardsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			//console.log(action, "console log the action")
			const allBoards = {};
			if (action.list) {
				action.list.forEach((board) => {
					allBoards[board.id] = board;
				});
				//console.log(action, "load action");
				
                    return {
					...allBoards,
					...state,
					list: sortList(action.list),
                    }
				;
			} else
				return {
					...allBoards,
					...state,
				};

		default:
			return state;
	}
};

export default BoardsReducer;