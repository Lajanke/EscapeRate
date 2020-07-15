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
import { StackParamList } from '../App'

declare const global: {HermesInternal: null | {}};

export interface Room {
  id: number;
  name: string;
  escaped: boolean;
}

export interface HomeScreenProps {
    navigation: ProfileScreenNavigationProp;
}

type ProfileScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Home'
>;

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const [roomList, setRoomList] = useState<Room[]>([
    { id: 1, name: 'Pirate Ship', escaped: false },
    { id: 2, name: 'Egyptian Tomb', escaped: true},
    { id: 3, name: 'Viking', escaped: true },
  ]);

  return (
    <SafeAreaView >
      <ScrollView>
      <View style={styles.container}>
        <Header/>
          {roomList.map((room) => (
              <View key={room.id}>
                <Text style={styles.room}>{room.name} : {room.id}</Text>
                <Text>{room.escaped ? 'Escaped, hurrah!' : 'Locked in!'}</Text>
                <Button
                 title={`${room.name} room stats`}
                 onPress={() =>
                   props.navigation.navigate('Room', { name: room.name })
                 }
                />
              </View>
            )
          )} 
      </View> 
      <AddRoomButton roomList={roomList} setRoomList={setRoomList} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  room: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#cfcfcf',
    fontSize: 24,
  },
});

export default HomeScreen;