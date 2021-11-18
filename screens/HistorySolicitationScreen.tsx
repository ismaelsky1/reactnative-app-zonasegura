import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Linking,
  Clipboard,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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

export default function HistorySolicitationScreen(props: any) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);
  // const { navigate, goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const [mensage, setMensage] = useState<ModalAlert>({});
  const [mensageMap, setMensageMap] = useState<ModalAlertMap>({});
  const [listSolicitation, setListSolicitation] = useState([]);

  const colorScheme = useColorScheme();

  useEffect(() => {
    getSolicitation();
  }, [props]);

  const getSolicitation = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("solicitation");

      const resp = data.map((item: any) => {
        return {
          name: item.typeSolicitation.name,
          descript: item.typeSolicitation.descript,
          icon: item.typeSolicitation.icon,
          next: false,
          onPress: () => {
            if (
              item.typeSolicitation.action == "GPS" ||
              item.typeSolicitation.action == "ENDERECO"
            ) {
              setShowModal(true);
              setMensage({
                title: `Solicitação: \n${item.typeSolicitation.name}`,
                mensage: `${item.typeSolicitation.descript} \nAgente: ${item.agent.name} foi acionado!`,
                btnOk: "Voltar",
                btnCancel: "Cancelar",
                icon: "run-fast",
                onPress: () => {
                  setShowModal(false);
                },
                onPressCancel: () => {
                  setMensage({
                    title: "Confirma",
                    mensage: `Realmente desejá cancelar? \nO agente já pode esta perto!`,
                    btnOk: "Sim",
                    btnCancel: "Não",
                    icon: "alert",
                    onPress: () => {
                      deleteSolicitation(item.id);
                    },
                    onPressCancel: () => {
                      setShowModal(false);
                    },
                  });
                },
              });
            }

            if (item.typeSolicitation.action == "ESCOLTA") {
              console.log(item.startUp);
              setShowMapModal(true);
              setMensageMap({
                title: `${item.typeSolicitation.name}`,
                mensage: `Local de encontro:`,
                btnOk: "Voltar",
                btnCancel: "Cancelar",
                icon: "map-marker-distance",
                coordinates: item.coordinates,
                startup: item.startUp,
                onPress: () => {
                  setShowMapModal(false);
                },
                onPressCancel: () => {
                  setShowMapModal(false);
                  setShowModal(true);
                  setMensage({
                    title: "Confirma",
                    mensage: `Realmente desejá cancelar? \nO agente já pode esta perto!`,
                    btnOk: "Sim",
                    btnCancel: "Não",
                    icon: "alert",
                    onPress: () => {
                      deleteSolicitation(item.id);
                    },
                    onPressCancel: () => {
                      setShowMapModal(false);
                    },
                  });
                },
              });
            }
          },
        };
      });
      setListSolicitation(resp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setShowModal(!showModal);
      setMensage({
        title: "Error",
        mensage: "Tente novamente mais tarde.",
        btnOk: "Ok",
        icon: "alert",
        onPress: () => {},
      });
    }
  }, []);

  const deleteSolicitation = useCallback(async (id: string) => {
    try {
      const { data } = await api.delete(`solicitation/${id}`);

      getSolicitation();
      setMensage({
        title: "Concluído.",
        mensage: `Solicitação cancelada.`,
        btnOk: "Ok",
        icon: "check",
        onPress: () => {
          setShowModal(false);
        },
      });
    } catch (error) {
      console.log(error);
      setShowModal(!showModal);
      setMensage({
        title: "Error",
        mensage: "Tente novamente mais tarde.",
        btnOk: "Ok",
        icon: "alert",
        onPress: () => {},
      });
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
            {!listSolicitation.length && (
              <Text
                style={[
                  { color: Colors[colorScheme].black2, marginVertical: 10 },
                ]}
              >
                Nenhuma Solicitação.
              </Text>
            )}
            <ListViewDanger data={listSolicitation} />
          </>
        )}
      </View>
      {showModal && (
        <ModalAlertCustom
          onPress={mensage.onPress}
          onPressCancel={mensage.onPressCancel}
          mensage={mensage?.mensage}
          icon={mensage?.icon}
          btnOk={mensage?.btnOk}
          title={mensage?.title}
          btnCancel={mensage?.btnCancel}
        />
      )}
      {showMapModal && (
        <ModalMap
          onPress={mensageMap.onPress}
          onPressCancel={mensageMap.onPressCancel}
          mensage={mensageMap?.mensage}
          coordinates={mensageMap?.coordinates}
          startup={mensageMap.startup}
          icon={mensageMap?.icon}
          btnOk={mensageMap?.btnOk}
          title={mensageMap?.title}
          btnCancel={mensageMap?.btnCancel}
        />
      )}
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
