import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, Linking } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import ListViewCustom from "../components/ListViewCustom";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ModalAlert } from "../types";

import ModalAlertCustom from "../components/ModalAlertCustom";
import ModalAgendaCustom from "../components/ModalAgendaCustom";
import { useAuth } from "../hooks/auth";
import TextInputCustom from "../components/TextInputCustom";
import api from "../services/api";

export default function TabClientScreen({ navigation, route }: any) {
  const [mensage, setMensage] = useState("");
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();

  const { signOut, user } = useAuth();

  const [listClients, SetListClients] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    if (isFocused) {
      const getDistrict = user.ownerDistrict.map(item => item._id)
      getListClients(getDistrict,search);
    }

  }, [isFocused,search]);

  const getListClients = useCallback(async (getDistrict,getSearch) => {
    let params: any = {}
    params.district = getDistrict;
    params.role = 'CLIENT';
    if (getSearch !== "") {
      params.name =  getSearch;
      // params.name =  { $regex: new RegExp(getSearch), $options: 'i' };
      
    }

    try {
      console.log(params)
      const { data } = await api.get(`users`, { params });

      const resp = data.map((item: any) => {
        return {
          name: item.name,
          descript: item.phone,
          icon: "person",
          next: true,
          onPress: () => {
            navigate("DetailClient", item);
          },
        };
      });
      SetListClients(resp);
      setLoading(false);
    } catch (err: any) {
      const error = JSON.parse(err.request._response);
      console.log("getDistricts", err.request);

      setMensage("Error, Tente novamente.");
      setLoading(false);
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].secund },
      ]}
    >
      <Text style={[styles.title, { color: Colors[colorScheme].black }]}></Text>
      <Text style={[styles.subtitle, { color: Colors[colorScheme].black }]}>
        Clientes
      </Text>

      <TextInputCustom
        placeholder="Buscar"
        key="Buscar"
        value={search}
        onChangeText={setSearch}
      />
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <ListViewCustom
        data={listClients}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "300",
    width: "100%",
    marginTop: 10,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 34,
    fontWeight: "bold",
    width: "100%",
    marginTop: 0,
    textAlign: "left",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
