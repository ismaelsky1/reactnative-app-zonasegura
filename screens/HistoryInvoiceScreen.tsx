import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Linking, Clipboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Clipboard from '@react-native-clipboard/clipboard';

import HeaderCustom from '../components/HeaderCustom';
import ListViewCustom from '../components/ListViewCustom';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import { ModalContext, ModalContextProvider } from '../contexts/modal';
import useColorScheme from '../hooks/useColorScheme';
import { ItemListView, ModalAlert } from '../types';
import ModalAlertCustom from '../components/ModalAlertCustom';
import ModalAgendaCustom from '../components/ModalAgendaCustom';
import CardPriceCustom from '../components/CardPriceCustom';

export default function HitoryInvoiceScreen(props: any) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);
  // const { navigate, goBack } = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [showModalAgenda, setShowModalAgenda] = useState(false);
  const [mensage, setMensage] = useState<ModalAlert>({});

  const colorScheme = useColorScheme();

  useEffect(() => {


  }, [props])


  return (
    <>
      <HeaderCustom back={'true'} title={'Historico de Contas'} />

      <View style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>
        <CardPriceCustom title='Plano Mensal' subTitle="serviço de seguraça privada" price="R$ 19,00" date="Vencimento dia 02/04/21" status="Em aberto" link='InvoiceDetail' />
        <CardPriceCustom title='Plano Mensal' subTitle="serviço de seguraça privada" price="R$ 19,00" date="Vencimento dia 02/03/21" status="Atrasada" link='' />
        <CardPriceCustom title='Plano Mensal' subTitle="serviço de seguraça privada" price="R$ 19,00" date="Vencimento dia 02/02/21" status="Pago" link='' />
      </View>
      {showModal && <ModalAlertCustom onPress={() => setShowModal(!showModal)} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
    width: '100%'
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
