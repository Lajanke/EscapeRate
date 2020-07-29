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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { changeRooms, roomsReset } from '../store/rooms/roomActions';

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
    rooms: Room[];
    changeRooms: any;
    roomsReset: any;
}

type ProfileScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const percent = Math.floor((props.rooms.filter(room => room.escaped === true).length / props.rooms.length) * 100);
  const totalTime = props.rooms.reduce((acc, val) => acc + Number(val.time), 0)

  return (
    <SafeAreaView >
      <ScrollView>
      <View style={styles.container}>
        <Header/>
        <View style={styles.statsBar}>
          <Text style={styles.statsText}>{percent}<Icon name='percent-outline' size={16}/></Text>
          <Text style={styles.statsText}>{props.rooms.length} Escape Attempts</Text>
          <Text style={styles.statsText}><Icon name='timer-outline' size={16} /> {totalTime}</Text>
        </View>
          {props.rooms.map((room) => (
            <TouchableHighlight key={room.id} onPress={() =>
              props.navigation.navigate('Room', { id: room.id })} >
              <View style={styles.room}>
                <Text style={styles.roomText}>
                  {room.name} 
                </Text>
                <Text>
                {room.escaped ? <Icon name='exit-run' color='green' size={24} /> : <Icon name='door-closed-lock' color='red' size={30} />}
                </Text>
              </View>
              </TouchableHighlight>
            )
          )} 
      </View> 
      <AddRoomButton roomList={props.rooms} setRoomList={props.changeRooms} rooms={props.rooms}/>
      <Button title='store reset' onPress={props.roomsReset}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  room: {
    padding: 24,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomText: {
    fontSize: 24,
  },
  statsBar: {
    padding: 16,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
    statsText: {
      fontSize: 16,
    }
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

const mapDispatchToProps = dispatch => ({
  changeRooms: (rooms) => dispatch(changeRooms(rooms)),
  roomsReset: () => dispatch(roomsReset()) 
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)