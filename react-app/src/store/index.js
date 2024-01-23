import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { restoreCSRF, csrfFetch } from "./csrf";
import session from './session'
import BoardsReducer from './boards';
import cardsReducer from './cards';
import ListsReducer from './lists';
import BoardDetailReducer from './boardDetail';
import ListDetailReducer from './listDetail';

const rootReducer = combineReducers({
  session,
  boards: BoardsReducer,
  boardDetail: BoardDetailReducer,
  lists: ListsReducer,
  listDetail: ListDetailReducer,
  cards: cardsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
}

export default configureStore;
