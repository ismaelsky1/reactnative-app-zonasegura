import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ListViewCustom from '../components/ListViewCustom';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ModalAlert } from '../types';

import ModalAlertCustom from '../components/ModalAlertCustom';
import ModalAgendaCustom from '../components/ModalAgendaCustom';
import { useAuth } from '../hooks/auth';

export default function TabProfileScreen({ navigation, route }: any) {
  const [showModal, setShowModal] = useState(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [nick, setNick] = useState("");

  const { signOut, user } = useAuth();


  // const [formDataTimeData, setFormDataTimeData] = useState(null);
  // const [formLocationData, setFormLocationData] = useState<any>(null);


  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();

  function link(params: string) {
    navigate(params);
  }

  function linkContact() {
    console.log('link')
    Linking.openURL('https://api.whatsapp.com/send?phone=5577981143208&text=Ol%C3%A1%2C%20Preciso%20de%20suporte');
  }

  useEffect(() => {
    // if(props.route.params){
    //   console.log(props.route.params)
    //   // setFormLocationData(props.route.params.coords)
    // }
    console.log('profile')
    const use = user.name.split(" ");
    setNick(use[0]);

    // console.log(props.route.params)
  }, [navigation])


  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>
      <Text style={[styles.title, { color: Colors[colorScheme].black }]}>Perfil</Text>
      <Text style={[styles.subtitle, { color: Colors[colorScheme].black }]}>{nick}</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <ListViewCustom data={[{
        name: 'Meus Dados',
        descript: 'Nome, telefone...',
        icon: 'person',
        next: false,
        onPress: () => { link('Profile') },
      },{
        name: 'Endereço',
        descript: 'Rua,Bairro,Cidade...',
        icon: 'person',
        next: false,
        onPress: () => { link('ProfileAddress') },
      }, {
        name: 'Contato',
        descript: 'Fale conosco',
        icon: 'call',
        next: false,
        onPress: () => { linkContact() },
      }, {
        name: 'Sair',
        descript: 'Sair do usuário',
        icon: 'log-out',
        next: false,
        onPress: () => { signOut() },
      }
      ]} />

      {showModal && <ModalAlertCustom onPress={() => setShowModal(!showModal)} onPressCancel={() => { setShowModal(!showModal) }} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title} btnCancel='Cancelar' />}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  title: {
    fontSize: 16,
    fontWeight: '300',
    width: '100%',
    marginTop: 10,
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 34,
    fontWeight: 'bold',
    width: '100%',
    marginTop: 0,
    textAlign: 'left'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
