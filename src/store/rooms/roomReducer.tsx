import { ROOMS_CHANGE, ROOMS_RESET } from './roomConstant';

const initialState = {
    rooms: [
        { id: 1, name: 'Pirate Ship', escaped: false, time: 98, timeLimit: 90, groupSize: 2, image: 'https://extremescape.co.uk/wp-content/uploads/2015/06/20110606-084959-300x225.jpg', company: 'Extreme Escape', }, 
        { id: 2, name: 'Egyptian Tomb', escaped: true, time: 78, timeLimit: 90, groupSize: 6, image: 'https://extremescape.co.uk/wp-content/uploads/2015/06/Gold-Miners-Shack-700x402.jpg', company: 'Extreme Escape', },
        { id: 3, name: 'Viking', escaped: true, time: 72, timeLimit: 75, groupSize: 6, image: 'https://extremescape.co.uk/wp-content/uploads/2017/06/Escape-Room-Stockport-1.jpg', company: 'Extreme Escape', },
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