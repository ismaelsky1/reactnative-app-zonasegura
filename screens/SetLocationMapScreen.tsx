import React, { useState, useEffect } from 'react';
import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';


import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';

import { StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import * as Location from 'expo-location';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { Ionicons } from '@expo/vector-icons';
import ModalAlertCustom from '../components/ModalAlertCustom';


export default function SetLocationMapScreen(props: any) {
  const { navigate, goBack } = useNavigation();
  const colorScheme = useColorScheme();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [myDateText, setMyDateText] = useState();


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        alert('false')       
        setErrorMsg('Permission to access location was denied');
        return;
      }else{
        alert('true')
      }

      let getLocation = await Location.getCurrentPositionAsync({});

      if(getLocation){
        alert('true')
      }else{
        alert('false')

      }
      setLocation(getLocation);
    })();
  }, []);

  function setAgenda(){
    setShowAlert(true)
  }


  return (<>
    <View style={styles.container}>
      {(location) ? (
        <>
          <MapView
            initialRegion={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0, longitudeDelta: 0 }}
            onRegionChange={(res) => {
              setLocation({ coords: res })
            }}

            style={styles.map}>

            {/* <Marker
            key={1}
            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
          // title='Meu Local'
          // description='Teste'
          /> */}

          </MapView>
         
          <Ionicons style={{ position: 'absolute', alignSelf: 'center', top: '43%' }} name={'ios-location'} size={37} color={Colors[colorScheme].warning} />
        </>
      ) : (<ActivityIndicator size="large" color={Colors[colorScheme].primary} />)}
    </View>
    <Ionicons onPress={() => { goBack() }} style={{ position: 'absolute', alignSelf: 'flex-start', top: '1%' }} name={'ios-close'} size={37} color={Colors[colorScheme].black} />
          <Text style={{ position: 'absolute', alignSelf: 'center', top: '2.1%', fontSize: 18, fontWeight: 'bold' }} >Local de Encontro</Text>

    <View style={[styles.form, { backgroundColor: Colors[colorScheme].white }]}>
      <Text style={[styles.modalTitle, { color: Colors[colorScheme].black }]}>{props.title}</Text>

      <Text style={[styles.modalMensage, { color: Colors[colorScheme].black }]}>Hora e Data:</Text>
      <TextInputMask
        placeholder='00:00 00/00/0000'
        style={styles.input}
        value={myDateText}
        onChangeText={(ref: any) => { console.log(ref); setMyDateText(ref) }}
        type={'datetime'}
        options={{
          format: 'HH:mm DD/MM/YYYY'
        }}
      />
    </View>

    <TouchableOpacity onPress={() => {setShowAlert(true)} } style={[styles.buttonSave, { backgroundColor: Colors[colorScheme].primary }]}>
      <Text style={{ color: Colors[colorScheme].white, fontWeight: 'bold' }}>
        Salvar
      </Text>
    </TouchableOpacity>

    {showAlert && <ModalAlertCustom title="Concluido"  mensage="Agendamento de escolta realizado." onPress={()=>{goBack()}} btnOk='Ok' icon='check'/>}
  </>)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonSave: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    height: 110,
    width: '100%',
    padding: 5
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  modalMensage: {
    fontSize: 16,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: '100%'
  }
});