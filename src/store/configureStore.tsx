import { createStore, combineReducers } from 'redux';
import roomReducer from './rooms/roomReducer';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({ 
    rooms: roomReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);
    return { persistor, store };
  };
  
export default configureStore;
