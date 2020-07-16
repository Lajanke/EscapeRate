import { ROOMS_CHANGE } from './roomConstant';
export function changeRooms(rooms) {
    return {
        type: ROOMS_CHANGE,
        payload: rooms,
    }
}