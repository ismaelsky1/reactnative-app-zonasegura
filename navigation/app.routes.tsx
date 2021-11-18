/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import RequestServiceScreen from '../screens/RequestServiceScreen';
import SetLocationMapScreen from '../screens/SetLocationMapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InvoiceDetailScreen from '../screens/InvoiceDetailScreen';
import HistoryInvoiceScreen from '../screens/HistoryInvoiceScreen';
import HistorySolicitationScreen from '../screens/HistorySolicitationScreen';
import ProfileAddressScreen from '../screens/ProfileAddressScreen';
import SetLocationMapAddressScreen from '../screens/SetLocationMapAddressScreen';



import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <RootNavigator />
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const App = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <App.Navigator initialRouteName={'Root'} screenOptions={{ headerShown: false }}>
      <App.Screen name="Root" component={BottomTabNavigator} />
      <App.Screen name="RequestService" component={RequestServiceScreen} />
      <App.Screen name="SetLocationMap" component={SetLocationMapScreen} />
      <App.Screen name="Profile" component={ProfileScreen} />
      <App.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
      <App.Screen name="HistoryInvoice" component={HistoryInvoiceScreen} />
      <App.Screen name="ProfileAddress" component={ProfileAddressScreen} />
      <App.Screen name="SetLocationMapAddress" component={SetLocationMapAddressScreen} />
      <App.Screen name="HistorySolicitatio" component={HistorySolicitationScreen} />
      


      <App.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </App.Navigator>
  );
}

