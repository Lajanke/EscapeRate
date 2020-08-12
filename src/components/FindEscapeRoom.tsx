import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, StyleSheet, View, Modal, Text, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface FindEscapeRoomProps {
}

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FindEscapeRoom: React.FC<FindEscapeRoomProps> = (props) => { 
    const [modalOpen, setModalState] = useState<boolean>(false)
    const [location, setLocation] = useState<any>({
      latitude: 0,
      longitude: 0,
      coordinates: [],
    });
    const prevLocation: any = usePrevious(location) || location;
    const [escapeRooms, setEscapeRooms] = useState<any>([]);

    useEffect(() => {
      getLocation();
    }, []);

    useEffect(() => {
      if (location.latitude !== prevLocation.latitude || location.longitude !== prevLocation.longitude) {
        getEscapeRooms(location);
      }   
    }, [location]);

    const setCurrentLocation = () => {
      console.log('fetching location');
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

    const getEscapeRooms = async (location) => {
      await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=20000&keyword=escape&&key=AIzaSyBfKa69QF4Y6ghdqsTzsWcLoBTmPvYnBF8`)
      .then((res) => {
        setEscapeRooms(res.data.results.map(company => {
          return {name: company.name,
                  place_id: company.place_id,
                  coordinates: {
                    latitude: company.geometry.location.lat,
                    longitude: company.geometry.location.lng
                  },
          }
        }))
      })
      .catch((err) => {
        console.log(err)
      })
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

    const getCompanyDetails = (id) => {
      setEscapeRooms(escapeRooms.map(company => {
        if (company.place_id === id) {
          company.website = 'www.meatspin.com';
        }
        return company;
      }))
    }

    const customCallout = (company) => {
      if (company.place_id === 'ChIJP1hvbSqze0gRNl_nkKxwN38') {
        console.log('customCallout', company);
      }
      return (<Text key={`${company.place_id}_callout`}>Website: {company.website || 'Unknown'}</Text>);
    }

    const markers: any[] = [];

    return (
      <>
      <Modal visible={modalOpen} animationType={'slide'}>   
        <MapView
        showsUserLocation
        zoomControlEnabled={true}
        zoomEnabled={true}
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        }}>
          {escapeRooms.map((company, index) => {
            return (<Marker
              ref={ref => {
                markers[index] = ref;
              }}
              coordinate={{latitude: company.coordinates.latitude, longitude: company.coordinates.longitude}}
              title={company.name}
              key={index}
              pinColor={'#384963'}
              onPress={(e) => {
                getCompanyDetails(company.place_id)   
              }}>
              <View>
                <Icon name='key' size={40} color='#384963'></Icon> 
              </View>
              <Callout tooltip>
                {customCallout({...company})}                
              </Callout>
            </Marker>
          );})}
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
    marginLeft: 24,
    width: 100,
    marginTop: 24,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default FindEscapeRoom;