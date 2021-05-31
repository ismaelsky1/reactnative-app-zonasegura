import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderCustom from '../components/HeaderCustom';
import ListViewCustom from '../components/ListViewCustom';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import { ModalContext, ModalContextProvider } from '../contexts/modal';
import useColorScheme from '../hooks/useColorScheme';
import { ItemListView } from '../types';

export default function RequestServiceScreen(props: any) {
  const { openModalAlert, closeModal } = useContext(ModalContext);
  const { navigate, goBack } = useNavigation();

  const colorScheme = useColorScheme();
  const [data, setData] = useState(props.route.params as ItemListView);
  
  return (
      <View style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>
        <HeaderCustom back={'true'} title={data.title} />
        <ListViewCustom data={[{
          title: 'Sua Localização',
          subTitle: 'Vamos para a sua localização.',
          icons: 'location',
          next: false,
          onPress: () => { openModalAlert({ title:"Agente a camilho", mensage: "Usaremos sua geolocalização.", btnOk: 'Ok', icon: 'bike-fast' }) },
        }, {
          title: 'Seu endereço',
          subTitle: 'Seu endereço cadastrado.',
          icons: 'home',
          next: false,
          onPress: () => { <ModalContextProvider children modalAlert={{title:'ok',mensage: 'ok'}} /> }
          // onPress: () => { openModalAlert({ title:"Agente a camilho", mensage: "Usaremos seu endereço.", btnOk: 'Ok', icon: 'bike-fast' }) },
        }]} />
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
