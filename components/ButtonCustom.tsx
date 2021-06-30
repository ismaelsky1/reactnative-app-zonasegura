import React, { useContext, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ItemListView } from '../types';

interface Props {
  title: string;
  background: string;
  onPress: () => void;
}

export default function ButtonCustom(props: Props) {

  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: props.background }]} onPress={props.onPress}>
      <Text style={[styles.title, { color: Colors[colorScheme].secund }]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
  },

});
