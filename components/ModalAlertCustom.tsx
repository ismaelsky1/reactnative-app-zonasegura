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
import { ModalAlert } from "../types";
import ButtonCustom from "./ButtonCustom";

export default function ModalAlertCustom(props: ModalAlert) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.centeredView}>

      {!props?.isLoading ? (<View style={styles.modalView}>
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
        <View
          style={[
            // { backgroundColor: Colors[colorScheme].secund },
            styles.bodyModalView,
          ]}
        >
          <Text
            style={[styles.modalTitle, { color: Colors[colorScheme].black }]}
          >
            {props.title}
          </Text>
          <Text
            style={[styles.modalMensage, { color: Colors[colorScheme].black2 }]}
          >
            {props.mensage}
          </Text>
        </View>
        <View
          style={[
            // { backgroundColor: Colors[colorScheme].secund },
            styles.footerModal,
          ]}
        >
          <ButtonCustom
            title={props.btnOk}
            onPress={() => {
              props?.onPress();
            }}
            
            isLoading={props.isLoading}
            background={Colors[colorScheme].primary}
          />
            {props.btnCancel && (
            <ButtonCustom
              title={props.btnCancel}
              onPress={() => {
                props?.onPressCancel();
              }}
              style={{ marginLeft: 5 }}
              isLoading={props.isLoading}
              background={Colors[colorScheme].warning}
            />
          )}
        </View>
      </View>) : <ActivityIndicator size="large" color={'#fff'}  />}
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'center'
  },
  openButton: {
    marginLeft: 4
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
    marginVertical: 20,
    fontWeight: "700",
  },
  modalMensage: {
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    lineHeight: 25
  },
});
