import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import SetLocationMapScreen from "../screens/SetLocationMapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import InvoiceDetailScreen from "../screens/InvoiceDetailScreen";
import HistoryInvoiceScreen from "../screens/HistoryInvoiceScreen";
import HistorySolicitationScreen from "../screens/HistorySolicitationScreen";
import ProfileAddressScreen from "../screens/ProfileAddressScreen";
import SetLocationMapAddressScreen from "../screens/SetLocationMapAddressScreen";

import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import SelectViewScreen from "../screens/SelectViewScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return <RootNavigator />;
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const App = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <App.Navigator
      initialRouteName={"Root"}
      screenOptions={{ headerShown: false }}
    >
      <App.Screen name="Root" component={BottomTabNavigator} />
      <App.Screen name="SetLocationMap" component={SetLocationMapScreen} />
      <App.Screen name="Profile" component={ProfileScreen} />
      <App.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
      <App.Screen name="HistoryInvoice" component={HistoryInvoiceScreen} />
      <App.Screen name="ProfileAddress" component={ProfileAddressScreen} />
      <App.Screen name="SelectView" component={SelectViewScreen} />
      
      <App.Screen
        name="SetLocationMapAddress"
        component={SetLocationMapAddressScreen}
      />
      <App.Screen
        name="HistorySolicitatio"
        component={HistorySolicitationScreen}
      />

      <App.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </App.Navigator>
  );
}
