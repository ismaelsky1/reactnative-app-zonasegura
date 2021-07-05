import React, { useContext, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ItemListView } from '../types';

interface Props {
  title: string;
  background: string;
  isLoading?: boolean;
  isLoadingColor?: string;
  onPress: (res?: any) => void;
}

export default function ButtonCustom(props: Props) {

  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: props.background }]} onPress={props.onPress}>
      {props?.isLoading? (<ActivityIndicator size="small" color={!props.isLoadingColor? '#fff': props.isLoadingColor}  />) : (<Text style={[styles.title, { color: Colors[colorScheme].secund }]}>{props.title}</Text>) }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    height: 55
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
  },

});
