import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

export interface MarkerInfoProps {
    company: any
}

const MarkerInfo: React.FC<MarkerInfoProps> = (props) => {
  return (  
    <View style={styles.container}>
        <Text style={styles.name}>{props.company.name}</Text>
        {props.company.website && (
          <Text style={styles.website} onPress={() => Linking.openURL(props.company.website)}>Website Link</Text>
        )}
        {!props.company.website && (
          <Text style={styles.website}>No Website Info</Text>
        )}
    </View>
    
  );
};
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#edfcfc',
        width: 300,
        height: 110,
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: 20,
        borderColor: '#384963',
        borderWidth: 1,
    },
    name: {
      fontSize: 16, 
      padding: 10,
      alignSelf: 'center',
    },
    website: {
      color: '#fff',
      alignSelf: 'center',
      backgroundColor: '#384963',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      position: 'absolute',
      bottom: 16,
      alignItems: 'center'
    }
  });

export default MarkerInfo;