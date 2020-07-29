import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import { connect } from 'react-redux';
import { Room } from './HomeScreen';
import { changeRooms } from '../store/rooms/roomActions';

export interface RoomScreenProps {
  setRoomList: React.Dispatch<React.SetStateAction<Room[]>>; 
  navigation: RoomScreenNavigationProp;
  route: RoomScreenRouteProp;
  rooms: Room[];
}

type RoomScreenNavigationProp = StackNavigationProp<StackParamList, 'Room'>;

type RoomScreenRouteProp = RouteProp<StackParamList, 'Room'>;

const RoomScreen: React.FC<RoomScreenProps> = (props) => {
  const room = props.rooms.find(r => r.id === props.route.params.id)

  const deleteRoom = (id) => {
    //console.log('delete pressed', id)
    props.setRoomList(props.rooms.filter(room => room.id !== id));
  }

  return  <View style={styles.roomContainer}>
            <Text style={styles.roomText}>{room?.company}{'\n'}{room?.name}</Text>
            <Image source={{uri: room?.image}} style={{height: 200, resizeMode: 'contain'}}/>
            <View style={styles.statList}>
              <Text style={room?.escaped ? styles.statEsc : styles.statTrap}>{room?.escaped ? 'Smashed It!' : 'Locked Up!'}</Text>
              <Text style={styles.stat}>Time: {room?.time} minutes</Text>
              <Text style={styles.stat}>Escapees: {room?.groupSize}</Text>
            </View>
            <Button title='Delete' onPress={() => deleteRoom(room?.id)} />
          </View>;
};

const styles = StyleSheet.create({
  roomContainer: {
    backgroundColor: '#fff',
  },
  roomText: {
    padding: 20,
    marginBottom: 24,
    backgroundColor: '#384963',
    fontSize: 24,
    textAlign: 'center',
    color: '#fff'
  },
  statList: {
    paddingTop: 24,
  },
  stat: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 24,
  },
  statEsc: {
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#4ba358',
  },
  statTrap: {
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'red',
  }
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

const mapDispatchToProps = dispatch => ({
  setRoomList: (rooms) => dispatch(changeRooms(rooms)) 
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen)