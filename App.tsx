import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import RoomScreen from './src/components/RoomScreen';
import FlashMessage from "react-native-flash-message";
import StatsScreen from './src/components/StatsScreen';

export type StackParamList = {
  Home: undefined;
  Room: { id: number };
  Stats: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const App: React.FC = () => {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#384963',
            height: 40,          
          },
          headerTitleStyle: {
            color: '#fff',
            alignSelf: 'flex-end',  
          },
          headerTintColor: '#fff'
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Room" 
          component={RoomScreen}
          options={{title: '', headerRight: () => <Image style={{width: 30, height: 30, marginRight: 10}} source={require('./src/images/escapeRateLogo.png')}></Image>}}
        />
        <Stack.Screen 
          name="Stats"
          component={StatsScreen}
          options={{title: '', headerRight: () => <Image style={{width: 30, height: 30, marginRight: 10}} source={require('./src/images/escapeRateLogo.png')}></Image>}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    <FlashMessage position="top" />
    </>
  );
};

export default App;