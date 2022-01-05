import React, { useContext, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ModalContext, ModalContextProvider } from "../contexts/modal";

import Constants from "expo-constants";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { ItemListView } from "../types";

export default function ListViewCustom(props: {
  data: ItemListView[];
  scrollEnabled?: boolean;
}) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);

  const colorScheme = useColorScheme();
  const random = () => Math.floor(Math.random() * (999999 - 1)) + 1;
  return (
    <FlatList
      scrollEnabled={
        props.scrollEnabled === undefined
          ? true
          : props.scrollEnabled === true
          ? true
          : false
      }
      style={styles.containerList}
      data={props.data}
      renderItem={({ item }) => (
        <TouchableOpacity key={random()} onPress={item.onPress}>
          <View
            key={random()}
            style={[
              styles.itemList,
              { backgroundColor: Colors[colorScheme].background },
            ]}
          >
            <View key={random()} style={[styles.groupitemList]}>
              <View
                key={random()}
                style={[
                  styles.iconItemList,
                  { backgroundColor: Colors[colorScheme].secund },
                ]}
              >
                <Ionicons
                  key={random()}
                  name={item.icon}
                  size={24}
                  color={Colors[colorScheme].primary}
                />
              </View>
              <View key={random()}>
                <Text
                  key={random()}
                  style={[
                    styles.titleList,
                    { color: Colors[colorScheme].black },
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  key={random()}
                  style={[
                    styles.subtitleList,
                    { color: Colors[colorScheme].black2 },
                  ]}
                >
                  {item.descript}
                </Text>
              </View>
            </View>

            {item.status && (
              <View key={random()} style={[styles.statusItemList]}>
                {item.status === "OPEN" && (
                  <Text
                    key={random()}
                    style={[
                      styles.subtitleList,
                      {
                        color: Colors[colorScheme].orange,
                      },
                    ]}
                  >
                    Aberto
                  </Text>
                ) }
                {item.status === "SCHEDULED" && (
                  <Text
                    key={random()}
                    style={[
                      styles.subtitleList,
                      {
                        color: Colors[colorScheme].black2,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                )}
                {(item.status !== "SCHEDULED" && item.status !== "OPEN") && (
                  <Text
                    key={random()}
                    style={[
                      styles.subtitleList,
                      {
                        color: Colors[colorScheme].black2,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                )}
              </View>
            )}
            {item.next && (
              <View key={random()} style={[styles.iconItemList]}>
                <Ionicons
                  key={random()}
                  name="md-chevron-forward"
                  size={24}
                  color={Colors[colorScheme].black2}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  containerList: {
    // flex: 1,
    // marginTop: Constants.statusBarHeight,
    width: "100%",
  },
  itemList: {
    flexDirection: "row",
    height: 64,
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
  },
  groupitemList: {
    flexDirection: "row",
  },
  statusItemList: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: 12,
    marginRight: 10,
  },
  iconItemList: {
    width: 43,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
    marginRight: 10,
  },
  titleList: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitleList: {
    fontSize: 12,
  },
  forwardItemList: {
    width: "15%",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
  },
});
