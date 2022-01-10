import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "./Themed";

import { Picker } from "@react-native-picker/picker";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title?: string;
  value: string[] | Number[];
  invalid?: boolean;
  onChangeText: (res: any) => void;
  onBlur?: (res: any) => void;
  selected?: any;
  setSelected?: any;
}

export default function SelectInputObjectCustom(props: Props) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].secund },
      ]}
    >
      <Text style={[styles.title, { color: Colors[colorScheme].black2 }]}>
        {props?.title}
      </Text>
      <Picker
        style={[
          styles.input,
          {
            backgroundColor: Colors[colorScheme].white,
            color: Colors[colorScheme].black,
          },
        ]}
        selectedValue={props.selected}
        onValueChange={(itemValue, itemIndex) => {
          props.setSelected(itemValue);
          props.onChangeText(itemValue);
        }}
        mode="dropdown"
      >
        {props.value.map((item: any) => {
          return (
            <Picker.Item key={String(item?._id)} label={String(item?.name)} value={item?._id} />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    width: "100%",
  },
  input: {
    width: "100%",
    fontSize: 16,
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    height: 50
  },
});
