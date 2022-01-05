import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import PasswordInputCustom from "../components/PasswordInputCustom";

import { Text, View } from "../components/Themed";
import { Formik } from "formik";
import * as yup from "yup";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ButtonCustom from "../components/ButtonCustom";

import logoImg from "../assets/images/logo-name.png";
import { useAuth } from "../hooks/auth";
import api from "../services/api";

export default function RedefinePasswordScreen({ route, navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState('');

  const { navigate } = useNavigation();

  const { signIn, setToken } = useAuth();

  const colorScheme = useColorScheme();

  const schemaDataUsers = yup.object().shape({
    newPassword: yup
      .string()
      .required("Mínimo 6 caracteres.")
      .min(6, "Mínimo 6 caracteres."),
    confirmPassword: yup
      .string()
      .required("Mínimo 6 caracteres.")
      .min(6, "Mínimo 6 caracteres."),
    // .test("len", "Informe um número válido.", (val) => {
    //   const lengthWithoutDashes = val?.replace(/-|_/g, "").length;
    //   return lengthWithoutDashes === 13 ? true : false;
    // }),
  });

  const handleRedefinePassword = useCallback(async (dataform) => {
    setMsgError('');
    setLoading(true);
    try {
      const response = await api.post(
        `auth/redefinePassword/${route.params.user._id}`,
        {
          code: route.params.code,
          newPassword: dataform.newPassword,
          confirmPassword: dataform.confirmPassword,
        }
      );
      setToken(response.data)
    } catch (error: any) {
      console.log(error.request);
      if(error.request.status == 400){
        setMsgError('Confirmação de senhar inválida, as senha deve ser iguais.');
      }else if(error.request.status == 401){
        setMsgError(`Código expirado, reinicie a validação`);
      }else{
        setMsgError(`Error, tente novamente mais tarde`);
      }

      setLoading(false);
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].primary },
      ]}
    >
      <View
        style={[
          styles.boxLogo,
          { backgroundColor: Colors[colorScheme].primary },
        ]}
      >
        <MaterialCommunityIcons
          style={styles.logo}
          name="account-key"
          size={100}
          color={Colors[colorScheme].secund}
        />
      </View>
      <View
        style={[styles.box, { backgroundColor: Colors[colorScheme].secund }]}
      >
        <Text style={[styles.title, { color: Colors[colorScheme].black }]}>
          Redefina sua senha
        </Text>
        <Text style={[styles.subTitle, { color: Colors[colorScheme].black2 }]}>
          Informa sua nova senha e confirme.
        </Text>
        <Formik
          validationSchema={schemaDataUsers}
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={handleRedefinePassword}
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
              <PasswordInputCustom
                title="Senha:"
                placeholder="...."
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
              />
              {errors.newPassword && touched.newPassword && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.newPassword}
                </Text>
              )}
              <PasswordInputCustom
                title="Confirmar senha:"
                placeholder="...."
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.confirmPassword}
                </Text>
              )}
              
                <Text style={{ fontSize: 10, color: "red" }}>
                  {msgError}
                </Text>
              <ButtonCustom
                isLoading={loading}
                background={Colors[colorScheme].primary}
                onPress={handleSubmit}
                title="Salvar"
              />
            </>
          )}
        </Formik>
      </View>
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
  subTitle: {
    fontSize: 12,
    fontWeight: "300",
    marginVertical: 5,
  },
  logo: {
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
});
