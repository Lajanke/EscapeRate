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
import HomeScreen, { Room } from './HomeScreen';

import { connect } from 'react-redux';
import { changeRooms, roomsReset } from '../store/rooms/roomActions';

declare const global: {HermesInternal: null | {}};

export interface StatsScreenProps {
    navigation: ProfileScreenNavigationProp;
    rooms: Room[];
    changeRooms: any;
}

type ProfileScreenNavigationProp = StackNavigationProp<StackParamList, 'Stats'>;

const StatsScreen: React.FC<StatsScreenProps> = (props) => {
  const percent = Math.floor((props.rooms.filter(room => room.escaped === true).length / props.rooms.length) * 100);
  const totalTime = props.rooms.reduce((acc, val) => acc + Number(val.time), 0)

  return (
    <SafeAreaView >
      <ScrollView>
      <View style={styles.container}>
  <Text>StatsScreen {props.rooms.length}</Text>
      </View>
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
  },
  percent: {
    padding: 1,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 3,
    backgroundColor: '#a1adbf'
  },
  resetButton: {
    marginHorizontal: 20,
  }
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

/*const mapDispatchToProps = dispatch => ({
  changeRooms: (rooms) => dispatch(changeRooms(rooms)),
  roomsReset: () => dispatch(roomsReset()) 
});*/

export default connect(mapStateToProps)(StatsScreen)