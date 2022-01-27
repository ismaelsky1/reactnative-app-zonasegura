import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
// import { Permissions } from 'react-native-unimodules';
import { useIsFocused } from "@react-navigation/native";

import moment from "moment";
import "moment/locale/pt-br";

import Constants from "expo-constants";

import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import iconClientMap from "../assets/images/iconClientMap.png";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Switch,
  Linking,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ModalAlertCustom from "../components/ModalAlertCustom";

import { ModalAlert } from "../types";
import api from "../services/api";
import { useAuth } from "../hooks/auth";
import { TouchableHighlight } from "react-native-gesture-handler";
import TextInputCustom from "../components/TextInputCustom";
import TextInputCustomOut from "../components/TextInputCustomOut";

export default function SolicitationDetailScreen({ route }: any) {
  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "poi.school",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ];


  const { user } = useAuth();

  const { navigate, goBack } = useNavigation();
  const colorScheme = useColorScheme();

  const [mensage, setMensage] = useState<ModalAlert>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);
  const [solicitation, setSolicitation] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [showStatusMensagem, setShowStatusMensagem] = useState<boolean>(false);
  const [valueStatusMensagem, setValueStatusMensagem] = useState<string>('');
  const [nextStatus, setNextStatus] = useState('');



  const randomWidth = useSharedValue(5);
  const messageAnimad = useSharedValue(0);

  const config = {
    duration: 1000,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const styleContainerDetail = useAnimatedStyle(() => {
    return {
      flex: withTiming(randomWidth.value, config),
    };
  });
  const styleMessage = useAnimatedStyle(() => {
    return {
      height: withTiming(messageAnimad.value, config),
    };
  });

  useEffect(() => {
    getSolicitation(route.params._id);
    const coordinates = JSON.parse(route.params.coordinates);
    setLocation(coordinates);
  }, []);

  const handleStatus = (nextStatusDto: string) => {

    if (nextStatusDto == 'FINISHED' || nextStatusDto == 'CANCELED') {
      setNextStatus(nextStatusDto)
      randomWidth.value = randomWidth.value == 5 ? 10 : 5;
      messageAnimad.value = messageAnimad.value == 0 ? 120 : 0;
      setShowStatusMensagem(randomWidth.value == 5 ? true : false);

    } else {
      setStatusSolicitation(nextStatusDto)
    }
  };

  const setStatusSolicitation = async (nextStatusDto: string) => {
    setLoading(true);

    try {
      const { data } = await api.get(
        `agent/solicitation/${solicitation._id}/status/${nextStatusDto}?obs=${valueStatusMensagem}`
      );

      setMensage({
        title: "Concluido !",
        mensage: `Solicitação Atualizado `,
        btnOk: "Ok",
        icon: "check",
        onPress: () => {
          setShowModal(false);
        },
      });
      setSolicitation(data);
      setShowModal(true);
      setLoading(false);
      randomWidth.value = 5;
      messageAnimad.value = 0;
      setShowStatusMensagem(false);
    } catch (error: any) {
      setShowModal(!showModal);
      setLoading(false);

      console.log(error.request);
      if (error.request.status == 400) {
        const resp = JSON.parse(error.request._response);
        setMensage({
          title: "Ops...",
          mensage: resp.message,
          btnOk: "Ok",
          icon: "alert",
          onPress: () => {
            setShowModal(false);
          },
        });
      } else {
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
    }
  };


  const getSolicitation = async (_id: any) => {
    setLoading(true);
    try {
      const { data } = await api.get(`solicitation/${_id}`);
      console.log('data', data)
      setSolicitation(data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setShowModal(!showModal);
      setMensage({
        title: "Error",
        mensage: "Tente novamente.",
        btnOk: "Ok",
        icon: "alert",
        onPress: () => {
          setShowModal(false);
          navigate("TabHomeAgent");
        },
      });
    }
  };

  function linkWhats() {
    console.log("link");
    Linking.openURL(
      "https://api.whatsapp.com/send?phone=5577981143208&text=Ol%C3%A1%2C%20Preciso%20de%20suporte"
    );
  }

  function linkCall() {
    console.log("link");
    Linking.openURL(`tel:${77981143208}`);
  }

  return (
    <>
      <View style={styles.containerMap}>
        {/* {false ? ( */}
        {location ? (
          <>
            <MapView
              showsUserLocation={true}
              showsMyLocationButton={true}
              rotateEnabled={false}
              customMapStyle={mapStyle}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.017,
                longitudeDelta: 0.014,
              }}
              style={styles.map}
            >
              <Marker
                image={iconClientMap}
                key={1}
                coordinate={location}
                title="Solicitando presença"
                description="Maria do Carlos"
              />
            </MapView>
          </>
        ) : (
          <ActivityIndicator size="large" color={Colors[colorScheme].primary} />
        )}
      </View>
      {solicitation && (
        <Animated.View style={[styles.containerDetail, styleContainerDetail]}>
          {loading == false ? (<>
            <View
              style={[
                styles.cardCurrent,
                { backgroundColor: Colors[colorScheme].white },
              ]}
            >
              <View style={[{ backgroundColor: Colors[colorScheme].white }]}>
                <Ionicons
                  style={{
                    backgroundColor: Colors[colorScheme].secund,
                    padding: 18,
                    borderRadius: 6,
                  }}
                  name="megaphone-outline"
                  size={24}
                  color={Colors[colorScheme].orange}
                />
              </View>
              <View
                style={[
                  { backgroundColor: Colors[colorScheme].white, width: "78%" },
                ]}
              >
                <Text
                  style={[
                    {
                      color: Colors[colorScheme].black,
                      fontWeight: "700",
                      fontSize: 16,
                    },
                  ]}
                >
                  {solicitation?.client?.name}
                </Text>
                <Text
                  style={[
                    {
                      color: Colors[colorScheme].black2,
                      fontWeight: "100",
                    },
                  ]}
                >
                  {solicitation?.client.street} - {solicitation?.client.number},{" "}
                  {solicitation?.district?.name}
                </Text>
              </View>
            </View>
            <View style={styles.gridDetail}>
              <View style={[{ width: "50%" }]}>
                <Text
                  style={[
                    {
                      color: Colors[colorScheme].black2,
                    },
                  ]}
                >
                  Tipo
                </Text>
                <Text
                  style={[
                    {
                      color: Colors[colorScheme].primary,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {solicitation?.typeSolicitation?.type == "NOW" && "#Rápido"}
                  {solicitation?.typeSolicitation?.type == "SCHEDULED" &&
                    "#Agendado"}
                </Text>
              </View>
              <View style={[{ width: "50%" }]}>
                <Text
                  style={[
                    {
                      color: Colors[colorScheme].black2,
                    },
                  ]}
                >
                  Status
                </Text>
                {solicitation?.status == "OPEN" && (
                  <Text
                    style={[
                      { fontWeight: "700", color: Colors[colorScheme].orange },
                    ]}
                  >
                    Aberto
                  </Text>
                )}
                {solicitation?.status == "SCHEDULED" && (
                  <Text
                    style={[
                      { fontWeight: "700", color: Colors[colorScheme].primary },
                    ]}
                  >
                    Agendado
                  </Text>
                )}
                {solicitation?.status == "CURRENT" && (
                  <Text
                    style={[
                      { fontWeight: "700", color: Colors[colorScheme].primary },
                    ]}
                  >
                    Em atendimento
                  </Text>
                )}
                {solicitation?.status == "FINISHED" && (
                  <Text
                    style={[
                      { fontWeight: "700", color: Colors[colorScheme].sucess2 },
                    ]}
                  >
                    Finalizado
                  </Text>
                )}
                {solicitation?.status == "CANCELED" && (
                  <Text
                    style={[
                      { fontWeight: "700", color: Colors[colorScheme].orange },
                    ]}
                  >
                    Cancelado
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.gridDetail}>
              <View style={[{ width: "50%" }]}>
                <Text
                  style={[
                    {
                      color: Colors[colorScheme].black2,
                    },
                  ]}
                >
                  Agendado
                </Text>
                <Text
                  style={[
                    {
                      color: Colors[colorScheme].black,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {moment(solicitation?.startUp)
                    .locale("pt-br")
                    .format("HH:mm DD/MM/YYYY")}
                </Text>
              </View>
              {user.role == "AGENT" && (
                <View style={[{ width: "50%" }]}>
                  <Text
                    style={[
                      {
                        color: Colors[colorScheme].black2,
                        width: "100%",
                      },
                    ]}
                  >
                    Contato
                  </Text>
                  <View
                    style={[
                      { width: "100%", flexDirection: "row", marginTop: 4 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={linkCall}
                      style={[
                        styles.ButtonCall,
                        { backgroundColor: Colors[colorScheme].primary },
                      ]}
                    >
                      <MaterialIcons
                        color={Colors[colorScheme].white}
                        style={{ alignSelf: "center" }}
                        name="call"
                        size={20}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={linkWhats}
                      style={[
                        styles.ButtonCall,
                        { backgroundColor: Colors[colorScheme].sucess2 },
                      ]}
                    >
                      <Ionicons
                        style={{ alignSelf: "center" }}
                        name="logo-whatsapp"
                        size={20}
                        color={Colors[colorScheme].white}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.gridDetail}>
              <View style={[{ width: "100%" }]}>
                <Text
                  style={[
                    {
                      color: Colors[colorScheme].black2,
                    },
                  ]}
                >
                  Mensagem
                </Text>
                <Text
                  style={[
                    {
                      color: Colors[colorScheme].black,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {solicitation.obs}
                </Text>
              </View>
            </View>
            <Animated.View style={[styleMessage]}>
              <View style={styles.gridDetail}>
                <View style={[{ width: "100%" }]}>
                  <TextInputCustomOut value={valueStatusMensagem} onChangeText={setValueStatusMensagem} placeholder="Motivo..." />
                </View>
              </View>
              <View style={styles.gridDetail}>
                <View style={[{ width: "50%" }]}>
                  <TouchableHighlight
                    style={[
                      styles.button,
                      { backgroundColor: Colors[colorScheme].primary },
                    ]}
                    onPress={() => {
                      setStatusSolicitation(nextStatus);
                    }}
                  >
                    <Text style={styles.textButton}>Salvar</Text>
                  </TouchableHighlight>
                </View><View style={[{ width: "50%" }]}>
                  <TouchableHighlight
                    style={[
                      styles.button,
                      { backgroundColor: Colors[colorScheme].black2 },
                    ]}
                    onPress={() => {
                      randomWidth.value = 5;
                      messageAnimad.value = 0;
                      setShowStatusMensagem(randomWidth.value == 5 ? true : false);
                    }}
                  >
                    <Text style={styles.textButton}>Descartar</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Animated.View>
            {!showStatusMensagem && (<View style={styles.gridDetail}>
              {user.role == "AGENT" && (
                <View style={[{ flex: 1 }]}>
                  {solicitation.status == "OPEN" && (
                    <TouchableHighlight
                      style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme].primary },
                      ]}
                      onPress={() => {
                        handleStatus("CURRENT");
                      }}
                    >
                      <Text style={styles.textButton}>Aceitar</Text>
                    </TouchableHighlight>
                  )}
                  {solicitation.status == "CURRENT" && (
                    <TouchableHighlight
                      style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme].sucess },
                      ]}
                      onPress={() => {
                        handleStatus("FINISHED");
                      }}
                    >
                      <Text style={styles.textButton}>Finalizar</Text>
                    </TouchableHighlight>
                  )}
                  {solicitation.status == "FINISHED" && (
                    <TouchableHighlight
                      style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme].gray },
                      ]}
                      onPress={() => { }}
                    >
                      <Text style={styles.textButton}>...</Text>
                    </TouchableHighlight>
                  )}
                  {solicitation.status == "CANCELED" && (
                    <TouchableHighlight
                      style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme].gray },
                      ]}
                      onPress={() => { }}
                    >
                      <Text style={styles.textButton}>...</Text>
                    </TouchableHighlight>
                  )}
                </View>
              )}
              <View style={[{ flex: 1 }]}>
                {solicitation.status == "CANCELED" && (
                  <TouchableHighlight
                    style={[
                      styles.button,
                      { backgroundColor: Colors[colorScheme].gray },
                    ]}
                    onPress={() => { }}
                  >
                    <Text style={styles.textButton}>...</Text>
                  </TouchableHighlight>
                )}
                {solicitation.status == "FINISHED" && (
                  <TouchableHighlight
                    style={[
                      styles.button,
                      { backgroundColor: Colors[colorScheme].gray },
                    ]}
                    onPress={() => { }}
                  >
                    <Text style={styles.textButton}>...</Text>
                  </TouchableHighlight>
                )}
                {solicitation.status == "OPEN" && (
                  <TouchableHighlight
                    style={[
                      styles.button,
                      { backgroundColor: Colors[colorScheme].warning },
                    ]}
                    onPress={() => {
                      handleStatus("CANCELED");
                    }}
                  >
                    <Text style={styles.textButton}>Cancelar</Text>
                  </TouchableHighlight>
                )}
                {user.role == "AGENT" && (
                  <>
                    {solicitation.status == "CURRENT" && (
                      <TouchableHighlight
                        style={[
                          styles.button,
                          { backgroundColor: Colors[colorScheme].warning },
                        ]}
                        onPress={() => {
                          handleStatus("CANCELED");
                        }}
                      >
                        <Text style={styles.textButton}>Cancelar</Text>
                      </TouchableHighlight>
                    )}
                  </>
                )}
              </View>
            </View>)}
          </>) : (<ActivityIndicator size="large" color={Colors[colorScheme].primary} />)}
        </Animated.View>
      )}
      <TouchableOpacity
        onPress={goBack}
        style={[
          styles.ButtonGoBack,
          { backgroundColor: Colors[colorScheme].secund },
        ]}
      >
        <MaterialIcons
          color={Colors[colorScheme].black}
          style={{ alignSelf: "center" }}
          name="keyboard-arrow-left"
          size={35}
        />
      </TouchableOpacity>

      {showModal && (
        <ModalAlertCustom
          title={mensage.title}
          mensage={mensage?.mensage}
          onPress={mensage.onPress}
          btnOk={mensage.btnOk}
          icon={mensage.icon}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerMap: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDetail: {
    flex: 5,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -9,
  },
  map: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    width: "100%",
    height: "100%",
  },
  buttonSave: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    height: 110,
    width: "100%",
    padding: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalMensage: {
    fontSize: 16,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: "100%",
  },
  boxAtiveStatusAgent: {
    flexDirection: "row",
    display: "flex",
    position: "relative",
    // width: "100%",
    height: 35,
    backgroundColor: "red",
  },
  textAtiveStatusAgent: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ButtonGoBack: {
    width: 45,
    height: 45,
    position: "absolute",
    top: 10,
    left: 15,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    // bottom: "50%",
  },
  ButtonCall: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    marginRight: 4,
    // bottom: "50%",
  },
  cardCurrent: {
    width: "100%",
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
  },
  gridDetail: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 8,
    flexDirection: "row",
    // justifyContent: "flex-start",
  },
  button: {
    // flex: 1,
    height: 40,
    width: "100%",
    borderRadius: 10,
    margin: 1,
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    margin: "auto",
  },
});
