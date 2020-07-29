import { ROOMS_CHANGE, ROOMS_RESET } from './roomConstant';

export function changeRooms(rooms) {
    return {
        type: ROOMS_CHANGE,
        payload: rooms,
    }
}

export function roomsReset() {
    return {
        type: ROOMS_RESET,
    }
}