import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App'
import { Room } from './HomeScreen';
import * as V from 'victory-native';
import { Svg } from 'react-native-svg';
import StackedBarChart from './StackedBarChart';
import { connect } from 'react-redux';

export interface StatsScreenProps {
    navigation: ProfileScreenNavigationProp;
    rooms: Room[];
    changeRooms: Function;
}

interface Ydata {
  y: number,
}

type ProfileScreenNavigationProp = StackNavigationProp<StackParamList, 'Stats'>;

const StatsScreen: React.FC<StatsScreenProps> = (props) => {
  const percent: number = Math.floor((props.rooms.filter((room: Room) => room.escaped === true).length / props.rooms.length) * 100);
  const totalTime: number = props.rooms.reduce((acc, val) => acc + Number(val.time), 0)
  const escaped: number = props.rooms.filter((room: Room) => room.escaped).length
  const trapped: number = props.rooms.filter((room: Room) => !room.escaped).length
  const timeArray: number[] = props.rooms.map((room: Room) => Number(room.timeLimit) - Number(room.time))
  const meanPercent: number = timeArray.reduce((acc: number, val: number) => Number(acc) + Number(val), 0) / props.rooms.length

  const currentData: Ydata[] = [ { y: escaped }, { y: trapped }];
  const defaultData: Ydata[] = [ { y: 0 }, { y: 1 }];
  const currentData2: Ydata[] = [ { y: 1 }, { y: 0 }];
  const graphicColor: string[] = ['#4ba358', '#e84848'];
  const graphicColor2: string[] = ['#384963', '#b6c4d9'];

  const [graphData, setGraphData] = useState<Ydata[]>(defaultData);
  const [graph2Data, setGraph2Data] = useState<Ydata[]>(defaultData);

  useEffect(() => {
    setGraphData(currentData);
    setGraph2Data(currentData2)
  }, []);

  if (props.rooms.length === 0) {
    return <View>
      <Text style={styles.noDataText}>No data to display.{'\n'}Add room to see stats here.</Text>
    </View>
  }

  return (
    <SafeAreaView > 
      <ScrollView>
      <Text style={styles.headerText}>Stats{'\n'}{props.rooms.length} Escape Attepmts</Text>
      <View style={styles.pieCharts}>
      <Svg height={200} width={200}>
      <V.VictoryPie data={graphData}
      width={200} height={200} 
      colorScale={graphicColor} 
      innerRadius={70} 
      labelRadius={90}
      labels={() => null}
      animate={{ duration: 3000}}
      />
       <V.VictoryLabel
          textAnchor="middle"
          verticalAnchor='middle'
          style={[{ fontSize: 32 }, {fontSize: 14}]}
          x={100} y={115}
          text={[`${percent}%`, 'Escaped']}
        />
        </Svg>
        <Svg height={200} width={200}>
      <V.VictoryPie data={graph2Data}
      width={200} height={200} 
      colorScale={graphicColor2} 
      innerRadius={70} 
      labelRadius={90}
      labels={() => null}
      animate={{ duration: 5000}}
      />
       <V.VictoryLabel
          textAnchor="middle"
          verticalAnchor='middle'
          style={[{ fontSize: 32 }, {fontSize: 14}, {fontSize: 14}]}
          x={100} y={110}
          text={[`${totalTime}`, 'Minutes', 'Locked-up']}
        />
        </Svg>
        </View>
        <StackedBarChart />
        
        <Text style={styles.meanText}>Average Time Left: {Math.round(meanPercent)} minutes</Text>
      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  headerText: {
    padding: 20,
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
  pieCharts: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c7c7'
  },
  noDataText: {
    textAlign: 'center',
    padding: 24,
    fontSize: 24,
    color: '#e84848',
  }
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

export default connect(mapStateToProps)(StatsScreen)