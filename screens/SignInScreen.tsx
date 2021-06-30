import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, Button, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import HeaderCustom from '../components/HeaderCustom';
import ListViewCustom from '../components/ListViewCustom';
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

export default function SignInScreen(props: any) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);
  // const { navigate, goBack } = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [listService, setListService] = useState([]);

  const [nameForm, setNameForm] = useState<string>('');
  const colorScheme = useColorScheme();



  const schemaDataUsers = yup.object().shape({

    name: yup.string()
      .required('Obrigatório'),
    cellphone: yup.string()
      .required('Obrigatório')
      .test("len", "Informe um número válido.", (val) => {
        const lengthWithoutDashes = val?.replace(/-|_/g, "").length;
        return (lengthWithoutDashes === 13 || lengthWithoutDashes === 14) ? true : false;
      }),
    document: yup.string()
      .required('Obrigatório')
      .test("len", "documento inválido.", (val) => {
        const lengthWithoutDashes = val?.replace(/-|_./g, "").length;
        return (lengthWithoutDashes === 13) ? true : false;
      }),
    email: yup.string()
      .required('Obrigatório')
      .email(),
    address: yup.string()
      .required('Obrigatório'),
    number: yup.string()
      .required('Obrigatório'),
    neighborhood: yup.string()
      .required('Obrigatório'),
    complement: yup.string()
      .required('Obrigatório'),
    city: yup.string()
      .required('Obrigatório'),
    state: yup.string()
      .required('Obrigatório')
  });

  useEffect(() => {


  }, [props])
  function test(res: any) {
    console.log(res)
  }

  return (
    <>
      <HeaderCustom back={'true'} title='Usuário' />

      <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>

        <Formik
          validationSchema={schemaDataUsers}
          initialValues={{
            name: '',
            cellphone: '',
            document: '',
            address: '',
            complement: '',
            number: '',
            neighborhood: '',
            city: '',
            state: '',
            zipcode: ''
          }}
          onSubmit={values => console.log(values)}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            setSubmitting,
            isSubmitting
          }) => (
            <>
              <TextInputCustom
                title='Nome:'
                placeholder="..."
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {(errors.name && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
              }
              <TextInputCustom
                title='Celular:'
                placeholder="..."
                onChangeText={handleChange('cellphone')}
                onBlur={handleBlur('cellphone')}
                value={values.cellphone}
                keyboardType='phone-pad'
              />
              {(errors.cellphone && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.cellphone}</Text>
              }
              <TextInputCustom
                title='CPF:'
                placeholder="..."
                onChangeText={handleChange('document')}
                onBlur={handleBlur('document')}
                value={values.document}
                keyboardType='numeric'

              />
              {(errors.document && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.document}</Text>
              }
              <TextInputCustom
                title='Endereço:'
                placeholder="..."
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              {(errors.address && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
              }
              <TextInputCustom
                title='Complemento:'
                placeholder="..."
                onChangeText={handleChange('complement')}
                onBlur={handleBlur('complement')}
                value={values.complement}
              />
              {(errors.complement && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.complement}</Text>
              }

              <TextInputCustom
                title='Nº:'
                placeholder="..."
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                value={values.number}
                keyboardType='numeric'

              />
              {(errors.number && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.number}</Text>
              }
              <TextInputCustom
                title='Bairro:'
                placeholder="..."
                onChangeText={handleChange('neighborhood')}
                onBlur={handleBlur('neighborhood')}
                value={values.neighborhood}
              />
              {(errors.neighborhood && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.neighborhood}</Text>
              }
              <TextInputCustom
                title='Cidade:'
                placeholder="..."
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
              />
              {(errors.city && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.city}</Text>
              }
              <TextInputCustom
                title='state:'
                placeholder="..."
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                value={values.state}
              />
              {(errors.state && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.state}</Text>
              }
              <TextInputCustom
                title='CEP:'
                placeholder="..."
                onChangeText={handleChange('zipcode')}
                onBlur={handleBlur('zipcode')}
                value={values.zipcode}
              />
              {(errors.zipcode && isSubmitting) &&
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.zipcode}</Text>
              }
              <ButtonCustom background={Colors[colorScheme].primary} onPress={() => { setSubmitting(true) }} title="Salvar" />
            </>
          )}
        </Formik>

        {/* {showModal && <ModalAlertCustom onPress={() => setShowModal(!showModal)} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title} />} */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  scroll: {
    width: '100%',
    paddingTop: 10
  },
  textInput: {},


});
