import { csrfFetch } from "./csrf";

const LOAD = 'boards/LOAD'

const load = (list) => ({
    type: LOAD,
    list
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