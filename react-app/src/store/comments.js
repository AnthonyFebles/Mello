import { csrfFetch } from "./csrf";

const GET_COMMENTS_BY_CARD = 'GET_COMMENTS_BY_CARD'
// const CREATE_COMMENT = 'CREATE_COMMENT'
// const UPDATE_COMMENT = 'UPDATE_COMMENT'
// const DELETE_COMMENT = 'DELETE_COMMENT'

const getCommentsByCardId = (comments) => {
    return {
        type: GET_COMMENTS_BY_CARD,
        comments
    }
}

export const getCommentsByCardThunk = (cardId) => async (dispatch) => {
  const res = await csrfFetch(`/api/cards/${cardId}/comments`)

  if (res.ok) {
    const comments = await res.json()
    dispatch(getCommentsByCardId(comments.comments))
  } else {
    console.log('ERROR')
  }
}


const commentReducer = (state = {}, action) => {
    // let newState = {...state}
    switch (action.type) {
        case GET_COMMENTS_BY_CARD:
            let newState = {}
            action.comments.forEach(comment => {
              newState[comment.id] = comment
            })
            console.log(newState);
          return newState
        default:
            return state
    }
}

export default commentReducer
