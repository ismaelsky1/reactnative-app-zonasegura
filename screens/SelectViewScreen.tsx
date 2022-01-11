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
import { AntDesign } from "@expo/vector-icons";
import { string } from "yup/lib/locale";

export default function SelectViewScreen({ navigation, route }: any) {
  const [mensage, setMensage] = useState("");
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();

  const { signOut, user, setUser } = useAuth();

  const [filter, setFilter] = useState<string>("");
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    // if(props.route.params){
    //   console.log(props.route.params)
    //   // setFormLocationData(props.route.params.coords)
    // }
  console.log(user.city)

    if (isFocused) {
      getList("");
    }
  }, [isFocused]);

  const getList = useCallback(async (filter) => {
    let params: any = {};
    let url: string = "";
    if (route.params.title == "Estado:") {
      const li = [
        {
          _id: "AC",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("AC");
          },
          name: "AC",
        },
        {
          _id: "AL",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("AL");
          },
          name: "AL",
        },
        {
          _id: "AP",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("AP");
          },
          name: "AP",
        },
        {
          _id: "AM",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("AM");
          },
          name: "AM",
        },
        {
          _id: "BA",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("BA");
          },
          name: "BA",
        },
        {
          _id: "CE",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("CE");
          },
          name: "CE",
        },
        {
          _id: "DF",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("DF");
          },
          name: "DF",
        },
        {
          _id: "ES",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("DF");
          },
          name: "ES",
        },
        {
          _id: "GO",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("GO");
          },
          name: "GO",
        },
        {
          _id: "MA",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("MA");
          },
          name: "MA",
        },
        {
          _id: "MS",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("MS");
          },
          name: "MS",
        },
        {
          _id: "MT",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("MT");
          },
          name: "MT",
        },
        {
          _id: "MG",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("MG");
          },
          name: "MG",
        },
        {
          _id: "PA",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("PA");
          },
          name: "PA",
        },
        {
          _id: "PB",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("PB");
          },
          name: "PB",
        },
        {
          _id: "PR",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("PR");
          },
          name: "PR",
        },
        {
          _id: "PE",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("PE");
          },
          name: "PE",
        },
        {
          _id: "RJ",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("RJ");
          },
          name: "RJ",
        },
        {
          _id: "RN",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("RN");
          },
          name: "RN",
        },
        {
          _id: "RS",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("RS");
          },
          name: "RS",
        },
        {
          _id: "RO",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("RO");
          },
          name: "RO",
        },
        {
          _id: "RR",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("RR");
          },
          name: "RR",
        },
        {
          _id: "SC",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("SC");
          },
          name: "SC",
        },
        {
          _id: "SP",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("SP");
          },
          name: "SP",
        },
        {
          _id: "SE",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("SE");
          },
          name: "SE",
        },
        {
          _id: "TO",
          icon: "chevron-forward",
          onPress: () => {
            handleSave("TO");
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
      params.city = user.city._id;
    }
    if (filter !== "") {
      params.name = filter;
    }
    console.log("params", params);
    try {
      const { data } = await api.get(`${url}`, { params });
      // console.log(data);

      const resp = data.map((item: any) => {
        return {
          name: item.name,
          descript: route.params.title == "Cidade:" ? item.uf : item.city.name,
          icon: "chevron-forward",
          next: false,
          onPress: () => {
            handleSave(item._id);
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

  const handleSave = useCallback(async (idDto: any) => {
    let params: any = {};

    if (route.params.title == "Estado:") {
      params.state = idDto;
    }
    if (route.params.title == "Cidade:") {
      params.city = idDto;
    }
    if (route.params.title == "Bairro:") {
      params.district = idDto;
    }
    console.log("params", params);
    try {
      const { data } = await api.patch(`users/${user._id}`, params);
      setUser(data);
      setLoading(false);
      goBack();
    } catch (err: any) {
      // const error = JSON.parse(err.request._response);
      console.log("err", err.request);
      // setMensageWarning("Error, Tente novamente.");
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
      {route.params.title == "Bairro:" && (user.city == undefined && (<Text style={{color: Colors[colorScheme].orange}}>Defina sua cidade antes.</Text>))}
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
