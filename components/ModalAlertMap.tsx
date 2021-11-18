import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "./Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ModalAlertMap } from "../types";
import MapView, { Marker } from "react-native-maps";

import moment from "moment";
import "moment/locale/pt-br";

// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";

export default function ModalMapAlert(props: ModalAlertMap) {
  const colorScheme = useColorScheme();
  const [coordinates, setCoordinates] = useState<any>(null);
  const [startUp, setStartUp] = useState<string>("");

  useEffect(() => {
    setStartUp(
      moment(props.startup).locale("pt-br").format("HH:mm DD/MM/YYYY")
    );

    let coordinate = JSON.parse(`${props?.coordinates}`);
    setCoordinates(coordinate);
  }, []);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View
          style={[
            { backgroundColor: Colors[colorScheme].secund },
            styles.headerModalView,
          ]}
        >
          <MaterialCommunityIcons
            style={styles.source}
            name={props.icon}
            size={70}
            color={Colors[colorScheme].primary}
          />
        </View>
        <View pointerEvents="none" style={[styles.bodyModalView]}>
          <Text
            style={[styles.modalTitle, { color: Colors[colorScheme].black }]}
          >
            {props.title}
          </Text>

          <Text
            style={[
              styles.modalMensageStartUp,
              {
                color: Colors[colorScheme].primary,
                backgroundColor: Colors[colorScheme].secund,
              },
            ]}
          >
            {startUp}
          </Text>
          <Text
            style={[styles.modalMensage, { color: Colors[colorScheme].black2 }]}
          >
            {props.mensage}
          </Text>

          {coordinates && (
            <MapView
              pointerEvents="none"
              region={{
                latitude: coordinates?.latitude,
                longitude: coordinates?.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.0221,
              }}
              accessibilityViewIsModal={true}
              style={styles.map}
            >
              <Marker
                key={1}
                coordinate={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                }}
               
              />
            </MapView>
          )}
        </View>
        <View
          style={[
            // { backgroundColor: Colors[colorScheme].secund },
            styles.footerModal,
          ]}
        >
          {props.btnCancel && (
            <TouchableHighlight
              style={[
                styles.openButton,
                { backgroundColor: Colors[colorScheme].warning },
              ]}
              onPress={() => {
                props?.onPressCancel();
              }}
            >
              <Text style={styles.textButton}>{props.btnCancel}</Text>
            </TouchableHighlight>
          )}
          <TouchableHighlight
            style={[
              styles.openButton,
              { backgroundColor: Colors[colorScheme].primary },
            ]}
            onPress={() => {
              props?.onPress();
            }}
          >
            <Text style={styles.textButton}>{props.btnOk}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: "60%",
  },
  centeredView: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.5)",
    height: "100%",
    width: "100%",
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    // borderRadius: 10,
    padding: 0,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 500,
    height: "100%",
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
  headerModalView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "35%",
  },
  source: {
    marginVertical: 0,
  },
  bodyModalView: {
    width: "100%",
    height: "53%",
    justifyContent: "center",
    alignItems: "center",
  },
  footerModal: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  openButton: {
    // flex: 1,
    height: 40,
    width: "47%",
    borderRadius: 45,
    marginHorizontal: 5,
    marginVertical: 20,
    paddingTop: 10,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    margin: "auto",
  },
  modalTitle: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "700",
  },
  modalMensage: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalMensageStartUp: {
    fontSize: 21,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "red",
    padding: 8,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
});
