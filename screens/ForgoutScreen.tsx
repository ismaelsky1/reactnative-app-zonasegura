import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, Button, ScrollView, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import MaskInputCustom from '../components/MaskInputCustom';
import PasswordInputCustom from '../components/PasswordInputCustom';

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
import api from '../services/api';

export default function ForgoutScreen() {
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState(false);


  const { navigate } = useNavigation();

  const { signIn } = useAuth();

  const colorScheme = useColorScheme();


  const schemaDataUsers = yup.object().shape({
    document: yup.string()
      .required('Obrigatório')
      .test("len", "Informe um número válido.", (val) => {
        const lengthWithoutDashes = val?.replace(/-|_/g, "").length;
        return (lengthWithoutDashes === 13) ? true : false;
      }),
  });

  const handleForgout = useCallback(async (dataform) => {
    setMsgError(false);
    setLoading(true);
    try {
      const response = await api.get(`auth/forgotPassword/${dataform.document.replace(/[^0-9]/g, "")}`);
      console.log(response.data)

      navigate("CheckSms", {navigateStep: 'RedefinePassword', ...response.data});
    } catch (error: any) {
      console.log(error.request);
      setMsgError(true);
      setLoading(false);
    }
  }, []);


  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].primary }]}>
      <View style={[styles.boxLogo, { backgroundColor: Colors[colorScheme].primary }]}>
        <Ionicons style={styles.logo} name="lock-closed-outline" size={100} color={Colors[colorScheme].secund} />
      </View>
      <View style={[styles.box, { backgroundColor: Colors[colorScheme].secund }]}>
        <Text style={[styles.title, { color: Colors[colorScheme].black }]}>Esqueçeu sua senha?</Text>
        <Text style={[styles.subTitle, { color: Colors[colorScheme].black2 }]}>
          Enviaremos um código para seu número, onde você poderá
          redefinir sua senha.
        </Text>
        <Formik
          validationSchema={schemaDataUsers}
          initialValues={{
            document: ''
          }}
          onSubmit={handleForgout}
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
              <MaskInputCustom
                title='CPF:'
                placeholder="000.000.000-00"
                onChangeText={handleChange('document')}
                onBlur={handleBlur('document')}
                keyboardType='phone-pad'
                value={values.document}
                type={'cpf'}

              />
              {(errors.document && touched.document) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.document}</Text>
              }
              { msgError &&(<Text style={{ fontSize: 10, color: 'red' }}>CPF inválido</Text>)}
              <ButtonCustom isLoading={loading} background={Colors[colorScheme].primary} onPress={handleSubmit} title="Enviar" />
            </>
          )}
        </Formik>

      </View>
      <View style={[styles.boxFooter, { backgroundColor: Colors[colorScheme].secund }]}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={[styles.boxFooterRow, { backgroundColor: Colors[colorScheme].secund }]}>
          <Text onPress={() => { navigate('SignIn') }} style={[styles.textFooter, { color: Colors[colorScheme].primary }]}>Voltar</Text>
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
