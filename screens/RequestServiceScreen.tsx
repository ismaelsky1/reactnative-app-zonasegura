import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderCustom from '../components/HeaderCustom';
import ListViewCustom from '../components/ListViewCustom';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import { ModalContext, ModalContextProvider } from '../contexts/modal';
import useColorScheme from '../hooks/useColorScheme';
import { ItemListView, ModalAlert } from '../types';
import ModalAlertCustom from '../components/ModalAlertCustom';
import ModalAgendaCustom from '../components/ModalAgendaCustom';

export default function RequestServiceScreen(props: any) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);
  // const { navigate, goBack } = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [showModalAgenda, setShowModalAgenda] = useState(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [listService, setListService] = useState([]);
  
  const colorScheme = useColorScheme();
  const [data, setData] = useState(props.route.params as ItemListView);

  useEffect(() => {


  }, [props])

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>
      <HeaderCustom back={'true'} title={data.title} />
      {"Ajuda Rapida" == data.title && <ListViewCustom data={[{
        title: 'Sua Localização',
        subTitle: 'Vamos para a sua localização.',
        icons: 'location',
        next: false,
        onPress: () => { setShowModal(!showModal); setMensage({ title: "Segurança a camilho", mensage: "Usaremos sua geolocalização.", btnOk: 'Ok', icon: 'bike-fast', onPress: () => { } }) },
      }, {
        title: 'Seu endereço',
        subTitle: 'Seu endereço cadastrado.',
        icons: 'home',
        next: false,
        onPress: () => { setShowModal(!showModal); setMensage({ title: "Segurança a camilho", mensage: "Usaremos seu endereço.", btnOk: 'Ok', icon: 'bike-fast', onPress: () => { } }) },
      }]} />
      }

      {"Agendar" == data.title && <ListViewCustom data={[{
        title: 'Escolta',
        subTitle: 'Agende sua escolta em seu bairro.',
        icons: 'location',
        next: false,
        onPress: () => { setShowModalAgenda(!showModalAgenda); setMensage({ title: "Escolta", mensage: "Usaremos sua geolocalização.", btnOk: 'Ok', icon: 'bike-fast', onPress: () => { } }) },
      }, {
        title: 'Pagamento',
        subTitle: 'Dificuldade em pagar? vamos até você!',
        icons: 'home',
        next: false,
        onPress: () => { setShowModalAgenda(!showModalAgenda); setMensage({ title: "Pagamento", mensage: "Usaremos seu endereço.", btnOk: 'Ok', icon: 'bike-fast', onPress: () => { } }) },
      }]} />
      }


      {showModal && <ModalAlertCustom onPress={() => setShowModal(!showModal)} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title} />}
      {showModalAgenda && <ModalAgendaCustom onPress={() => setShowModalAgenda(!showModalAgenda)} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title} />}
    
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
