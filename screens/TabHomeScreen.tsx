import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ListViewCustom from '../components/ListViewCustom';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ModalAlert } from '../types';

import ModalAlertCustom from '../components/ModalAlertCustom';
import ModalAgendaCustom from '../components/ModalAgendaCustom';

export default function TabHomeScreen(props:any) {
  const [showModal, setShowModal] = useState(false);
  const [showModalAgenda, setShowModalAgenda] = useState(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [listService, setListService] = useState([]);

  // const [formDataTimeData, setFormDataTimeData] = useState(null);
  // const [formLocationData, setFormLocationData] = useState<any>(null);

  
  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();

  function link(params: string) {
    navigate(params);
  }

  useEffect(()=>{
    // if(props.route.params){
    //   console.log(props.route.params)
    //   // setFormLocationData(props.route.params.coords)
    // }
    console.log('home')

    console.log(props.route.params)
  },[props])


  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].primary }]}>
      <Text style={[styles.title, { color: Colors[colorScheme].white }]}>Bem-vindo</Text>
      <Text style={[styles.subtitle, { color: Colors[colorScheme].white }]}>João Victor</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <ListViewCustom data={[{
        title: 'Ajuda - Localização',
        subTitle: 'Vai na localização do seu celular.',
        icons: 'navigate-circle-outline',
        next: false,
        onPress: () => { setShowModal(!showModal); setMensage({ title: "Agente a camilho", mensage: "Usaremos sua geolocalização.", btnOk: 'Ok', icon: 'bike-fast', onPress: () => { } }) },
      }, {
        title: 'Ajuda - Endereço',
        subTitle: 'Vai no endereço cadastrado.',
        icons: 'location-outline',
        next: false,
        onPress: () => { setShowModal(!showModal); setMensage({ title: "Agente a camilho", mensage: "Usaremos seu endereço.", btnOk: 'Ok', icon: 'bike-fast', onPress: () => { } }) },
      }, {
        title: 'Escouta',
        subTitle: 'Agenda um horario para escouta no Bairro.',
        icons: 'map-outline',
        next: false,
        onPress: () => { link('SetLocationMap'); setMensage({ title: "Escolta", mensage: "Usaremos sua geolocalização.", btnOk: 'Ok', icon: 'bike-fast', onPress: () => { } }) },
      }, 
      // {
      //   title: 'Pagamento',
      //   subTitle: 'Agendar pagamento.',
      //   icons: 'calendar',
      //   next: false,
      //   onPress: () => { setShowModal(!showModal); setMensage({ title: "Agente a camilho", mensage: "Usaremos seu endereço.", btnOk: 'Ok', icon: 'bike-fast', onPress: () => { } }) },
      // }
      ]} />

      {showModal && <ModalAlertCustom onPress={() => setShowModal(!showModal)} onPressCancel={()=>{setShowModal(!showModal)}} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title} btnCancel='Cancelar' />}
      {/* {showModalAgenda && <ModalAgendaCustom fromCood={props.route.params?.coords} onPress={() => setShowModalAgenda(!showModalAgenda)} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title}  />} */}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: '15%'
  },
  subtitle: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: '15%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
