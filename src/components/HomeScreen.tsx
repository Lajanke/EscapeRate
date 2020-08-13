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
import FindEscapeRoom from './FindEscapeRoom';

declare const global: {HermesInternal: null | {}};

export interface Room {
  id: number;
  name: string;
  date: Date;
  timeLimit: number;
  escaped: boolean;
  time: number;
  groupSize: number;
  image: string;
  company: string;
}

export interface HomeScreenProps {
    navigation: ProfileScreenNavigationProp;
    rooms: Room[];
    changeRooms: any;
    roomsReset: any;
}

type ProfileScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View >
        <Header/>
        <TouchableHighlight onPress={() => props.navigation.navigate('Stats')} >
          <View style={styles.statsBar}>
            <View style={styles.statsIconText}>
              <Text style={styles.totalNumber}>{props.rooms.length} </Text><Text style={styles.totalText}> Escape Attempts</Text>
            </View>
            <View style={styles.statsIconText}>
              <Text style={styles.statsText}>Full Stats </Text><Icon name='chevron-right' size={35} color='#384963' />
            </View>
          </View>
        </TouchableHighlight>
          {props.rooms.map((room) => (
            <TouchableHighlight key={room.id} onPress={() =>
              props.navigation.navigate('Room', { id: room.id })} >
              <View style={styles.room}>
                <Text style={styles.roomText}>
                  {room.name} 
                </Text>
                <Text>
                {room.escaped ? <Icon name='exit-run' color='#4ba358' size={24} /> : <Icon name='door-closed-lock' color='#e84848' size={30} />}
                </Text>
              </View>
              </TouchableHighlight>
            )
          )} 
      </View> 
      <AddRoomButton roomList={props.rooms} setRoomList={props.changeRooms} rooms={props.rooms}/>
      <FindEscapeRoom />
      <Button title='reset' onPress={props.roomsReset}></Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  room: {
    padding: 24,
    backgroundColor: '#edfcfc',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#bac8de',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roomText: {
    fontSize: 24,
  },
  statsBar: {
    padding: 16,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 16,
    paddingTop: 8,
  },
  statsText: {
    fontSize: 16,
    paddingTop: 8,
  },
  statsIconText: {
    flexDirection: 'row',
  },
  totalNumber: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#384963',
  },
  percent: {
    padding: 1,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 3,
    backgroundColor: '#a1adbf'
  },
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

const mapDispatchToProps = dispatch => ({
  changeRooms: (rooms) => dispatch(changeRooms(rooms)),
  roomsReset: () => dispatch(roomsReset()) 
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)