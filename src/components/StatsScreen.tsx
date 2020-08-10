import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
  RecyclerViewBackedScrollViewComponent,
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
  const timeArray = props.rooms.map(room =>  Number(room.timeLimit) - Number(room.time))
  const meanPercent = timeArray.reduce((acc, val) => Number(acc) + Number(val), 0) / props.rooms.length

  const currentData = [ { y: escaped }, { y: trapped }];
  const defaultData = [ { y: 0 }, { y: 1 }];
  const currentData2 = [ { y: 1 }, { y: 0 }];
  const graphicColor = ['#384963', '#b6c4d9'];

  const [graphData, setGraphData] = useState(defaultData);
  const [graph2Data, setGraph2Data] = useState(defaultData);

  useEffect(() => {
    setGraphData(currentData);
    setGraph2Data(currentData2)
  }, []);

  return (
    <SafeAreaView > 
      <Text style={styles.roomText}>Stats{'\n'}{props.rooms.length} Escape Attepmts</Text>
  
      <Svg height={250} width={400}>
      <V.VictoryPie data={graphData}
      width={400} height={300} 
      colorScale={graphicColor} 
      innerRadius={60} 
      labelRadius={90}
      labels={() => null}
      animate={{ duration: 3000}}
      />
       <V.VictoryLabel
          textAnchor="middle"
          verticalAnchor='middle'
          style={[{ fontSize: 40 }, {fontSize: 18}]}
          x={200} y={165}
          text={[`${percent}%`, 'Escaped']}
        />
        </Svg>
        <Svg height={250} width={400}>
      <V.VictoryPie data={graph2Data}
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
          style={[{ fontSize: 40 }, {fontSize: 16}, {fontSize: 16}]}
          x={200} y={165}
          text={[`${totalTime}`, 'Minutes', 'Locked-up']}
        />
        </Svg>
        <Text style={styles.meanText}>Average Time Left {Math.round(meanPercent)} minutes</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  meanText: {
    fontSize: 24,
    textAlign: 'center',
    paddingTop: 24,
  },
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

export default connect(mapStateToProps)(StatsScreen)