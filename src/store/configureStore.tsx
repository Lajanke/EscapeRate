import { createStore, combineReducers } from 'redux';
import roomReducer from './rooms/roomReducer';

const rootReducer = combineReducers({ 
    rooms: roomReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;