import React from "react";
import { View, ActivityIndicator } from "react-native";
import { ColorSchemeName } from "react-native";

import AgentRoutes from "./agent.routes";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

import { useAuth } from "../hooks/auth";
import api from "../services/api";

const Routes = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const { user, loading, signOut } = useAuth();

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response.status == 401) {
        signOut();
      }
      throw err;       
    }
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? ((user.role == 'CLIENT')? <AppRoutes colorScheme={colorScheme} />: <AgentRoutes colorScheme={colorScheme} />) : <AuthRoutes />;
};

export default Routes;
