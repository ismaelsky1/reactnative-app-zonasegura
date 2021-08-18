import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, Button, ScrollView, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import TextInputCustom from '../components/TextInputCustom';

import { Text, View } from '../components/Themed';
import { Formik } from 'formik';
import * as yup from 'yup';

import Colors from '../constants/Colors';
import { ModalContext, ModalContextProvider } from '../contexts/modal';
import useColorScheme from '../hooks/useColorScheme';
import { ModalAlert } from '../types';
import ButtonCustom from '../components/ButtonCustom';
import ModalAlertCustom from '../components/ModalAlertCustom';
import ModalAgendaCustom from '../components/ModalAgendaCustom';


import logoImg from '../assets/images/logo-name.png';
import { useAuth } from '../hooks/auth';

export default function CheckSmsScreen() {
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState(false);


  const { navigate } = useNavigation();

  const { signIn } = useAuth();

  const colorScheme = useColorScheme();


  const schemaDataUsers = yup.object().shape({
    key: yup.string()
      .required('Obrigatório')
      .test("len", "Informe um número válido.", (val) => {
        const lengthWithoutDashes = val?.replace(/-|_/g, "").length;
        return (lengthWithoutDashes === 6) ? true : false;
      }),
  });

  const handleSignIn = useCallback(
    ()=>{navigate('SetLocationMapAddressScreen')}
    // async (data: any) => {
    //   setMsgError(false);
    //   setLoading(true);

    //   try {
    //     await signIn({
    //       email: data.email,
    //       password: data.password,
    //     });
    //     setMsgError(false);
    //     setLoading(false);

    //   } catch (error) {
    //     setMsgError(true);
    //     setLoading(false);

    //   }
    // }
    , [signIn],
  );


  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].primary }]}>
      <View style={[styles.boxLogo, { backgroundColor: Colors[colorScheme].primary }]}>
        <Ionicons style={styles.logo} name="key-outline" size={100} color={Colors[colorScheme].secund} />
      </View>
      <View style={[styles.box, { backgroundColor: Colors[colorScheme].secund }]}>
        <Text style={[styles.title, { color: Colors[colorScheme].black }]}>Informe código recebido</Text>
        <Text style={[styles.subTitle, { color: Colors[colorScheme].black2 }]}>
          Enviamos um código para seu número, informe no campo
          logo a baixo.
        </Text>
        <Formik
          validationSchema={schemaDataUsers}
          initialValues={{
            key: ''
          }}
          onSubmit={handleSignIn}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <>
              <TextInputCustom
                title='Código:'
                placeholder="..."
                onChangeText={handleChange('key')}
                onBlur={handleBlur('key')}
                keyboardType='decimal-pad'
                value={values.key}
              />
              {(errors.key && touched.key) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.key}</Text>
              }

              <ButtonCustom isLoading={loading} background={Colors[colorScheme].primary} onPress={handleSubmit} title="Verificar" />
            </>
          )}
        </Formik>

      </View>
      <View style={[styles.boxFooter, { backgroundColor: Colors[colorScheme].secund }]}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={[styles.boxFooterRow, { backgroundColor: Colors[colorScheme].secund }]}>
          <Text onPress={() => { navigate('SignIn') }} style={[styles.textFooter, { color: Colors[colorScheme].primary }]}>00:59</Text>
          <Text onPress={() => { navigate('SignIn') }} style={[styles.textFooter, { color: Colors[colorScheme].primary }]}>Reenviar código</Text>
        </View>
      </View>
      {/* {showModal && <ModalAlertCustom onPress={() => setShowModal(!showModal)} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title} />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 10
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '300',
    marginVertical: 5
  },
  logo: {
    alignSelf: 'center'
  },
  boxLogo: {
    flex: 0.5,
    justifyContent: 'center'
  },
  box: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 10,
    paddingBottom: 10,
  },
  boxFooter: {
    height: 50,
    width: '100%',
  },
  boxFooterRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  textFooter: {
    margin: 10,
    fontSize: 14,
  },
  separator: {
    height: 1,
    width: '100%',
  },


});
