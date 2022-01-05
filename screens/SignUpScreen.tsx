import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet, TextInput, Button, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";

import MaskInputCustom from "../components/MaskInputCustom";
import TextInputCustom from "../components/TextInputCustom";
import PasswordInputCustom from "../components/PasswordInputCustom";

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

import logoImg from "../assets/images/logo.png";
import { useAuth } from "../hooks/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen() {
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState("");
  const { navigate, goBack } = useNavigation();

  const { signIn, signUp, user } = useAuth();

  const colorScheme = useColorScheme();

  const schemaDataUsers = yup.object().shape({
    name: yup.string().required("Obrigatório"),
    password: yup
      .string()
      .required("Mínimo 6 caractéres")
      .min(6, "Mínimo 6 caractéres"),
    phone: yup
      .string()
      .required("Obrigatório")
      .test("len", "Informe um número válido.", (val) => {
        const lengthWithoutDashes = val?.replace(/-|_/g, "").length;
        return lengthWithoutDashes === 13 || lengthWithoutDashes === 14
          ? true
          : false;
      }),
    document: yup
      .string()
      .required("Obrigatório")
      .test("len", "Informe um número válido.", (val) => {
        const lengthWithoutDashes = val?.replace(/-|_/g, "").length;
        return lengthWithoutDashes === 13 ? true : false;
      }),
  });

  const handleSignUp = useCallback(
    async (data: any) => {
      setMsgError("");
      setLoading(true);

      try {
        const response: any = await signUp(data);
        console.log(response)
        navigate("CheckSms", {navigateStep: '', ...response});
      } catch (error: any) {
        setLoading(false);

        if (error.request.status == 400) {
          // const response = JSON.parse(error.request.response);

          // if (response.code == 11000) {
            setMsgError("Telefone ou CPF já utilizado!");
          // }
        }else{
          setMsgError("Error, Tente novamente mais tarde");
        }

      }
    },
    [signIn]
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].primary },
      ]}
    >
      <View
        style={[styles.box, { backgroundColor: Colors[colorScheme].secund }]}
      >
        <Text style={[styles.title, { color: Colors[colorScheme].black }]}>
          Criar sua Conta
        </Text>
        <Formik
          validationSchema={schemaDataUsers}
          initialValues={{
            name: "teste ",
            phone: "7798114320",
            document: "0587551852",
            password: "123123",
          }}
          onSubmit={handleSignUp}
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
                title="Nome Completo:"
                placeholder="..."
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {errors.name && touched.name && (
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
              {errors.phone && touched.phone && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.phone}
                </Text>
              )}
              <MaskInputCustom
                title="CPF:"
                placeholder="000.000.000-00"
                onChangeText={handleChange("document")}
                onBlur={handleBlur("document")}
                keyboardType="decimal-pad"
                value={values.document}
                type={"cpf"}
              />
              {errors.document && touched.document && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.document}
                </Text>
              )}
              <PasswordInputCustom
                title="Senha:"
                placeholder="..."
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              )}
              <Text style={{ color: Colors[colorScheme].warning }}>
                {msgError}
              </Text>

              <ButtonCustom
                isLoading={loading}
                background={Colors[colorScheme].primary}
                onPress={handleSubmit}
                title="Cadastrar"
              />
            </>
          )}
        </Formik>
      </View>
      <View
        style={[
          styles.boxFooter,
          { backgroundColor: Colors[colorScheme].secund },
        ]}
      >
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View
          style={[
            styles.boxFooterRow,
            { backgroundColor: Colors[colorScheme].secund },
          ]}
        >
          <Text
            onPress={() => {
              goBack();
            }}
            style={[styles.textFooter, { color: Colors[colorScheme].primary }]}
          >
            {" "}
            Já tenho conta? Acesse sua conta{" "}
          </Text>
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
    fontWeight: "700",
    marginVertical: 10,
  },

  textInput: {},
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  boxLogo: {
    flex: 0.5,
    justifyContent: "center",
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
    width: "100%",
  },
  boxFooterRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textFooter: {
    margin: 10,
    fontSize: 14,
  },
  separator: {
    height: 1,
    width: "100%",
  },
});
