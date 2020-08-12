import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface RoomHeaderProps {
    company: string;
    roomName: string;
    date: string;
}

const RoomHeader: React.FC<RoomHeaderProps> = (props) => {
  return (
    <View style={styles.header}>
        <Text style={styles.roomText}>{props.roomName}</Text>
        <Text style={styles.companyText}>{props.company}</Text> 
        <Text style={styles.dateText}>{props.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 24,
    backgroundColor: '#384963',
    alignItems: 'center',
  },
  roomText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  companyText: {
    fontSize: 20,
    color: '#fff',
  },
  dateText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default RoomHeader;