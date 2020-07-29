import { ROOMS_CHANGE, ROOMS_RESET } from './roomConstant';

const initialState = {
    rooms: [
        { id: 1, name: 'Pirate Ship', escaped: false, time: 98, groupSize: 2, image: 'https://extremescape.co.uk/wp-content/uploads/2015/06/20110606-084959-300x225.jpg', company: 'Extreme Escape', companyURL: 'https://extremescape.co.uk/'}, 
        { id: 2, name: 'Egyptian Tomb', escaped: true, time: 82, groupSize: 6, image: 'https://extremescape.co.uk/wp-content/uploads/2015/06/Gold-Miners-Shack-700x402.jpg', company: 'Extreme Escape', companyURL: 'https://extremescape.co.uk/'},
        { id: 3, name: 'Viking', escaped: true, time: 78, groupSize: 6, image: 'https://extremescape.co.uk/wp-content/uploads/2017/06/Escape-Room-Stockport-1.jpg', company: 'Extreme Escape', companyURL: 'https://extremescape.co.uk/'},
      ]
};

const roomReducer = (state = initialState, action) => {
 
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