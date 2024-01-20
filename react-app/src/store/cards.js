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

const getCards = (comment) => {
    return {
        type: GET_CARDS,
        comment
    }
}

export const getCardsThunk = (listId) => async (dispatch) => {

    // First we fetch the data from the api route
    const res = await csrfFetch(`/api/lists/${listId}/cards`)

    // if the response is okay, then we'll grab that json data
    // and then dispatch the loadCards action creator and then
    // return that data
    if (res.ok) {
        const cards = await res.json()
        // console.log("This is the cards", cards)
        dispatch(getCards(listId, cards))
        return cards
    }

    // Then we return the response
    return res;
}


//! Get Each Card

const GET_EACH_CARD = '/cards/LOAD'

const getEachCard = (comment) => {
    return {
        type: GET_EACH_CARD,
        comment
    }
}

export const getEachCardThunk = (cardId) => async (dispatch) => {

    // First we fetch the data from the api route
    const res = await csrfFetch(`/api/cards/${cardId}`)

    // If the res is okay, then we'll grab the json data and then
    // dispatch the getEachCard action creator
    if (res.ok) {
        const eachCard = await res.json()
        dispatch(getEachCard(cardId, eachCard))
        return eachCard
    }

    //Then return the response
    return res;
}

//! Create a New Card

const POST_CARD = '/cards/POST'

const addNewCard = (comment) => {
    return {
        type: POST_CARD,
        comment
    }
}

export const addCardThunk = (listId, cardData) => async (dispatch) => {

    // Request method details
    const requestMethod = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cardData)
    }

    // fetch from backend api route
    const res = csrfFetch(`api/lists/${listId}/cards`, requestMethod)

    // if the response is good, we'll dispatch using the action creator
    if (res.ok) {
        const newCard = await res.json()
        dispatch(addNewCard(newCard))
        return newCard
    } else {
        const error = res.json()
        return error
    }

}

//! Update an Existing Card

const UPDATE_CARD = '/cards/PUT'

const updateCard = (updatedCard) => {
    return {
        type: UPDATE_CARD,
        updatedCard
    }
}

export const updateCardThunk = (cardId, updatedCardInfo) => async (dispatch) => {

    const requestMethod = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedCardInfo)
    }

    const res = await csrfFetch(`api/cards/${cardId}`, requestMethod)

    if (res.ok) {
        const editedCard = await res.json()
        dispatch(updateCard(editedCard))
        return editedCard
    }
}

//! Delete an Existing Card

const DELETE_CARD = '/cards/DELETE'

const deleteCard = (cardId) => {
    return {
        type: DELETE_CARD,
        cardId
    }
}

export const deleteCardThunk = (cardId) => async (dispatch) => {

    const requestMethod = {
        method: "DELETE"
    }

    const res = await csrfFetch(`api/cards/${cardId}`, requestMethod)

    if (res.ok) {
        dispatch(deleteCard(cardId))
        return cardId;
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
            action.payload.forEach(card => {
                allCards[card.id] = card
            })
            return {...state, Cards: allCards}
        case GET_EACH_CARD:
            
        case POST_CARD:

        case UPDATE_CARD:

        case DELETE_CARD: 

        default:
            return state;
    }
};

export default cardsReducer
