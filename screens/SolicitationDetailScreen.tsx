import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
// import { Permissions } from 'react-native-unimodules';
import { useIsFocused } from "@react-navigation/native";

import Constants from "expo-constants";

import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import iconClientMap from "../assets/images/iconClientMap.png";

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

export default function SolicitationDetailScreen(props: any) {
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

  const { user, setUser } = useAuth();
  const isFocused = useIsFocused();

  const { navigate, goBack } = useNavigation();
  const colorScheme = useColorScheme();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);

  const [alertMsg, setAlertMsg] = useState<ModalAlert>({});
  const [loading, setLoading] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {}, []);

  useEffect(() => {
    // if(props.route.params){
    //   console.log(props.route.params)
    //   // setFormLocationData(props.route.params.coords)
    // }

    if (isFocused) {
      (async () => {
        // let { status } = await Location.requestForegroundPermissionsAsync();

        const { status } = await Permissions.askAsync(
          Permissions.LOCATION_FOREGROUND
        );

        if (status !== "granted") {
          setAlertMsg({
            mensage: "Permissão de acesso a localização necessária.",
            onPress: () => {
              goBack();
            },
            btnOk: "Ok",
            title: "Atenção",
            icon: "alert-circle",
          });
          setShowAlert(true);
          return;
        }
        let getLocation = await Location.getCurrentPositionAsync({});
        console.log(getLocation);
        setLocation(getLocation);
      })();
    }
  }, [isFocused]);

  const handleSave = async (loc: any) => {
    setLoading(true);

    try {
      const { data } = await api.patch(`users/${user._id}`, {
        coordinates: JSON.stringify(loc.coords),
      });

      setUser(data);
      setShowModal(true);
      setMensage({
        title: "Concluido !",
        mensage: `Localização no maps atualizada. `,
        btnOk: "Ok",
        icon: "check",
        onPress: () => {
          setShowModal(false);
          navigate("ProfileAddress");
        },
      });
      setLoading(false);
    } catch (error) {
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

  function linkWhats() {
    console.log('link')
    Linking.openURL('https://api.whatsapp.com/send?phone=5577981143208&text=Ol%C3%A1%2C%20Preciso%20de%20suporte');
  }

  function linkCall() {
    console.log('link')
    Linking.openURL(`tel:${77981143208}`);
  }

  

  return (
    <>
      <View style={styles.containerMap}>
        {location ? (
          <>
            <MapView
              showsUserLocation={true}
              rotateEnabled={false}
              customMapStyle={mapStyle}
              initialRegion={{
                latitude: location.coords?.latitude,
                longitude: location.coords?.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
              // onRegionChange={(res) => {
              //   console.log(res);
              //   setLocation({ coords: res });
              // }}
              style={styles.map}
            >
              <Marker
                image={iconClientMap}
                key={1}
                coordinate={{
                  latitude: location.coords?.latitude,
                  longitude: location.coords?.longitude,
                }}
                title="Solicitando presença"
                description="Maria do Carlos"
              />
            </MapView>
          </>
        ) : (
          <ActivityIndicator size="large" color={Colors[colorScheme].primary} />
        )}
      </View>
      <View style={styles.containerDetail}>
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
              Ismael
            </Text>
            <Text
              style={[
                {
                  color: Colors[colorScheme].black2,
                  fontWeight: "100",
                },
              ]}
            >
              Hermantino vieira de souza, 630, Novo Horizonte
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
                  color: Colors[colorScheme].orange,
                  fontWeight: "700",
                },
              ]}
            >
              #Rapida
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
            <Text
              style={[
                {
                  color: Colors[colorScheme].orange,
                  fontWeight: "700",
                },
              ]}
            >
              Aberto
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
              10:00 03/12/2021
            </Text>
          </View>
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
            <View style={[{ width: "100%", flexDirection: "row", marginTop: 4 }]}>
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
        </View>
        <View style={styles.gridDetail}>
          <View style={[{ width: "50%" }]}>
            <TouchableHighlight
              style={[
                styles.button,
                { backgroundColor: Colors[colorScheme].primary },
              ]}
              onPress={() => {}}
            >
              <Text style={styles.textButton}>Aceitar</Text>
            </TouchableHighlight>
          </View>
          <View style={[{ width: "50%" }]}>
            <TouchableHighlight
              style={[
                styles.button,
                { backgroundColor: Colors[colorScheme].warning },
              ]}
              onPress={() => {}}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
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
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDetail: {
    flex: 2,
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
    width: "98%",
    borderRadius: 10,
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
