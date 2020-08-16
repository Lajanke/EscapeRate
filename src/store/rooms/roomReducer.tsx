import { ROOMS_CHANGE, ROOMS_RESET } from './roomConstant';

const initialState = {
    rooms: [
        { id: 1, name: 'Pirate Ship', date: '2019-10-19T21:27:31.309Z', escaped: false, time: 98, timeLimit: 90, groupSize: 2, image: '', company: 'Extreme Escape', }, 
        { id: 2, name: 'Egyptian Tomb', date: '2019-04-02T21:27:31.309Z', escaped: true, time: 78, timeLimit: 90, groupSize: 6, image: '', company: 'Extreme Escape', },
        { id: 3, name: 'Viking', date: '2018-08-15T21:27:31.309Z', escaped: true, time: 72, timeLimit: 75, groupSize: 6, image: '', company: 'Extreme Escape', },
      ]
};

const roomReducer = (state = initialState, action) => {
  console.log(action.payload)
  switch(action.type) {
    
    case ROOMS_CHANGE:
      return {
        
      ...state,
      rooms:action.payload
    };

    case ROOMS_RESET:
      console.log('in reset')
      return initialState;

    default:
      return state;
  }
}

export default roomReducer;