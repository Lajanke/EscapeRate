import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Room } from './HomeScreen';
import * as V from 'victory-native';
import { Svg } from 'react-native-svg';
import { connect } from 'react-redux';

export interface StackedBarChartProps {
    rooms: Room[];
    changeRooms: any;
}

const StackedBarChart: React.FC<StackedBarChartProps> = (props) => {
  const yearArray = props.rooms.map(room => new Date(room.date).getFullYear())
  const maxYear = Math.max(...yearArray)
  const minYear = Math.min(...yearArray)
  const years: number[] = []

  let i = minYear

  while (i <= maxYear) {
    years.push(i)
    i++
  }

  const dataByYear = years.map(y => {
      return {  year: y,
                data: props.rooms.filter(room => new Date(room.date).getFullYear() === y)}
  })

  return (
    <View style={styles.container}>
    <Svg height={275} width={350} style={{marginTop: 24}}> 
         <V.VictoryChart
            domainPadding={{x: 24}}
            horizontal={true}
            width={350}
         >
        <V.VictoryStack>
            {dataByYear.map((year, index) => {
                return <V.VictoryBar
                key={index} 
                style={{data: {fill: 'red'}}}
                    animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                    }}
                    data={[{x: `${year.year}`, y: year.data.filter(room => room.escaped === false).length},]}
                />
            })}
             {dataByYear.map((year, index) => {
                return <V.VictoryBar 
                    key={index}
                    style={{data: {fill: 'green'}}}
                    animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}
                    data={[{x: `${year.year}`, y: year.data.filter(room => room.escaped === true).length}]}
                />
            })}
        </V.VictoryStack>       
      </V.VictoryChart>
      <V.VictoryLabel 
        style={[{ fontSize: 16, color: '#384963',}]}
        text={['Escape Rate', 'by year']}
        verticalAnchor='start'
      />
        <V.VictoryLegend x={150} y={0}
            orientation="horizontal"
            gutter={20}
            data={[
            { name: 'Escaped', symbol: { fill: 'green', } },
            { name: 'Trapped', symbol: { fill: 'red' } },
            ]}
        />
    </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});

const mapStateToProps = state => ({
  rooms: state.rooms.rooms
});

export default connect(mapStateToProps)(StackedBarChart)