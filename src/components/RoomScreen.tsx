import React from 'react';
import { Text, View, Image, StyleSheet, Button, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import { connect } from 'react-redux';
import { Room } from './HomeScreen';
import { changeRooms } from '../store/rooms/roomActions';
import { showMessage } from "react-native-flash-message";
import RoomHeader from './RoomHeader';
import { ScrollView } from 'react-native-gesture-handler';

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
    props.setRoomList(props.rooms.filter(room => room.id !== id));
    showMessage({
      message: 'Deleted',
      type: 'danger',
      duration: 1000,
    }) 
    props.navigation.navigate('Home');    
  }
  
  const minutes = room ? Number(room.timeLimit) - Number(room.time) : '';

  return (
    <SafeAreaView style={styles.roomContainer}>
      <ScrollView>
    <View >
    <RoomHeader company={room?.company ? room?.company : ''} roomName={room?.name ? room?.name : ''} date={room?.date ? new Date(room?.date).toDateString() : 'Date unknown'}/>
    <Text style={room?.escaped ? styles.statEsc : styles.statTrap}>{room?.escaped ? 'Escaped!' : 'Locked Up!'}</Text>
     <Image source={room?.image ? 
      {uri: (`file:///${room?.image}`)} 
      : room?.escaped ? require('../images/escaped.jpg') 
      : {uri: ('https://thumbs.dreamstime.com/b/combination-lock-quest-escape-room-vintage-to-be-opened-solved-126538995.jpg')}} 
      style={(room?.image || (!room?.image && !room?.escaped)) 
      ? {height: 200, resizeMode: 'contain', marginTop: 24} 
      : {height: 200, resizeMode: 'contain', marginTop: 24, alignSelf: 'center'} }/>
     <View >    
       <Text style={styles.stat}><Icon name='hourglass-outline' size={24} /> {room?.time} minutes</Text>
       <Text style={styles.escapeText}>{minutes >= 0 ? `Escaped with ${minutes} minutes to spare`: `You needed just ${minutes ? Math.abs(minutes): ''} minutes to survive`}</Text>
       <Text style={styles.stat}><Icon name='people' size={24} /> {room?.groupSize}</Text>
     </View>
     <View style={styles.button}>
       <Button title='Delete Room' color='#e84848' onPress={() => deleteRoom(room?.id)} />
     </View>
   </View>
   </ScrollView>
   </SafeAreaView>
  )    
};

const styles = StyleSheet.create({
  roomContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  roomText: {
    padding: 20,
    marginBottom: 24,
    backgroundColor: '#384963',
    fontSize: 24,
    textAlign: 'center',
    color: '#fff'
  },
  stat: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 24,
  },
  escapeText: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 24,
  },
  statEsc: {
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#4ba358',
    color: '#fff',
  },
  statTrap: {
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#e84848',
    color: '#fff'
  },
  button: {
    marginVertical: 24,
    paddingHorizontal: 20,
    width: 150,
    alignSelf: 'center',
  }
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

const mapDispatchToProps = dispatch => ({
  setRoomList: (rooms) => dispatch(changeRooms(rooms)) 
});
  
export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen)