import React from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App';
import { connect } from 'react-redux';
import { Room } from './HomeScreen';

export interface RoomScreenProps {
  navigation: RoomScreenNavigationProp;
  route: RoomScreenRouteProp;
  rooms: Room[];
}

type RoomScreenNavigationProp = StackNavigationProp<StackParamList, 'Room'>;

type RoomScreenRouteProp = RouteProp<StackParamList, 'Room'>;

const RoomScreen: React.FC<RoomScreenProps> = (props) => {
  const room = props.rooms.find(r => r.id === props.route.params.id)
  return <Text>This is the {room?.name} room!</Text>;
};

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});
  
export default connect(mapStateToProps)(RoomScreen)