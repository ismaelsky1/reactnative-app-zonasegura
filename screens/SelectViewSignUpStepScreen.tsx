import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, Linking } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import ListViewCustom from "../components/ListViewCustom";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { useAuth } from "../hooks/auth";
import TextInputCustom from "../components/TextInputCustom";
import api from "../services/api";
import { AntDesign } from "@expo/vector-icons";
import { string } from "yup/lib/locale";

export default function SelectViewSignUpStepScreen({ navigation, route }: any) {
  const [mensage, setMensage] = useState("");
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();

  const [filter, setFilter] = useState<string>("");
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    console.log('select view step',route.params)
    if (isFocused) {
      getList("");
    }
  }, [isFocused]);

  const getList = useCallback(async (filter) => {
    let user = route.params;
    let params: any = {};
    let url: string = "";
    if (route.params.title == "Estado:") {
      const li = [
        {
          _id: "AC",
          icon: "chevron-forward",
          onPress: () => {
            user.state = "AC";
            navigate("SignUpStep2", user);
          },
          name: "AC",
        },
        {
          _id: "AL",
          icon: "chevron-forward",
          onPress: () => {
            user.state = "AL";
            navigate("SignUpStep2", user);
          },
          name: "AL",
        },
        {
          _id: "AP",
          icon: "chevron-forward",
          onPress: () => {
            user.state = "AP";
            navigate("SignUpStep2", user);
          },
          name: "AP",
        },
        {
          _id: "AM",
          icon: "chevron-forward",
          onPress: () => {
            user.state = "AM";
            navigate("SignUpStep2", user);
          },
          name: "AM",
        },
        {
          _id: "BA",
          icon: "chevron-forward",
          onPress: () => {
            user.state = "BA";
            navigate("SignUpStep2", user);
          },
          name: "BA",
        },
        {
          _id: "CE",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "CE";
            navigate("SignUpStep2", user);
          },
          name: "CE",
        },
        {
          _id: "DF",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "DF";
            navigate("SignUpStep2", user);
          },
          name: "DF",
        },
        {
          _id: "ES",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "ES";
            navigate("SignUpStep2", user);
          },
          name: "ES",
        },
        {
          _id: "GO",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "GO";
            navigate("SignUpStep2", user);
          },
          name: "GO",
        },
        {
          _id: "MA",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "MA";
            navigate("SignUpStep2", user);
          },
          name: "MA",
        },
        {
          _id: "MS",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "MS";
            navigate("SignUpStep2", user);
          },
          name: "MS",
        },
        {
          _id: "MT",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "MT";
            navigate("SignUpStep2", user);
          },
          name: "MT",
        },
        {
          _id: "MG",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "MG";
            navigate("SignUpStep2", user);
          },
          name: "MG",
        },
        {
          _id: "PA",
          icon: "chevron-forward",
          onPress: () => {
            user.state = "PA";
            navigate("SignUpStep2", user);
          },
          name: "PA",
        },
        {
          _id: "PB",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "PB";
            navigate("SignUpStep2", user);
          },
          name: "PB",
        },
        {
          _id: "PR",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "PR";
            navigate("SignUpStep2", user);
          },
          name: "PR",
        },
        {
          _id: "PE",
          icon: "chevron-forward",
          onPress: () => {
            user.state = "PE";
            navigate("SignUpStep2", user);
          },
          name: "PE",
        },
        {
          _id: "RJ",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "RJ";
            navigate("SignUpStep2", user);
          },
          name: "RJ",
        },
        {
          _id: "RN",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "RN";
            navigate("SignUpStep2", user);
          },
          name: "RN",
        },
        {
          _id: "RS",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "RS";
            navigate("SignUpStep2", user);
          },
          name: "RS",
        },
        {
          _id: "RO",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "RO";
            navigate("SignUpStep2", user);
          },
          name: "RO",
        },
        {
          _id: "RR",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "RR";
            navigate("SignUpStep2", user);
          },
          name: "RR",
        },
        {
          _id: "SC",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "SC";
            navigate("SignUpStep2", user);
          },
          name: "SC",
        },
        {
          _id: "SP",
          icon: "chevron-forward",
          onPress: () => {
            user.state = "SP";
            navigate("SignUpStep2", user);
          },
          name: "SP",
        },
        {
          _id: "SE",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "SE";
            navigate("SignUpStep2", user);
          },
          name: "SE",
        },
        {
          _id: "TO",
          icon: "chevron-forward",
          onPress: () => {

            user.state = "TO";
            navigate("SignUpStep2", user);
          },
          name: "TO",
        },
      ];

      setList(li);
      return;
    }

    if (route.params.title == "Cidade:") {
      url = `city`;
    }
    if (route.params.title == "Bairro:") {
      url = `district`;
      if(route.params.city == ''){
        return false;
      }
      params.city = user.city?._id;

    }
    if (filter !== "") {
      params.name = filter;
    }

    try {
      const { data } = await api.get(`${url}`, { params });

      const resp = data.map((item: any) => {
        return {
          name: item.name,
          descript: route.params.title == "Cidade:" ? item.uf : item.city.name,
          icon: "chevron-forward",
          next: false,
          onPress: () => {

            if (route.params.title == "Cidade:") {
              user.city = item;
            }
            if (route.params.title == "Bairro:") {
              user.district = item;
            }

            navigate("SignUpStep2", user);

          },
        };
      });

      setList(resp);
      setLoading(false);
    } catch (err: any) {
      const error = JSON.parse(err.request._response);
      console.log("get", err.request);

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
      <View
        style={{
          paddingTop: 15,
          paddingHorizontal: 15,
          flexDirection: "row",
          backgroundColor: Colors[colorScheme].secund,
          alignItems: "center",
        }}
      >
        <Text style={[styles.subtitle, { color: Colors[colorScheme].black }]}>
          {route.params.title}
        </Text>
        <AntDesign
          onPress={() => {
            goBack();
          }}
          name="close"
          size={28}
          color="black"
        />
      </View>
      <TextInputCustom
        placeholder="Buscar"
        key="Buscar"
        value={search}
        onChangeText={(value) => {
          setSearch(value);
          getList(value);
        }}
      />
      {route.params.title == "Bairro:" && (route.params.city == '' && (<Text style={{ color: Colors[colorScheme].orange }}>Defina sua cidade antes.</Text>))}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <ListViewCustom data={list} />
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
  subtitle: {
    fontSize: 34,
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
