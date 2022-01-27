import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import CardPriceCustom from '../components/CardPriceCustom';
import ListViewCustom from '../components/ListViewCustom';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { useAuth } from '../hooks/auth';
import moment from 'moment';

export default function TabWalletScreen() {
  const colorScheme = useColorScheme();

  const { navigate, goBack } = useNavigation();
  const isFocused = useIsFocused();

  const { user } = useAuth();

  const [listCharges, setListCharges] = useState([]);
  const [chargesRow, setChargesRow] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getListCharges()
    }
  }, [isFocused])

  const getListCharges = React.useCallback(async () => {
    try {
      const { data } = await api.get(`charges`, { params: { 'billing._id': user._id, 'charges.status': 'ACTIVE' } });


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
        if (item.charges[0].status == 'CANCELLED') {
          status = 'Cancelado';
        }

        return {
          title: 'Plano Mensal',
          subTitle: "serviço de seguraça privada",
          price: `R$ ${item.charges[0].amount.toFixed(2)}`,
          date: `Vencimento dia ${moment(item.charges[0].dueDate).format('DD/MM/yyyy')}`,
          status: status,
          link:{ url:`InvoiceDetail`, params: item},
        };
      });
      console.log(data)
      setChargesRow(resp.length)
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
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>
      <Text style={styles.title}>Assinatura</Text>
      <Text style={styles.subTitle}>Você tem {chargesRow} conta em aberto</Text>
      {listCharges.map((item: any) => (
        <CardPriceCustom key={item.date} title={item.title} subTitle={item.subTitle} price={item.price} date={item.date} status={item.status} link={item.link} />
      )
      )}
      <ListViewCustom data={[
        {
          name: 'Historico',
          descript: 'Ver contas anteriores.',
          next: true,
          icon: 'time-outline',
          onPress: () => { navigate('HistoryInvoice') }
        }
      ]} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    width: '100%',
    margin: 10
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    margin: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
