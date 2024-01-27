import { csrfFetch } from "./csrf";

const LOAD = "boards/LOAD";
const CREATE = "boards/CREATE";
const UPDATE = "boards/UPDATE";
const DELETE = "board/DELETE";

const load = (list) => ({
	type: LOAD,
	list,
});

const create = (boardPayLoad) => ({
	type: CREATE,
	boardPayLoad,
});

const update = (boardPayLoad) => ({
	type: UPDATE,
	boardPayLoad,
});

const remove = (boardId) => ({
	type: DELETE,
	boardId,
});

export const getBoards = () => async (dispatch) => {
	const res = await csrfFetch("/api/boards");

	if (res.ok) {
		const list = await res.json();
		//console.log(list, "This is the list **********");
		dispatch(load(list));
	}

	return res;
};

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
			// console.log("res is ok?", response)
			const newBoard = await response.json();
			dispatch(create(newBoard));
			return newBoard;
		}
	} catch (error) {
		const res = await error.json();
		// console.log("res not ok")
		// console.log(res, "this is the res ************")
		//console.log(res, "error")
		throw res;
	}
};

export const updateBoard = (boardPayLoad) => async (dispatch) => {
	try {
		const response = await csrfFetch(`/api/boards/${boardPayLoad.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(boardPayLoad),
		});

		if (response.ok) {
			//console.log("res is ok?")
			const updatedBoard = await response.json();
			dispatch(update(boardPayLoad));
			return updatedBoard;
		}
	} catch (error) {
		const res = await error.json();
		//console.log(res, "error")
		throw res;
	}
};

export const deleteBoard = (boardId) => async (dispatch) => {
	try {
		const res = await csrfFetch(`api/boards/${boardId}`, {
			method: "DELETE",
		});

		if (res.ok) {
			const board = await res.json();
			dispatch(remove(boardId));
			return board;
		}
		return res;
	} catch (error) {
		// console.log(error,"ERROR ")
		const res = await error.json();
		// console.log(res)
		throw res;
	}
};

const initialState = {
	list: [],
};

const sortList = (list) => {
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

					list: sortList(action.list),
				};
			} else
				return {
					...allBoards,
					...state,
				};
		case DELETE:
			const newState = { ...state };
			// console.log(newState, "new state")
			// console.log(action, "action")
			delete newState[action.boardId];
			// console.log(newState, "new state after del");
			return newState;

		default:
			return state;
	}
};

export default BoardsReducer;
