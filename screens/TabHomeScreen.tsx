import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import ListViewCustom from "../components/ListViewCustom";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ModalAlert } from "../types";

import ModalAlertCustom from "../components/ModalAlertCustom";
import ModalAgendaCustom from "../components/ModalAgendaCustom";

import api from "../services/api";
import SkeletonLoader from "../components/SkeletonLoader";

export default function TabHomeScreen({ route, navigation }: any) {
  const [showModal, setShowModal] = useState(false);
  const [showModalAgenda, setShowModalAgenda] = useState(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [listService, setListService] = useState([]);

  // const [formDataTimeData, setFormDataTimeData] = useState(null);
  // const [formLocationData, setFormLocationData] = useState<any>(null);

  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();
  const isFocused = useIsFocused();

  function link(params: string) {
    navigate(params);
  }

  useEffect(() => {
    // if(props.route.params){
    //   console.log(props.route.params)
    //   // setFormLocationData(props.route.params.coords)
    // }
    // console.log(route.params);
    if (isFocused) {
      getTypeSolicitation();
    }
  }, [isFocused]);

  const getTypeSolicitation = useCallback(async () => {
    try {
      const { data } = await api.get("type-solicitation");

      const resp = data.map((item: any) => {
        return {
          name: item.name,
          descript: item.descript,
          icon: item.icon,
          next: false,
          onPress: () => {
            setShowModal(!showModal);
            setMensage({
              title: "Agente a camilho",
              mensage: "Usaremos sua geolocalização.",
              btnOk: "Ok",
              icon: "bike-fast",
              onPress: () => {},
            });
          },
        };
      });

      setListService(resp);
    } catch (error) {
      console.log(error);
      setShowModal(!showModal);
      setMensage({
        title: "Agente a camilho",
        mensage: "Usaremos sua geolocalização.",
        btnOk: "Ok",
        icon: "bike-fast",
        onPress: () => {},
      });
    }
  }, []);

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].primary },
        ]}
      >
        <Text style={[styles.title, { color: Colors[colorScheme].white }]}>
          Olá
        </Text>
        <Text style={[styles.subtitle, { color: Colors[colorScheme].white }]}>
          João Victor
        </Text>
        <View
          style={[
            {
              backgroundColor: Colors[colorScheme].primary,
              width: "100%",
            },
          ]}
        >
           {!listService && <SkeletonLoader />}
          
        </View>
      
        {listService && <ListViewCustom data={listService} />}
        {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      </View>
      {showModal && (
        <ModalAlertCustom
          onPress={() => setShowModal(!showModal)}
          onPressCancel={() => {
            setShowModal(!showModal);
          }}
          mensage={mensage?.mensage}
          icon={mensage?.icon}
          btnOk={"OK"}
          title={mensage?.title}
          btnCancel="Cancelar"
        />
      )}
      {/* {showModalAgenda && <ModalAgendaCustom fromCood={props.route.params?.coords} onPress={() => setShowModalAgenda(!showModalAgenda)} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title}  />} */}
    </>
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
    fontSize: 18,
    fontWeight: "300",
    marginTop: "15%",
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
