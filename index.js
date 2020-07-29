/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './src/store/configureStore';

const { store, persistor } = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);

