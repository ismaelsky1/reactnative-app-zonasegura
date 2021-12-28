/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import SetLocationMapScreen from "../screens/SetLocationMapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileAddressScreen from "../screens/ProfileAddressScreen";
import SetLocationMapAddressScreen from "../screens/SetLocationMapAddressScreen";
import SolicitationDetailScreen from "../screens/SolicitationDetailScreen";
import DetailClientScreen from "../screens/DetailClientScreen";
import HistoryInvoiceScreen from '../screens/HistoryInvoiceScreen';
import InvoiceDetailScreen from "../screens/InvoiceDetailScreen";

import { AgentStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigatorAgent";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return <RootNavigator />;
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const App = createStackNavigator<AgentStackParamList>();

function RootNavigator() {
  return (
    <App.Navigator
      initialRouteName={"RootAgent"}
      screenOptions={{ headerShown: false }}
    >
      <App.Screen name="RootAgent" component={BottomTabNavigator} />
      <App.Screen name="SetLocationMap" component={SetLocationMapScreen} />
      <App.Screen name="Profile" component={ProfileScreen} />
      <App.Screen name="ProfileAddress" component={ProfileAddressScreen} />
      <App.Screen name="SetLocationMapAddress" component={SetLocationMapAddressScreen}/>
      <App.Screen name="SolicitationDetail" component={SolicitationDetailScreen} />
      
      <App.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
      <App.Screen name="DetailClient" component={DetailClientScreen} />
      <App.Screen name="HistoryInvoice" component={HistoryInvoiceScreen} />

      <App.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </App.Navigator>
  );
}
