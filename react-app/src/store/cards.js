import { csrfFetch } from "./csrf";

/**
 * TODO: I'll need to create:
 * ! Two GET Thunks (All Cards, and One Card)
 * ! One POST Thunk (Create a new Card)
 * ! One PUT Thunk (Update an existing Card)
 * ! One DELETE Thunk (Delete an existing Card)
 */

//! Get All Cards

const GET_CARDS = '/cards/LOAD'

const getCards = (cards) => {
    return {
        type: GET_CARDS,
        payload: cards
    }
}

export const getCardsThunk = (boardId,listId) => async (dispatch) => {

    // try {
        // First we fetch the data from the api route
        const res = await csrfFetch(`/api/boards/${boardId}/lists/${listId}/cards`)
    
        // if the response is okay, then we'll grab that json data
        // and then dispatch the loadCards action creator and then
        // return that data
        if (res.ok) {
            const cards = await res.json()
            // console.log("This is the cards", cards)
            dispatch(getCards(cards))
            return cards
        } 
    // } catch (error) {
        // const res = await error.json();
        // throw res;
    // }
} 


//! Get Each Card

const GET_EACH_CARD = '/cards/LOAD'

const getEachCard = (card) => {
    return {
        type: GET_EACH_CARD,
        payload: card
    }
}

export const getEachCardThunk = (cardId) => async (dispatch) => {

    try {
        // First we fetch the data from the api route
        const res = await csrfFetch(`/api/cards/${cardId}`)
    
        // If the res is okay, then we'll grab the json data and then
        // dispatch the getEachCard action creator
        if (res.ok) {
            const eachCard = await res.json()
            dispatch(getEachCard(cardId, eachCard))
            return eachCard
        } 
    } catch (error) {
        const res = await error.json();
        throw res;
    }
}

//! Create a New Card

const POST_CARD = '/cards/POST'

const addNewCard = (newCard) => {
    return {
        type: POST_CARD,
        payload: newCard
    }
}

export const addCardThunk = (listId, boardId, payload) => async (dispatch) => {

    try {
        // Request method details
        const requestMethod = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
    
        // fetch from backend api route
        const res = await csrfFetch(`/api/boards/${boardId}/lists/${listId}/cards`, requestMethod)
    
        // if the response is good, we'll dispatch using the action creator
        if (res.ok) {
            const newCard = await res.json()
            
            dispatch(addNewCard(newCard))
            return newCard
        } 
    } catch (error) {
        console.log(error, "THUNK ERROR")
        const res = await error.json();
        throw res;
    }

}

//! Update an Existing Card

const UPDATE_CARD = '/cards/PUT'

const updateCard = (updatedCard) => {
    return {
        type: UPDATE_CARD,
        payload: updatedCard
    }
}

export const updateCardThunk = (cardId, updatedCardInfo) => async (dispatch) => {

    try {
        // Request method for Editing
        const requestMethod = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCardInfo)
        }
    
        // fetch the api route
        const res = await csrfFetch(`api/cards/${cardId}`, requestMethod)
        
        
        if (res.ok) {
            const editedCard = await res.json()
            dispatch(updateCard(editedCard))
            return editedCard
        }
    } catch (error) {
        const res = await error.json();
        throw res;
    }
}

//! Delete an Existing Card

const DELETE_CARD = '/cards/DELETE'

const deleteCard = (cardId) => {
    return {
        type: DELETE_CARD,
        payload: cardId
    }
}

export const deleteCardThunk = (cardId) => async (dispatch) => {

    try {
        const requestMethod = {
            method: "DELETE"
        }
    
        const res = await csrfFetch(`api/cards/${cardId}`, requestMethod)
    
        if (res.ok) {
            dispatch(deleteCard(cardId))
            return cardId;
        }
    } catch (error) {
        const res = await error.json();
        throw res;
    }
}



//! ---------------------------- Reducer --------------------------------

const initialState = {
    Cards: {}
}

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARDS: 
            const allCards = {};
            const cards = action.payload.cards;
            cards.forEach(card => {
                allCards[card.id] = card
            })
            return {
                ...state, 
                Cards: allCards
            }
        case GET_EACH_CARD:
            const card = action.payload
            return {
                ...state,
                Cards: {...state.Cards, [card.id]: card }
            }
        // case POST_CARD:
        //     const newCard = action.payload;
        //     return {
        //         ...state,
        //         cards: { ...state.Cards, [newCard.id]: newCard }
        //     };
        case UPDATE_CARD:
            const updatedCard = action.payload;
            return {
                ...state,
                cards: { ...state.Cards, [updatedCard.id]: updatedCard }
            };
        case DELETE_CARD: 
            const newState = {...state};
            delete newState.Cards[action.payload]
            return newState;
        default:
            return state;
    }
};

export default cardsReducer
