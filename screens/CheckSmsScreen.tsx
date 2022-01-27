import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet, TextInput, Button, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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

import logoImg from "../assets/images/logo-name.png";
import { useAuth } from "../hooks/auth";
import api from "../services/api";

export default function CheckSmsScreen({ route, navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState(false);

  const [count, setCount] = useState<number>(60);
  const [resendPhone, setResendPhone] = useState<string>();
  const [sms, setSms] = useState<string>();
  
  const { navigate } = useNavigation();
  const { signIn, checkValidationCode, user } = useAuth();

  const colorScheme = useColorScheme();

  const schemaDataUsers = yup.object().shape({
    key: yup
      .string()
      .required("Obrigatório")
      .test("len", "Informe um número válido.", (val) => {
        const lengthWithoutDashes = val?.replace(/-|_/g, "").length;
        return lengthWithoutDashes === 6 ? true : false;
      }),
  });

  useEffect(() => {
    setCount(60);

    //status pendente do usuário
    if (route.params.status == 403) {
      handleResendCode();
    }
      setSms(route.params.mensagem)
    

  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (count < 1) {
        setCount(0);
        return () => clearTimeout(timeout);
      }
      setCount(count - 1);
    }, 1000);
  }, [count, resendPhone]);

  const handleCheckValidationCode = useCallback(
    async (dataForm: any) => {
      setMsgError(false);
      setLoading(true);
      try {
     
        if (route.params.navigateStep == "RedefinePassword") {
          const { data } = await api.post(
            `auth/checkValidationCode/${route.params.user._id}`,
            {
              code: dataForm.key,
            }
          );
          navigate("RedefinePassword", { code: dataForm.key, ...data });
        } else {

          await checkValidationCode({
            _id: route.params.user._id,
            code: dataForm.key,
          });

          
        }
      } catch (error: any) {
        console.log(error.request);
        setMsgError(true);
        setLoading(false);
      }
    },
    [checkValidationCode]
  );

  const handleResendCode = useCallback(async () => {
    setMsgError(false);
    setLoading(true);
    try {
      const response = await api.get(
        `auth/forgotPassword/${route.params.user.document}`
      );
      console.log(response.data);
        setSms(response.data.mensagem)
      setMsgError(false);
      setLoading(false);
    } catch (error: any) {
      console.log(error.request);
      setMsgError(true);
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
        <Ionicons
          style={styles.logo}
          name="key-outline"
          size={100}
          color={Colors[colorScheme].secund}
        />
      </View>
      <View
        style={[styles.box, { backgroundColor: Colors[colorScheme].secund }]}
      >
        <Text style={[styles.title, { color: Colors[colorScheme].black }]}>
          Informe código recebido
        </Text>
        <Text style={[styles.subTitle, { color: Colors[colorScheme].black2 }]}>
          {/* Enviamos um código para seu número, informe no campo logo a baixo. */}
          {sms}
        </Text>
        <Formik
          validationSchema={schemaDataUsers}
          initialValues={{
            key: "",
          }}
          onSubmit={handleCheckValidationCode}
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
                title="Código:"
                placeholder="..."
                onChangeText={handleChange("key")}
                onBlur={handleBlur("key")}
                keyboardType="phone-pad"
                value={values.key}
              />
              {errors.key && touched.key && (
                <Text style={{ fontSize: 10, color: "red" }}>{errors.key}</Text>
              )}
              {msgError && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  Código inválido
                </Text>
              )}
              <ButtonCustom
                isLoading={loading}
                background={Colors[colorScheme].primary}
                onPress={handleSubmit}
                title="Verificar"
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
          <Text style={[styles.textFooter]}>
            {count !== 0 ? (
              `00:${count < 10 ? `0${count}` : count}`
            ) : (
              <Text
                onPress={() => {
                  setCount(30);
                  setMsgError(false);
                }}
              >
                00:00
              </Text>
            )}
          </Text>
          {count == 0 && (
            <Text
              onPress={() => {
                handleResendCode();
                // navigate("SignIn");
              }}
              style={[
                styles.textFooter,
                { color: Colors[colorScheme].primary },
              ]}
            >
              Reenviar código
            </Text>
          )}
          {count > 0 && (
            <Text
              style={[styles.textFooter, { color: Colors[colorScheme].gray }]}
            >
              Reenviar código
            </Text>
          )}
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
