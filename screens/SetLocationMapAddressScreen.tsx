import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
// import { Permissions } from 'react-native-unimodules';

import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";

import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { Ionicons } from "@expo/vector-icons";
import ModalAlertCustom from "../components/ModalAlertCustom";

import { ModalAlert } from "../types";
import api from "../services/api";
import { useAuth } from "../hooks/auth";

export default function SetLocationMapAddressScreen(props: any) {
  const { user, setUser } = useAuth();

  const { navigate, goBack } = useNavigation();
  const colorScheme = useColorScheme();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);

  const [alertMsg, setAlertMsg] = useState<ModalAlert>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

      if (user.coordinates) {
        setLocation({ coords: JSON.parse(user.coordinates) });
      } else {
        setLocation(getLocation);
      }
    })();
  }, []);

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

  return (
    <>
      <View style={styles.container}>
        {location ? (
          <>
            <MapView
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.017,
                longitudeDelta: 0.014
              }}
              showsMyLocationButton={true}
              showsUserLocation={true}
              // followsUserLocation={true}
              onRegionChange={(res) => {
                setLocation({ coords: res });
              }}
              style={styles.map}
            >
              {/* <Marker
                key={1}
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                // title='Meu Local'
                // description='Teste'
              /> */}
            </MapView>

            <Ionicons
              style={{ position: "absolute", alignSelf: "center", top: "44%" }}
              name={"ios-location"}
              size={37}
              color={Colors[colorScheme].warning}
            />
          </>
        ) : (
          <ActivityIndicator size="large" color={Colors[colorScheme].primary} />
        )}
      </View>

      <Ionicons
        onPress={() => {
          goBack();
        }}
        style={{ position: "absolute", alignSelf: "flex-start", top: "1%" }}
        name={"ios-close"}
        size={37}
        color={Colors[colorScheme].black}
      />
      <Text
        style={{
          position: "absolute",
          alignSelf: "center",
          top: "2.1%",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Seu endereço
      </Text>

      <TouchableOpacity
        onPress={() => {
          handleSave(location);
        }}
        style={[
          styles.buttonSave,
          { backgroundColor: Colors[colorScheme].primary },
        ]}
      >
        <Text style={{ color: Colors[colorScheme].white, fontWeight: "bold" }}>
          Salvar
        </Text>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
});
