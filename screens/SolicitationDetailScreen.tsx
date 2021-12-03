import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
// import { Permissions } from 'react-native-unimodules';
import { useIsFocused } from "@react-navigation/native";

import Constants from 'expo-constants';

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
      const { data } = await api.patch(`users/${user.id}`, {
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

  return (
    <>
      {/* <TouchableOpacity
        style={[
          styles.activeButtonSolicitations,
          { backgroundColor: Colors[colorScheme].secund },
        ]}
      >
        <MaterialIcons
          color={Colors[colorScheme].primary}
          style={{ position: "absolute", alignSelf: "center", top: "44%" }}
          name="location-history"
          size={35}
        />
      </TouchableOpacity> */}
      <View style={styles.boxAtiveStatusAgent}>
        {isEnabled && (
          <Text
            style={[
              styles.textAtiveStatusAgent,
              { color: Colors[colorScheme].sucess },
            ]}
          >
            Ativo
          </Text>
        )}
        {!isEnabled && (
          <Text
            style={[
              styles.textAtiveStatusAgent,
              { color: Colors[colorScheme].warning },
            ]}
          >
            Ausente
          </Text>
        )}
        <Switch
          trackColor={{ false: "#767577", true: Colors[colorScheme].black2 }}
          thumbColor={isEnabled ? Colors[colorScheme].sucess : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.container}>
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
              {/* <Marker
                key={2}
                coordinate={{
                  latitude: location.coords?.latitude,
                  longitude: location.coords?.longitude,
                }}
                title="Solicitando presença"
                description="Maria do Carlos"
                
              /> */}
            </MapView>

            {/* <MaterialIcons
              color={Colors[colorScheme].primary}
              style={{ position: "absolute", alignSelf: "center", top: "44%" }}
              name="location-history"
              size={37}
            /> */}
          </>
        ) : (
          <ActivityIndicator size="large" color={Colors[colorScheme].primary} />
        )}
      </View>
      
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
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    height: "90%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    width: '100%',
    height: '100%',
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
    display: 'flex',
    position: 'relative',   
    // width: "100%",
    height: 35,
    backgroundColor: 'red'
  },
  textAtiveStatusAgent: {
    fontSize: 18,
    fontWeight: "bold",
  },
  activeButtonSolicitations: {
    width: 35,
    height: 35,
    // position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    bottom: "50%",
  },
});
