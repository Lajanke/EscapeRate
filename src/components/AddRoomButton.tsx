import React, { useState } from 'react';
import { Button, StyleSheet, View, Modal, Text } from 'react-native';
import { Room } from './HomeScreen';
import AddRoomForm from './AddRoomForm';

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
            escaped: false,
            groupSize: 2,
            time: 47,
            company: 'Scape',
            companyURL: 'https://lajanke.github.io/Portfolio/',
            image: 'https://lajanke.github.io/Portfolio/images/avatarMe.png',
        };
        props.setRoomList([...props.roomList, newRoom]);
    }
    const [modalOpen, setModalState] = useState<boolean>(false)

    return (
      <>
        <Modal visible={modalOpen}>
          <AddRoomForm />
          <Button title='Add New Room' onPress={addRoom}/>
          <Button title='Close' onPress={() => setModalState(false)}/>
        </Modal>
        <View style={styles.button}>
          <Button title={"Add Room"} onPress={() => setModalState(true)} />
        </View>
      </>
    );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 20,
  }
});

export default AddRoomButton;