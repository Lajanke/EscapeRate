import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

export interface MarkerInfoProps {
    company: any
}

const MarkerInfo: React.FC<MarkerInfoProps> = (props) => {
  return (
      
    <View style={styles.container}>
        <Text>{props.company.name}</Text>
        <Text>{props.company.website ? props.company.website : 'No Website Info'}</Text>
    </View>
    
  );
};
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: 300,
        height: 50,
        position: "absolute",
        bottom: 0,
    }
  });

export default MarkerInfo;