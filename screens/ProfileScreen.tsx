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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreenScreen(props: any) {
  const [loading, setLoading] = useState(false);

  const [mensageSuccess, setMensageSuccess] = useState<String>();
  const [mensageWarning, setMensageWarning] = useState<String>();

  const colorScheme = useColorScheme();

  const { setUser, user } = useAuth();

  const schemaDataUsers = yup.object().shape({
    name: yup.string().required("Obrigatório"),
    phone: yup
      .string()
      .required("Obrigatório")
      .test("len", "Informe um número válido.", (val) => {
        const lengthWithoutDashes = val?.replace(/[^0-9]/g, "").length;
        return lengthWithoutDashes === 10 || lengthWithoutDashes === 11
          ? true
          : false;
      }),
    document: yup
      .string()
      .required("Obrigatório")
      .test("len", "documento inválido.", (val) => {
        const lengthWithoutDashes = val?.replace(/[^0-9]/g, "").length;
        return lengthWithoutDashes === 11 ? true : false;
      }),
  });

  const handleUpdateProfile = useCallback(async (dataForm: any) => {
    setLoading(true);
    setMensageSuccess("");
    setMensageWarning("");

    const form = {
      name: dataForm.name,
      document: dataForm.document.replace(/[^0-9]/g, ""),
      phone: dataForm.phone.replace(/[^0-9]/g, ""),
    };

    try {
      const { data } = await api.patch(`users/${user._id}`, form);
      setUser(data);
      console.log('salvo',data)
      setMensageSuccess("Salvo");

      setLoading(false);
    } catch (err: any) {
      const error = JSON.parse(err.request._response);
      console.log(error);
      // setShowAlert(true);
      setMensageWarning("Error, Tente novamente.");
      setLoading(false);
    }
  }, []);

  return (
    <>
      <HeaderCustom back={"true"} title="Usuário" />

      <ScrollView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].secund },
        ]}
      >
        {user && (
          <Formik
            validationSchema={schemaDataUsers}
            initialValues={{
              name: user.name,
              phone: user.phone,
              document: user.document,
            }}
            onSubmit={handleUpdateProfile}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
            }) => (
              <>
                <TextInputCustom
                  title="Nome:"
                  placeholder="..."
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.name}
                  </Text>
                )}
                <MaskInputCustom
                  title="Telefone:"
                  placeholder="..."
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  keyboardType="phone-pad"
                  value={values.phone}
                  type={"cel-phone"}
                  options={{
                    maskType: "BRL",
                    withDDD: true,
                    dddMask: "(99) ",
                  }}
                />
                {errors.phone && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.phone}
                  </Text>
                )}
                <MaskInputCustom
                  title="CPF:"
                  placeholder="000.000.000-00"
                  onChangeText={handleChange("document")}
                  onBlur={handleBlur("document")}
                  keyboardType="phone-pad"
                  value={values.document}
                  type={"cpf"}
                />
                {errors.document && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    {errors.document}
                  </Text>
                )}

                <ButtonCustom
                  isLoading={loading}
                  background={Colors[colorScheme].sucess}
                  onPress={handleSubmit}
                  title="Salvar"
                />
              </>
            )}
          </Formik>
        )}
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
        {/* {showModal && <ModalAlertCustom onPress={() => setShowModal(!showModal)} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title} />} */}
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
