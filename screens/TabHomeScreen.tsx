import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ListViewCustom from '../components/ListViewCustom';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function TabHomeScreen() {
  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();

  function link(params: string, props: any) {
    navigate(params, props);
  }


  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].primary }]}>
      <Text style={[styles.title, { color: Colors[colorScheme].white }]}>Bem-vindo</Text>
      <Text style={[styles.subtitle, { color: Colors[colorScheme].white }]}>João Victor</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <ListViewCustom data={[{
        title: 'Ajuda Rapida',
        subTitle: 'Chamar ajuda.',
        icons: 'flash',
        next: true,
        onPress: () => { link('RequestService', { title: 'Ajuda Rapida' }) }
      }, {
        title: 'Agendar',
        subTitle: 'Agendar escouta.',
        icons: 'calendar',
        next: true,
        onPress: () => { link('RequestService', { title: 'Agendar' }) }

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
