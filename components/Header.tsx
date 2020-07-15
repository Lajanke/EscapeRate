import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
        <Text style={styles.headerText}>Escape Rate</Text>
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
  });

export default Header;