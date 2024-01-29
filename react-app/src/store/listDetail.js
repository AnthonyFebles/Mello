import { csrfFetch } from "./csrf";

const GET_DETAILS = "details/getDetails";

const getDetails = (list) => ({
	type: GET_DETAILS,
	list,
});

export const loadDetails = (listId) => async (dispatch) => {
	const res = await fetch(`/api/spots/${listId}`);

	if (res.ok) {
		const data = await res.json();
		dispatch(getDetails(data));
		return data;
	}

	return res;
};
const initState = {};
const ListDetailReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_DETAILS:
			const details = action.list;

			return { ...initState, ...details };
		default:
			return state;
	}
};
export default ListDetailReducer;
