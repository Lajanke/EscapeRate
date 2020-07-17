import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import AddRoomButton from './AddRoomButton';
import Header from './Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App'
import { TouchableHighlight } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { changeRooms } from '../store/rooms/roomActions';

declare const global: {HermesInternal: null | {}};

export interface Room {
  id: number;
  name: string;
  escaped: boolean;
  time: number;
  groupSize: number;
  image: string;
  company: string;
  companyURL: string;
}

export interface HomeScreenProps {
    navigation: ProfileScreenNavigationProp;
    count: any;
    changeCount: any;
    rooms: Room[];
    changeRooms: any;
}

type ProfileScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = (props) => {

  return (
    <SafeAreaView >
      <ScrollView>
      <View style={styles.container}>
        <Header/>
          {props.rooms.map((room) => (
            <TouchableHighlight key={room.id} onPress={() =>
              props.navigation.navigate('Room', { id: room.id })} >
              <View >
                <Text style={styles.room}>{room.name}{'\n'}
                {room.escaped ? 'Escaped, hurrah!' : 'Locked in!'}
                </Text>
              </View>
              </TouchableHighlight>
            )
          )} 
      </View> 
      <AddRoomButton roomList={props.rooms} setRoomList={props.changeRooms} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  room: {
    padding: 30,
    backgroundColor: '#fff',
    fontSize: 24,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
  },
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

const mapDispatchToProps = dispatch => ({
  changeRooms: (rooms) => dispatch(changeRooms(rooms)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)