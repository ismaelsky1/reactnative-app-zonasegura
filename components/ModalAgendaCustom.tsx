import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Modal, StyleSheet, TouchableHighlight, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from './Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ModalAlert } from '../types';

export default function ModalAgendaCustom(props: ModalAlert) {
  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();
  
  const [myDateText, setMyDateText] = useState();

  function link(params: string) {
    navigate(params);
  }
  
  useEffect(()=>{
    console.log(props)
  },[props])

  return <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <MaterialCommunityIcons style={styles.source} name={props.icon} size={40} color="black" />
      <Text style={[styles.modalTitle, { color: Colors[colorScheme].black }]}>{props.title}</Text>

      <Text style={[styles.modalMensage, { color: Colors[colorScheme].black }]}>Hora e Data:</Text>
        <TextInputMask
        placeholder='00:00 00/00/0000'
        style={styles.input}
        value={myDateText}
				onChangeText={(ref: any) => {console.log(ref); setMyDateText(ref)}}
				type={'datetime'}
				options={{
					format: 'HH:mm DD/MM/YYYY'
				}}
			/>
      <Text style={[styles.modalMensage, { color: Colors[colorScheme].black }]}>Local de encontro:</Text>
      <TouchableHighlight
        style={[styles.addlocationButton, { backgroundColor: Colors[colorScheme].white, borderColor: Colors[colorScheme].black2 }]}
        onPress={() => {
          link('SetLocationMap');
        }}>

        <Text style={styles.textStyleAddlocationButton}><MaterialIcons name="add-location-alt" size={20} color={Colors[colorScheme].black2} /></Text>
      </TouchableHighlight>


      <TouchableHighlight
        style={[styles.openButton, { backgroundColor: '#2196F3' }]}
        onPress={() => {
          props?.onPress()
        }}>
        <Text style={styles.textStyle}>{props.btnOk}</Text>
      </TouchableHighlight>
    </View>
  </View>
  {}
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
    borderRadius: 20,
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
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "100%",
    display: 'flex',
    marginTop: 10
  },
  addlocationButton: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    display: 'flex',

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleAddlocationButton: {
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
    textAlign: 'left',
    width: '100%',
    marginTop: 5
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: '100%'
  }
});
