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
import moment from 'moment';
import api from '../services/api';
import { useAuth } from '../hooks/auth';

export default function HitoryInvoiceScreen({ route }: any) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);
  // const { navigate, goBack } = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [showModalAgenda, setShowModalAgenda] = useState(false);
  const [mensage, setMensage] = useState<ModalAlert>({});

  const { user } = useAuth();


  const [listCharges, setListCharges] = useState([]);
  const [chargesRow, setChargesRow] = useState(0);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();

  useEffect(() => {
    let idUser = '';
    if (route.params?.idClient) {
      idUser = route.params.idClient;
      console.log('route.params')

    } else {
      idUser = user._id;
      console.log('user._id')

    }

    getListCharges(idUser)

  }, [route])

  const getListCharges = React.useCallback(async (idUser) => {
    try {
      const { data } = await api.get(`charges`, { params: { 'billing._id': idUser } });

      const resp = data.map((item: any) => {
        let status = '';

        if (item.charges[0].status == 'ACTIVE') {
          status = 'Aberto';
        }
        if (item.charges[0].status == 'PAID') {
          status = 'Pago';
        }
        if (item.charges[0].status == 'MANUAL_RECONCILIATION') {
          status = 'Pago';
        }
        if (item.charges[0].status == 'CANCELED') {
          status = 'Cancelado';
        }

        return {
          title: 'Plano Mensal',
          subTitle: "serviço de seguraça privada",
          price: `R$ ${item.charges[0].amount.toFixed(2)}`,
          date: `Vencimento dia ${moment(item.charges[0].dueDate).format('DD/MM/yyyy')}`,
          status: status,
          link: { url: `InvoiceDetail`, params: item },
        };
      });
      // console.log(data)
      setListCharges(resp);
      setLoading(false);
    } catch (err: any) {
      const error = JSON.parse(err.request._response);
      console.log("getDistricts", err.request);

      // setMensage("Error, Tente novamente.");
      // setLoading(false);
    }
  }, []);


  return (
    <>
      <HeaderCustom back={'true'} title={'Historico de Contas'} />

      <View style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>
        {listCharges.map((item: any) => (
          <CardPriceCustom key={item.date} title={item.title} subTitle={item.subTitle} price={item.price} date={item.date} status={item.status} link={item.link} />
        ))}

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
