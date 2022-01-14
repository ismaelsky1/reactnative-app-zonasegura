import React, { useCallback, useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import ListViewCustom from "../components/ListViewCustom";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ModalAlert } from "../types";

import ModalAlertCustom from "../components/ModalAlertCustom";
import locationsetImg from "../assets/images/locationset.png";

import api from "../services/api";
import { useAuth } from "../hooks/auth";
import { AntDesign, Foundation } from "@expo/vector-icons";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default function TabHomeScreen({ route, navigation }: any) {
  const [showModal, setShowModal] = useState(false);

  const [mensage, setMensage] = useState<ModalAlert>({});
  const [listService, setListService] = useState([]);
  const [isLoade, setIsLoade] = useState(true);
  const [isAddressFull, setIsAddressFull] = useState(true);
  const [nick, setNick] = useState("");

  const { user } = useAuth();

  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // if(props.route.params){
    //   console.log(props.route.params)
    //   // setFormLocationData(props.route.params.coords)
    // }

    if (isFocused) {
      if (!user.coordinates) {
        setIsAddressFull(false);
      } else if (!user.address) {
        setIsAddressFull(false);
      } else {
        setIsAddressFull(true);
      }
      getTypeSolicitation();
    }

    const use = user.name.split(" ");
    setNick(use[0]);
  }, [isFocused]);

  const getTypeSolicitation = useCallback(async () => {
    try {
      setIsLoade(true);
      const { data } = await api.get("type-solicitation");

      const resp = data.map((item: any) => {
        console.log(item.action);
        return {
          name: item.name,
          descript: item.descript,
          icon: item.icon,
          next: false,
          onPress: () => {
            if (item.type == "NOW") {
              setShowModal(true);
              setMensage({
                title: "Confirmar",
                mensage: `${item.name} sera solicitado \n Realmente desejá concluir?`,
                btnOk: "Sim",
                icon: "help-circle",
                onPress: () => {
                  createSolicitation(item);
                },
                btnCancel: "Não",
                onPressCancel: () => {
                  setShowModal(false);
                },
              });
            }

            if (item.type == "SCHEDULED") {
              navigate(`SetLocationMap`, { typeSolicitation: item });
            }
          },
        };
      });

      setListService(resp);
      setIsLoade(false);
    } catch (error) {
      setShowModal(!showModal);
      setMensage({
        title: "Error",
        mensage: "Tente novamente mais tarde.",
        btnOk: "Ok",
        icon: "alert",
        onPress: () => {
          setShowModal(false);
        },
      });
    }
  }, []);

  const createSolicitation = async (typeSolicitation: any) => {
    let coord;

    if (typeSolicitation.action == "GPS") {
      const { status } = await Permissions.askAsync(
        Permissions.LOCATION_FOREGROUND
      );

      if (status !== "granted") {
        setMensage({
          mensage: "Permissão de acesso a localização necessária.",
          onPress: () => {
            goBack();
          },
          btnOk: "Ok",
          title: "Atenção",
          icon: "alert-circle",
        });
        setShowModal(true);
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      coord = JSON.stringify(coords);
    }

    if (typeSolicitation.action == "ENDERECO") {
      coord = user.coordinates;
    }

    try {
      const { data } = await api.post("solicitation", {
        client: user,
        typeSolicitation: typeSolicitation,
        district: user.district,
        status: "OPEN",
        obs: "",
        coordinates: coord,
      });
      console.log(data)

      setMensage({
        title: "Concluido !",
        mensage: `Suporte foi solicitado \n logo chegaremos no local!`,
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
        mensage: "Tente novamente.",
        btnOk: "Ok",
        icon: "alert",
        onPress: () => {
          setShowModal(false);
        },
      });
    }
  };

  return (
    <>
      {isAddressFull ? (
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
            {nick}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate("HistorySolicitatio");
            }}
            style={styles.history}
            key="+"
          >
            <Text style={styles.titleSolicitation}>Suas Solicitações</Text>
            <View>
              <AntDesign
                name="rightcircleo"
                size={24}
                color={Colors[colorScheme].black2}
              />
            </View>
          </TouchableOpacity>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />

          {listService && <ListViewCustom data={listService} />}
        </View>
      ) : (
        <View
          style={[
            styles.container,
            { backgroundColor: Colors[colorScheme].white },
          ]}
        >
          <Text style={[styles.title, { color: Colors[colorScheme].primary }]}>
            Bem-vindo
          </Text>
          <Text
            style={[styles.subtitle, { color: Colors[colorScheme].primary }]}
          >
            {nick}
          </Text>
          <Image style={styles.locationsetImg} source={locationsetImg} />

          <Text style={[styles.title, { color: Colors[colorScheme].black2 }]}>
            Finalize seu cadastro
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigate("ProfileAddress");
            }}
            style={[
              styles.continue,
              { backgroundColor: Colors[colorScheme].primary },
            ]}
            key="++"
          >
            <Text
              style={[
                styles.titleSolicitation,
                { color: Colors[colorScheme].white },
              ]}
            >
              CONTINUAR
            </Text>

            {/* <AntDesign
                name="rightcircleo"
                size={24}
                color={Colors[colorScheme].white}
              /> */}
          </TouchableOpacity>
        </View>
      )}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  history: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    marginVertical: 20,
    borderRadius: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  continue: {
    width: "90%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    marginVertical: 50,
    borderRadius: 30,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  titleSolicitation: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  locationsetImg: {
    width: 200,
    height: 200,
  },
});
