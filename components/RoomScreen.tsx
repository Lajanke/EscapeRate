import React from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../App'

export interface RoomScreenProps {
  navigation: RoomScreenNavigationProp;
  route: RoomScreenRouteProp;
}

type RoomScreenNavigationProp = StackNavigationProp<
StackParamList,
'Room'
>;

type RoomScreenRouteProp = RouteProp<StackParamList, 'Room'>;

const RoomScreen: React.FC<RoomScreenProps> = (props) => {
    return <Text>This is the {props.route?.params?.name ?? 'Unknown'} room!</Text>;
  };

export default RoomScreen;