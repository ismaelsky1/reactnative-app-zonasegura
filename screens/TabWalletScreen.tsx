import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import CardPriceCustom from '../components/CardPriceCustom';
import ListViewCustom from '../components/ListViewCustom';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function TabWalletScreen() {
  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>
      <Text style={styles.title}>Carteira</Text>
      <Text style={styles.subTitle}>Você tem 1 conta em aberto</Text>

      <CardPriceCustom title='Plano Mensal' subTitle="serviço de seguraça privada" price="R$ 19,00" date="Vencimento dia 02/04/21" status="Em aberto" link="InvoiceDetail" />
      <ListViewCustom data={[
        {
          title: 'Historico',
          subTitle: 'Ver contas anteriores.',
          next: true,
          icons: 'time-outline',
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
