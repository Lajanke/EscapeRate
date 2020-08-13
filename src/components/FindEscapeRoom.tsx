import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, StyleSheet, View, Modal, Text, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import MarkerInfo from './MarkerInfo';

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
    const [info, setInfoOpen] = useState<Boolean>(false);
    const [companyInfo, setMarkerInfo] = useState<any>({});
    const [shouldFetchData, setShouldFetchData] = useState<Boolean>(false)

    useEffect(() => {
      getLocation();
    }, []);

    useEffect(() => {
      if (shouldFetchData) {
        getEscapeRooms(location);
      }   
    }, [shouldFetchData]);

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
          setShouldFetchData(true);
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
      setShouldFetchData(false)
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
      console.log('in get location')
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

    const getCompanyDetails = (company) => {
      axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${company.place_id}&key=AIzaSyBfKa69QF4Y6ghdqsTzsWcLoBTmPvYnBF8`)
          .then((res) => {
            console.log(res)
            updateCompany({...company, website: res.data.result.website})
          })
          .catch((err) => {
            console.log(err)
          })    
    }

    const updateCompany = (company) => {
      setEscapeRooms(escapeRooms.map(comp => {
        if (comp.place_id === company.place_id) {
          return company;
        }
        return comp;
      }))
      setInfoOpen(true)
      setMarkerInfo(company)
    }

    console.log('RENDERING', escapeRooms)

    return (
      <>
      <Modal visible={modalOpen} animationType={'slide'}>   
        <MapView
        moveOnMarkerPress
        showsUserLocation
        zoomControlEnabled={true}
        zoomEnabled={true}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        onPress={() => setInfoOpen(false)}
        >
          {escapeRooms.map((company, index) => {
            return (<Marker
              coordinate={{latitude: company.coordinates.latitude, longitude: company.coordinates.longitude}}
              title={company.name}
              key={`${index}_${Date.now()}`}
              pinColor={'#384963'}
              onPress={() => {
                getCompanyDetails(company)
                setLocation({
                  latitude: company.coordinates.latitude,
                  longitude: company.coordinates.longitude,
                  coordinates: location.coordinates.concat({
                    latitude: company.coordinates.latitude,
                    longitude: company.coordinates.longitude,
                  }) 
                })
              }}>
              <View>
                <Icon name='key' size={40} color='#384963'></Icon> 
              </View>
            </Marker>
          );})}
        </MapView>
        <View style={styles.closeButton}>
            <Button title='Close Map' onPress={() => setModalState(false)} color='orange' />
        </View>
        {info && (
          <MarkerInfo company={companyInfo}/>
        )}
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