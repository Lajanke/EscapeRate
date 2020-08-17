import { ROOMS_CHANGE } from './roomConstant';

const initialState = {
    rooms: []
};

const roomReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case ROOMS_CHANGE:
      return {    
      ...state,
      rooms:action.payload
    };

    default:
      return state;
  }
}

export default roomReducer;