import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Room } from './HomeScreen';
import * as V from 'victory-native';
import { Svg } from 'react-native-svg';

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
  const escaped = props.rooms.filter(room => room.escaped).length
  const trapped = props.rooms.filter(room => !room.escaped).length

  const currentData = [ { y: escaped }, { y: trapped }];
  const defaultData = [ { y: 0 }, { y: 1 }];
  const graphicColor = ['#384963', '#b6c4d9'];

  const [graphData, setGraphData] = useState(defaultData);

  useEffect(() => {
    setGraphData(currentData);
  }, []);

  return (
    <SafeAreaView > 
      <>
        <Svg>
      <V.VictoryPie data={graphData}
      width={400} height={300} 
      colorScale={graphicColor} 
      innerRadius={60} 
      labelRadius={90}
      labels={() => null}
      animate={{ duration: 5000}}
      />
       <V.VictoryLabel
          textAnchor="middle"
          verticalAnchor='middle'
          style={[{ fontSize: 40 }, {fontSize: 18}]}
          x={200} y={165}
          text={[`${percent}%`, 'Escaped']}
        />
        </Svg>
      <View >
        <Text style={{color: '#000'}}>StatsScreen {props.rooms.length}</Text>
        <Text><Icon name='timer-outline' size={16} /> {totalTime} minutes</Text>
      </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

/*const mapDispatchToProps = dispatch => ({
  changeRooms: (rooms) => dispatch(changeRooms(rooms)),
  roomsReset: () => dispatch(roomsReset()) 
});*/

export default connect(mapStateToProps)(StatsScreen)