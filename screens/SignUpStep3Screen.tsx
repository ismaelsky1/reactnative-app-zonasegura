import React, { useState, useEffect, useCallback } from "react";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
// import { Permissions } from 'react-native-unimodules';

import MapView from "react-native-maps";

import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { Ionicons } from "@expo/vector-icons";
import ModalAlertCustom from "../components/ModalAlertCustom";

import { ModalAlert } from "../types";
import { useAuth } from "../hooks/auth";

export default function SetLocationMapAddressScreen({ route, navigation }: any) {

  const { navigate, goBack } = useNavigation();
  const colorScheme = useColorScheme();

  const { signUp } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [modalAlert, setModalAlert] = useState<ModalAlert>({});
  const [location, setLocation] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    (async () => {
      // let { status } = await Location.requestForegroundPermissionsAsync();

      const { status } = await Permissions.askAsync(
        Permissions.LOCATION_FOREGROUND
      );

      if (status !== "granted") {
        setModalAlert({
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
      let getLocation = await Location.getCurrentPositionAsync({});

      setLocation(getLocation);
    })();

  }, []);


  const handleSave = useCallback(
    async (data: any) => {
      setShowModal(false);
      setLoading(true);
      setModalAlert({});

      try {

        let dataUser: any = {};
        dataUser.email = route.params.email;
        dataUser.name = route.params.name;
        dataUser.street = route.params.street;
        dataUser.city = route.params.city._id;
        dataUser.district = route.params.district._id;
        dataUser.complement = route.params.complement;
        dataUser.document = route.params.document.replace(/[^0-9]/g, "");
        dataUser.number = route.params.number;
        dataUser.phone = route.params.phone.replace(/[^0-9]/g, "");
        dataUser.role = "CLIENT";
        dataUser.state = route.params.state;
        dataUser.postCode = route.params.postCode.replace(/[^0-9]/g, "");
        dataUser.coordinates = JSON.stringify(data.coords);
        dataUser.dueDate = route.params.dueDate;
        dataUser.password = route.params.password;
        
        const response: any = await signUp(dataUser);
        console.log(response)
        navigate("CheckSms", {navigateStep: '', ...response});

      } catch (error: any) {
        setLoading(false);
        setShowModal(true);
        console.log('error', error.request)
        if (error.request.status == 404) {
          // const response = JSON.parse(error.request.response);
          setModalAlert({ title: 'Ops...', icon: 'information', onPress: () => { navigate('SignUp') }, btnOk: 'Voltar', mensage: "Telefone ou CPF já utilizado!" });
        } else {
          setModalAlert({ title: 'Ops...', icon: 'information', onPress: () => { navigate('SignUp') }, btnOk: 'Voltar', mensage: "Error, Tente novamente mais tarde!" });
        }
      }
    },
    [signUp]
  );

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
          title={modalAlert.title}
          mensage={modalAlert?.mensage}
          onPress={modalAlert.onPress}
          btnOk={modalAlert.btnOk}
          icon={modalAlert.icon}
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
