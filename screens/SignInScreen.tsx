import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, Button, ScrollView, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';


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

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState(false);


  const { navigate } = useNavigation();

  const { signIn } = useAuth();

  const colorScheme = useColorScheme();


  const schemaDataUsers = yup.object().shape({

    password: yup.string()
      .required('Mínimo 6 caracteres.')
      .min(6, 'Mínimo 6 caracteres.'),
      document: yup.string()
      .required('Obrigatório')
      .test("len", "Informe um número válido.", (val) => {
        // console.log(val)
        const lengthWithoutDashes = val?.replace(/-|_/g, "").length;
        return (lengthWithoutDashes === 13) ? true : false;
      }),
  });

  const handleSignIn = useCallback(
    async (data: any) => {
      setMsgError(false);
      setLoading(true);
      try {
        await signIn({
          document: data.document.replace(/[^0-9]/g,''),
          password: data.password,
        });
        setMsgError(false);
        setLoading(false);

      } catch (error) {
        setMsgError(true);
        setLoading(false);

      }
    },
    [signIn],
  );


  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].primary }]}>
      <View style={[styles.boxLogo, { backgroundColor: Colors[colorScheme].primary }]}>
        <Image style={styles.logo} source={logoImg} />
      </View>
      <View style={[styles.box, { backgroundColor: Colors[colorScheme].secund }]}>
        <Text style={[styles.title, { color: Colors[colorScheme].black }]}>Entrar</Text>
        <Formik
          validationSchema={schemaDataUsers}
          initialValues={{
            document: '058.755.185-21',
            password: '123123',
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
              {/* <MaskInputCustom
                title='Telefone:'
                placeholder="..."
                onChangeText={handleChange('cellphone')}
                onBlur={handleBlur('cellphone')}
                keyboardType='phone-pad'
                value={values.cellphone}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
              />
              {(errors.cellphone && touched.cellphone) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.cellphone}</Text>
              } */}
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
              <PasswordInputCustom
                title='Senha:'
                placeholder="...."
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {(errors.password && touched.password) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
              }
              <Text style={{ color: Colors[colorScheme].warning }}>
                {msgError && ('Senha ou Número inválidos. Por favor, tente novamente. Caso tenha esquecido sua senha clique no link: Esqueçeu sua senha?')
                }
              </Text>


              <ButtonCustom isLoading={loading} background={Colors[colorScheme].primary} onPress={handleSubmit} title="Salvar" />
            </>
          )}
        </Formik>

      </View>
      <View style={[styles.boxFooter, { backgroundColor: Colors[colorScheme].secund }]}>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={[styles.boxFooterRow, { backgroundColor: Colors[colorScheme].secund }]}>
          <Text onPress={() => { navigate('Forgout') }} style={[styles.textFooter, { color: Colors[colorScheme].primary }]}>Esqueçeu sua senha?</Text>
          <Text onPress={() => { navigate('SignUp') }} style={[styles.textFooter, { color: Colors[colorScheme].primary }]}>Criar conta</Text>
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

  textInput: {},
  logo: {
    width: 150,
    height: 150,
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
