import React from "react";
import { View, ActivityIndicator } from "react-native";
import { ColorSchemeName } from "react-native";

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
    }
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes colorScheme={colorScheme} /> : <AuthRoutes />;
};

export default Routes;

// function interception() {
//   api.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (err) => {
//       return new Promise((resolve, reject) => {
//         const originalReq = err.config;
//         console.log("intersept", err.response.status);
//         return <AuthRoutes />;
//         // if(err.response.status == 401 && err.config && !err.config._retry){
//         //   originalReq.config._retry = true;
//         //   AsyncStorage.getItem('@Shild:token').then((token)=> {

//         //   })
//         // }
//       });
//     }
//   );
// }
