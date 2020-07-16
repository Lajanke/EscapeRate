import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import RoomScreen from './src/components/RoomScreen';

export type StackParamList = {
  Home: undefined;
  Room: { id: number };
};

const Stack = createStackNavigator<StackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen 
          name="Room" 
          component={RoomScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;