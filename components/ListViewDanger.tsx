import React, { useContext, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ModalContext, ModalContextProvider } from '../contexts/modal';


import Constants from 'expo-constants';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ItemListView } from '../types';

export default function ListViewDanger(props: { data: ItemListView[] }) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);

  const colorScheme = useColorScheme();
  return (
      <FlatList
        style={styles.containerList}
        data={props.data}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.name} onPress={item.onPress}>
            <View style={[styles.itemList, { backgroundColor: Colors[colorScheme].background }]}>
              <View style={[styles.groupitemList]}>
                <View style={[styles.iconItemList, { backgroundColor: Colors[colorScheme].secund }]}><Ionicons name={item.icon} size={24} color={Colors[colorScheme].warning} /></View>
                <View><Text style={[styles.titleList, { color: Colors[colorScheme].warning }]}>{item.name}</Text>
                  <Text style={[styles.subtitleList, { color: Colors[colorScheme].warning }]}>{item.descript}</Text>
                </View>
              </View>
              {item.next && <View style={[styles.iconItemList]}><Ionicons name="md-chevron-forward" size={24} color={Colors[colorScheme].black2} /></View>}
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
    width: '100%'
  },
  itemList: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    justifyContent: "space-between",
    marginVertical: 8,
    padding: 10,
    borderRadius: 5
  },
  groupitemList: {
    flexDirection: 'row',
  },
  iconItemList: {
    width: 43,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 10
  },
  titleList: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitleList: {
    fontSize: 12,
  },
  forwardItemList: {
    width: '15%',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12
  },
});
