import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Modal, Text, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'

export interface FindEscapeRoomProps {
}

const FindEscapeRoom: React.FC<FindEscapeRoomProps> = (props) => {
    
    const [modalOpen, setModalState] = useState<boolean>(false)
    const [location, setLocation] = useState<any>({
      latitude: 0,
      longitude: 0,
      coordinates: [],
    })

    useEffect(() => {
      getLocation()
    }, []);

    const setCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            coordinates: location.coordinates.concat({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          });
        },
        error => {
          console.log(error)
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
        }
      );
    }

    const getLocation = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "Escape Rate needs to access your location to show " +
              "great escape rooms near you",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setCurrentLocation()
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      
      <>
        <Modal visible={modalOpen} animationType={'slide'}>
          <Text>Map goes here</Text>
          
    <MapView
        style={styles.map}
        region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
       }}>
        <Marker
        coordinate={{
          latitude: location.latitude,
            longitude: location.longitude,
        }}></Marker>
          </MapView>
          <View style={styles.closeButton}>
          <Button title='Close' onPress={() => setModalState(false)} color='orange' />
          </View>
        </Modal>
        <View style={styles.button}>
          <Button title={"Find Escape Room"} onPress={() => {setModalState(true)}} color='#384963'/>
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