import React from 'react';
import { Button } from 'react-native';
import { Room } from './HomeScreen';

export interface AddRoomButtonProps {
    setRoomList: React.Dispatch<React.SetStateAction<Room[]>>;
    roomList: Room[];
}

const AddRoomButton: React.FC<AddRoomButtonProps> = (props) => {
    const addRoom = () => {
        const maxId: number = props.roomList.reduce((max: number, room: Room) => room.id > max ? room.id : max, 0);
        const newRoom: Room = {
            id: maxId + 1,
            name: 'Room name',
            escaped: false
        };
        props.setRoomList([...props.roomList, newRoom]);
    }
  return (
    <Button title="Add Room" onPress={addRoom} />
  );
};

export default AddRoomButton;