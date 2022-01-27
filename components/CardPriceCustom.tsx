import React, { useContext, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { Text, View } from './Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ItemListView } from '../types';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  subTitle: string;
  price: string;
  date: string;
  status: string;
  link: { url: '', params: any };
  // onPress: () => void;
}

export default function CardPriceCustom(props: Props) {
  const { navigate, goBack } = useNavigation();
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.card, { backgroundColor: Colors[colorScheme].white }]} >
      <TouchableOpacity style={[]} onPress={() => { navigate(props.link.url, props.link.params) }}>

        <Text style={[styles.title, { color: Colors[colorScheme].black }]}>{props.title}</Text>
        <Text style={[styles.subTitle, { color: Colors[colorScheme].black }]}>{props.subTitle}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.rowCard}>
          <View >
            <Text style={[styles.price, { color: Colors[colorScheme].black }]}>{props.price}</Text>
            <Text style={[styles.date, { color: Colors[colorScheme].black }]}>{props.date}</Text>
          </View>
          <View >
            <Text style={[styles.linkStatus, { color: Colors[colorScheme].primary }]}>{props.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 5,
    padding: 15,
    marginVertical: 5
  },
  title: {
    fontSize: 18,
    fontWeight: '500'
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '300'
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  price: {
    fontSize: 14,
    fontWeight: '500'
  },
  date: {
    fontSize: 11,
    fontWeight: '500'
  },
  linkStatus: {
    fontSize: 14,
    fontWeight: '700'
  },
  rowCard: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
  },
});
