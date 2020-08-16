import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Escape Rate</Text>
        <Image source={require('../images/escapeRateLogo.png')} style={{height: 100, width: 100, borderRadius: 15}} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: '#384963',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 40,
    color: '#fff',
    paddingLeft: 24,
    paddingTop: 24,
  },
});

export default Header;