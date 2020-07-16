import { ROOMS_CHANGE } from './roomConstant';

const initialState = {
    rooms: [
        { id: 1, name: 'Pirate Ship', escaped: false },
        { id: 2, name: 'Egyptian Tomb', escaped: true},
        { id: 3, name: 'Viking', escaped: true },
      ]
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