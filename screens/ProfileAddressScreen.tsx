import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderCustom from "../components/HeaderCustom";
import ListViewCustom from "../components/ListViewCustom";
import TextInputCustom from "../components/TextInputCustom";
import { Text, View } from "../components/Themed";
import { Formik } from "formik";
import * as yup from "yup";

import Colors from "../constants/Colors";
import { ModalContext, ModalContextProvider } from "../contexts/modal";
import useColorScheme from "../hooks/useColorScheme";
import { ModalAlert } from "../types";
import ButtonCustom from "../components/ButtonCustom";
import ModalAlertCustom from "../components/ModalAlertCustom";
import ModalAgendaCustom from "../components/ModalAgendaCustom";
import { useAuth } from "../hooks/auth";
import api from "../services/api";
import MaskInputCustom from "../components/MaskInputCustom";
import SelectInputCustom from "../components/SelectInputCustom";

export default function ProfileAddressScreen(props: any) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);
  const { navigate, goBack } = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [loading, setLoading] = useState(false);

  const [mensageSuccess, setMensageSuccess] = useState<String>();
  const [mensageWarning, setMensageWarning] = useState<String>();

  const [selectedLanguageState, setSelectedLanguageState] = useState<any>();


  const colorScheme = useColorScheme();

  const { setUser, user } = useAuth();

  useEffect(()=>{
    setSelectedLanguageState(user.state);
  },[])

  const schemaDataUsers = yup.object().shape({
    address: yup.string().required("Obrigatório"),
    number: yup.number().required("Obrigatório"),
    district: yup.string().required("Obrigatório"),
    complement: yup.string().required("Obrigatório"),
    city: yup.string().required("Obrigatório"),
    state: yup.string().required("Obrigatório"),
    zipcode: yup
      .string()
      .required("Obrigatório")
      .test("len", "documento inválido.", (val) => {
        const lengthWithoutDashes = val?.replace(/[^0-9]/g, "").length;
        return lengthWithoutDashes === 8 ? true : false;
      }),
  });

  const handleUpdateProfile = useCallback(async (dataForm: any) => {
    let number = Number(dataForm.number);
    let zipcode = dataForm.zipcode.replace(/[^0-9]/g, "");
    dataForm.number = number;
    dataForm.zipcode = zipcode;
    setLoading(true);
    setMensageSuccess("");
    setMensageWarning("");
    console.log(dataForm);
    try {
      const { data } = await api.patch(`users/${user._id}`, dataForm);
      setUser(data);
      console.log("->", data);

      setMensageSuccess("Salvo");

      setLoading(false);
    } catch (err: any) {
      // const error = JSON.parse(err.request._response);

      setMensageWarning("Error, Tente novamente.");
      setLoading(false);
    }
  }, []);

  return (
    <>
      <HeaderCustom back={"true"} title="Endereço" />

      <ScrollView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].secund },
        ]}
      >
        <Formik
          validationSchema={schemaDataUsers}
          initialValues={{
            address: user.address? user.address: '',
            complement: user.complement? user.complement: '',
            number: Number(user.number? user.number: 0),
            district: user.district? user.district: '',
            city: user.city? user.city : '',
            state: user.state? user.state : '',
            zipcode: user.zipcode?  user.zipcode: '',
          }}
          onSubmit={handleUpdateProfile}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  width: "100%",
                  color: Colors[colorScheme].black2,
                  marginTop: 10,
                }}
              >
                Localização:
              </Text>
              <ButtonCustom
                background={Colors[colorScheme].primary}
                onPress={() => {
                  navigate("SetLocationMapAddress");
                }}
                title="Editar"
              />
              <Text></Text>

              <MaskInputCustom
                title="CEP:"
                placeholder="00000-000"
                onChangeText={handleChange("zipcode")}
                onBlur={handleBlur("zipcode")}
                keyboardType="phone-pad"
                value={values.zipcode}
                type={"zip-code"}
              />
              {errors.zipcode && (
                <Text style={{ fontSize: 10, color: "red" }}>Obrigatório</Text>
              )}

              <TextInputCustom
                title="Rua:"
                placeholder="..."
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
              />
              {errors.address && (
                <Text style={{ fontSize: 10, color: "red" }}>Obrigatório</Text>
              )}
              <TextInputCustom
                title="Complemento:"
                placeholder="..."
                onChangeText={handleChange("complement")}
                onBlur={handleBlur("complement")}
                value={values.complement}
              />
              {/* {errors.complement && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.complement}
                </Text>
              )} */}
              <TextInputCustom
                title="Nº:"
                placeholder="..."
                onChangeText={handleChange("number")}
                onBlur={handleBlur("number")}
                value={values.number}
                keyboardType="numeric"
              />
              {errors.number && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  Obrigatório, Somente numeros
                </Text>
              )}
              <TextInputCustom
                title="Bairro:"
                placeholder="..."
                onChangeText={handleChange("district")}
                onBlur={handleBlur("district")}
                value={values.district}
              />
              {errors.district && (
                <Text style={{ fontSize: 10, color: "red" }}>Obrigatório</Text>
              )}
              <TextInputCustom
                title="Cidade:"
                placeholder="..."
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                value={values.city}
              />
              {errors.city && (
                <Text style={{ fontSize: 10, color: "red" }}>Obrigatório</Text>
              )}
              <SelectInputCustom
                title="Estado:"
                value={[
                  "AC",
                  "AL",
                  "AP",
                  "AM",
                  "BA",
                  "CE",
                  "DF",
                  "ES",
                  "GO",
                  "MA",
                  "MS",
                  "MT",
                  "MG",
                  "PA",
                  "PB",
                  "PR",
                  "PE",
                  "PI",
                  "RJ",
                  "RN",
                  "RS",
                  "RO",
                  "RR",
                  "SC",
                  "SP",
                  "SE",
                  "TO",
                ]}
                onChangeText={handleChange("state")}
                selectedLanguage={selectedLanguageState}
                setSelectedLanguage={setSelectedLanguageState}
                onBlur={handleBlur("state")}
              />
              {/* <TextInputCustom
                title="Estato:"
                placeholder="..."
                onChangeText={handleChange("state")}
                onBlur={handleBlur("state")}
                value={values.state}
              /> */}
              {errors.state && (
                <Text style={{ fontSize: 10, color: "red" }}>Obrigatório</Text>
              )}

              <ButtonCustom
                isLoading={loading}
                background={Colors[colorScheme].sucess}
                onPress={handleSubmit}
                title="Salvar"
              />
              {mensageSuccess !== "" && (
                <Text style={{ color: Colors[colorScheme].primary }}>
                  {mensageSuccess}
                </Text>
              )}
              {mensageWarning !== "" && (
                <Text style={{ color: Colors[colorScheme].warning }}>
                  {mensageWarning}
                </Text>
              )}
              <Text></Text>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  scroll: {
    width: "100%",
    paddingTop: 10,
  },
  textInput: {},
});
