/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabClientScreen from '../screens/TabClientScreen';
import TabHomeAgentScreen from '../screens/TabHomeAgentScreen';
import TabProfileScreen from '../screens/TabProfileScreen';
import { AgentBottomTabParamList, TabHomeAgentParamList, TabProfileParamList, TabClientParamList } from '../types';

const BottomTab = createBottomTabNavigator<AgentBottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabHomeAgent"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, showLabel: false }}>
      <BottomTab.Screen
        name="TabClient"
        component={TabClientNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="contacts" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabHomeAgent"
        component={TabHomeAgentNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
       <BottomTab.Screen
        name="TabProfile"
        component={TabProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props}/>

}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabClientStack = createStackNavigator<TabClientParamList>();

function TabClientNavigator() {
  return (
    <TabClientStack.Navigator>
      <TabClientStack.Screen
        name="TabClientScreen"
        component={TabClientScreen}
        options={{ headerShown: false }}
      />
    </TabClientStack.Navigator>
  );
}

const TabHomeAgentStack = createStackNavigator<TabHomeAgentParamList>();

function TabHomeAgentNavigator() {
  return (
    <TabHomeAgentStack.Navigator>
      <TabHomeAgentStack.Screen
        name="TabHomeAgentScreen"
        component={TabHomeAgentScreen}
        options={{ headerShown: false }}
      />
    </TabHomeAgentStack.Navigator>
  );
}

const TabProfileStack = createStackNavigator<TabProfileParamList>();

function TabProfileNavigator() {
  return (
    <TabProfileStack.Navigator>
      <TabProfileStack.Screen
        name="TabProfileScreen"
        component={TabProfileScreen}
        options={{ headerShown: false }}
      />
    </TabProfileStack.Navigator>
  );
}
