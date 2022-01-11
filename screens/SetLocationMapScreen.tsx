import React, { useState, useEffect, useCallback } from "react";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
import DateTimePicker from "@react-native-community/datetimepicker";

import moment from "moment";
import "moment/locale/pt-br";

// import { Permissions } from 'react-native-unimodules';

import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";

import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { Feather, Ionicons } from "@expo/vector-icons";
import ModalAlertCustom from "../components/ModalAlertCustom";

import { ModalAlert } from "../types";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useAuth } from "../hooks/auth";
import api from "../services/api";

export default function SetLocationMapScreen({ route, navigation }: any) {
  const { user } = useAuth();

  const { navigate, goBack } = useNavigation();
  const colorScheme = useColorScheme();

  const [mensage, setMensage] = useState<ModalAlert>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<any>("date");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    
    const currentDate = selectedDate || date;
    console.log('11',currentDate);

    setShowDateTimePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = () => {
    setShowDateTimePicker(true);
    setMode("time"); // "date" "time"
  };


  const createSolicitation = async (idTypeSolicitation: string, loc: any) => {
  
    try {
      const { data } = await api.post("solicitation", {
        client: user._id,
        agent: user.responsibleAgent._id,
        typeSolicitation: idTypeSolicitation,
        status: "OPEN",
        obs: "",
        startUp: date,
        coordinates: JSON.stringify(loc.coords),
      });
      setShowModal(true);
      setMensage({
        title: "Concluido !",
        mensage: `Agendamento foi solicitado. \n O prazo de aguarde pelo segurança \né de 5 minutos no local! `,
        btnOk: "Ok",
        icon: "check",
        onPress: () => {
          setShowModal(false);
          navigate('TabHome')
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

  useEffect(() => {
    showMode();
    (async () => {
      // let { status } = await Location.requestForegroundPermissionsAsync();

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
      let getLocation = await Location.getCurrentPositionAsync({});
      setLocation(getLocation);
      // setAlertMsg({ mensage: `Sua localização é: ${getLocation.coords.latitude}, ${getLocation.coords.longitude}`, onPress: () => { setShowModal(false) }, btnOk: 'Ok', title: 'Atenção', icon: 'alert-circle' });
      // setShowModal(true)
    })();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {location ? (
          <>
            <MapView
              showsMyLocationButton={true}
              showsUserLocation={true}
              
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
              onRegionChange={(res) => {
                setLocation({ coords: res });
              }}
              style={styles.map}
            >
            </MapView>

            <Ionicons
              style={{ position: "absolute", alignSelf: "center", top: "43%" }}
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
        Local de Encontro
      </Text>

      <View
        style={[styles.form, { backgroundColor: Colors[colorScheme].white }]}
      >
        <View
          style={[
            styles.formDetail,
            { backgroundColor: Colors[colorScheme].white },
          ]}
        >
          <Text
            style={[styles.modalTitle, { color: Colors[colorScheme].black }]}
          >
            Detalhe
          </Text>

          <Text
            style={[styles.modalMensage, { color: Colors[colorScheme].black2 }]}
          >
            Data:{" "}
            {date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear()}{" "}
            {"\n"}
            Hora: {date.getHours() + ":" + ((date.getMinutes() < 10)? `0${date.getMinutes()}`: date.getMinutes())}
          </Text>
        </View>
        <View
          style={[
            styles.formIcon,
            { backgroundColor: Colors[colorScheme].white },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              showMode();
            }}
          >
            <Feather name="edit" size={24} color={Colors[colorScheme].black} />
          </TouchableOpacity>
        </View>

      </View>

      <TouchableOpacity
        onPress={() => {
          createSolicitation(route.params?.idTypeSolicitation, location);
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
          onPress={mensage.onPress}
          onPressCancel={mensage.onPressCancel}
          mensage={mensage?.mensage}
          icon={mensage?.icon}
          btnOk={mensage?.btnOk}
          title={mensage?.title}
          btnCancel={mensage?.btnCancel}
        />
      )}
      {showDateTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
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
    height: 100,
    width: "100%",
    padding: 15,
    flexDirection: "row",
  },
  formDetail: {
    width: "80%",
  },
  formIcon: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
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
