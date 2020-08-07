import React, { useState } from 'react';
import { Button, StyleSheet, View, Modal, Text } from 'react-native';
import MapView from 'react-native-maps';

export interface FindEscapeRoomProps {
}

const FindEscapeRoom: React.FC<FindEscapeRoomProps> = (props) => {
    
    const [modalOpen, setModalState] = useState<boolean>(false)

    return (
      <>
        <Modal visible={modalOpen} animationType={'slide'}>
          <Text>Map goes here</Text>
          
    <MapView
        style={styles.map}
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
       }}/>

          <View style={styles.closeButton}>
          <Button title='Close' onPress={() => setModalState(false)} color='orange' />
          </View>
        </Modal>
        <View style={styles.button}>
          <Button title={"Find Escape Room"} onPress={() => setModalState(true)} color='#384963'/>
        </View>
      </>
    );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 24,
    paddingHorizontal: 20,
  }, 
  closeButton: {
    marginHorizontal: 40,
  },
map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default FindEscapeRoom;