import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Linking,
  Clipboard,
  ActivityIndicator,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
// import Clipboard from '@react-native-clipboard/clipboard';

import HeaderCustom from "../components/HeaderCustom";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import { ModalContext, ModalContextProvider } from "../contexts/modal";
import useColorScheme from "../hooks/useColorScheme";
import { ModalAlert, ModalAlertMap } from "../types";

import ModalAlertCustom from "../components/ModalAlertCustom";
import ModalMap from "../components/ModalAlertMap";

import api from "../services/api";
import ListViewDanger from "../components/ListViewDanger";
import { useAuth } from "../hooks/auth";
import ListViewCustom from "../components/ListViewCustom";

export default function HistorySolicitationScreen(props: any) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);
  const isFocused = useIsFocused();

  const { user } = useAuth();

  const { navigate, goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const [mensage, setMensage] = useState('');
  const [listSolicitation, setListSolicitation] = useState([]);

  const colorScheme = useColorScheme();

  useEffect(() => {
    if(isFocused){
      getSolicitation();
    }
  }, [isFocused]);

  const getSolicitation = useCallback(async () => {
    setIsLoading(true);
    setMensage('');
    try {
      const { data } = await api.get(`solicitation?client._id=${user._id}`);

      const resp = data.map((item: any) => {
        return {
          name: item.typeSolicitation.name,
          // descript: ' ',
          status: item.status,
          icon: item.typeSolicitation.icon,
          next: false,
          onPress: () => {
            navigate("SolicitationDetail", item);
          },
        };
      });
      if(!resp.length){
        setMensage("Nenhuma Solicitação foi Encontrada");
      }
      setListSolicitation(resp);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMensage("Error no servidor, tente novamente mais tarde!");
    }
  }, []);

  return (
    <>
      <HeaderCustom back={"true"} title={"Solicitações Abertas"} />
      <View
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].secund },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors[colorScheme].primary} />
        ) : (
          <>
            {mensage !== '' && (
              <Text
                style={[
                  { color: Colors[colorScheme].orange, marginVertical: 10 },
                ]}
              >
                {mensage}
              </Text>
            )}
            <ListViewCustom data={listSolicitation} />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    width: "100%",
  },
  subtitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: "15%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
