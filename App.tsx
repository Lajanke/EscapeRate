/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [roomList, setRoomList] = useState([
    {room: 'Pirate Ship', Escaped: 'No',},
    {room: 'Egyptian Tomb', Escaped: 'Yes',},
    {room: 'Viking', Escaped: 'Yes',},
  ])



  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerText}>Escape Rate</Text>
      </View>
      {roomList.map((room) => {
        return (
          <View key={room.room}>
            <Text style={styles.room}>{room.room}</Text>
          </View>
        )
      })}
    </View>
  
  
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 30,
    backgroundColor: '#cc3d3d',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
  },
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

export default App;
