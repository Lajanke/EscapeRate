import React, { useState } from 'react';
import { Button, StyleSheet, View, Modal } from 'react-native';
import { Room } from './HomeScreen';
import AddRoomForm from './AddRoomForm';

export interface AddRoomButtonProps {
    setRoomList: React.Dispatch<React.SetStateAction<Room[]>>; 
    roomList: Room[];
    rooms: Room[];
}

const AddRoomButton: React.FC<AddRoomButtonProps> = (props) => {
    const [modalOpen, setModalState] = useState<boolean>(false);

    return (
      <>
        <Modal visible={modalOpen} animationType={'slide'}>
          <AddRoomForm roomList={props.rooms} setRoomList={props.setRoomList} setModalState={setModalState} />
          
        </Modal>
        <View style={styles.button}>
          <Button title={"Add Room"} onPress={() => setModalState(true)} color='#4ba358'/>
        </View>
      </>
    );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
});

export default AddRoomButton;