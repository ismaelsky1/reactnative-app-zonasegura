import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderCustom from "../components/HeaderCustom";
import TextInputCustom from "../components/TextInputCustom";
import { Text, View } from "../components/Themed";
import { Formik } from "formik";
import * as yup from "yup";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ButtonCustom from "../components/ButtonCustom";
import { useAuth } from "../hooks/auth";
import api from "../services/api";
import MaskInputCustom from "../components/MaskInputCustom";
import SelectInputCustom from "../components/SelectInputCustom";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileAddressScreen(props: any) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);
  const { navigate, goBack } = useNavigation();
  const [loading, setLoading] = useState(false);

  const [mensageSuccess, setMensageSuccess] = useState<String>();
  const [mensageWarning, setMensageWarning] = useState<String>();

  const colorScheme = useColorScheme();

  const { setUser, user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, []);

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
    console.log("dataForm", dataForm);
    try {
      const { data } = await api.patch(`users/${user._id}`, dataForm);
      setUser(data);
      console.log("salvo->", data);

      setMensageSuccess("Salvo");

      setLoading(false);
    } catch (err: any) {
      // const error = JSON.parse(err.request._response);
      console.log("err", err.request);
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
            address: user.address ? user.address : "",
            complement: user.complement ? user.complement : "",
            number: Number(user.number ? user.number : 0),
            district: user.district?._id ? user.district?._id : "",
            city: user.city?._id ? user.city?._id : "",
            state: user.state ? user.state : "",
            zipcode: user.zipcode ? user.zipcode : "",
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
                title="Complemento:"
                placeholder="..."
                onChangeText={handleChange("complement")}
                onBlur={handleBlur("complement")}
                value={values.complement}
              />

              <Text
                style={{
                  color: Colors[colorScheme].black2,
                  fontSize: 16,
                  fontWeight: "700",
                  paddingVertical: 7,
                }}
              >
                Cidade:
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigate("SelectView", { title: "Cidade:" });
                }}
              >
                <Text
                  style={{
                    backgroundColor: Colors[colorScheme].white,
                    padding: 10,
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                >
                  {user?.city?.name}
                </Text>
                {errors.city && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    Obrigatório
                  </Text>
                )}
              </TouchableOpacity>

              <Text
                style={{
                  color: Colors[colorScheme].black2,
                  fontSize: 16,
                  fontWeight: "700",
                  paddingVertical: 7,
                }}
              >
                Bairro:
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigate("SelectView", { title: "Bairro:" });
                }}
              >
                <Text
                  style={{
                    backgroundColor: Colors[colorScheme].white,
                    padding: 10,
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                >
                  {user?.district?.name}
                </Text>
                {errors.district && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    Obrigatório
                  </Text>
                )}
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors[colorScheme].black2,
                  fontSize: 16,
                  fontWeight: "700",
                  paddingVertical: 7,
                }}
              >
                Estado:
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigate("SelectView", { title: "Estado:" });
                }}
              >
                <Text
                  style={{
                    backgroundColor: Colors[colorScheme].white,
                    padding: 10,
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                >
                  {user.state}
                </Text>
                {errors.state && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    Obrigatório
                  </Text>
                )}
              </TouchableOpacity>
              <Text></Text>

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
