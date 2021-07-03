import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Modal, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from './Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ModalAlert } from '../types';

export default function ModalAlertCustom(props: ModalAlert) {
  const colorScheme = useColorScheme();

  return <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <MaterialCommunityIcons style={styles.source} name={props.icon} size={70} color="black" />
      <Text style={[styles.modalTitle, { color: Colors[colorScheme].black }]}>{props.title}</Text>
      <Text style={[styles.modalMensage, { color: Colors[colorScheme].black2 }]}>{props.mensage}</Text>
      <TouchableHighlight
        style={[styles.openButton, { backgroundColor: '#2196F3' }]}
        onPress={() => {
          props?.onPress()
        }}>
        <Text style={styles.textStyle}>{props.btnOk}</Text>
      </TouchableHighlight>
      {props.btnCancel && <TouchableHighlight
        style={[styles.openButton, { backgroundColor: Colors[colorScheme].warning }]}
        onPress={() => {
          if (props?.onPressCancel) {
            props.onPressCancel()
          }
        }}>
        <Text style={styles.textStyle}>{props.btnCancel}</Text>
      </TouchableHighlight>}
    </View>
  </View>
}

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    height: '100%',
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: '60%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  source: {
    marginVertical: 25
  },
  openButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    width: "80%",
    display: 'flex',
    marginBottom: 10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: '700'
  },
  modalMensage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25
  }
});
