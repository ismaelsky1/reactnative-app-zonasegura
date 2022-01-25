import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaskInputCustom from "../components/MaskInputCustom";
import TextInputCustom from "../components/TextInputCustom";

import { Text, View } from "../components/Themed";
import { Formik } from "formik";
import * as yup from "yup";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ButtonCustom from "../components/ButtonCustom";


export default function SignUpScreen({ route, navigation }: any) {

  const { navigate } = useNavigation();

  const colorScheme = useColorScheme();

  const schemaDataUsers = yup.object().shape({
    street: yup.string().required("Obrigatório"),
    number: yup.string().required("Obrigatório"),
    complement: yup.string().required("Obrigatório"),
    postCode: yup
      .string()
      .required("Obrigatório")
      .test("len", "documento inválido.", (val) => {
        const lengthWithoutDashes = val?.replace(/[^0-9]/g, "").length;
        return lengthWithoutDashes === 8 ? true : false;
      }),
    city: yup.object().required("Obrigatório"),
    state: yup.string().required("Obrigatório"),
    district: yup.object().required("Obrigatório"),
  });

  const handleNextStep = useCallback(
    (data: any) => {
      navigate("SignUpStep3", data);
    }, []);

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].primary },
      ]}
    >
      <View
        style={[styles.box, { backgroundColor: Colors[colorScheme].secund }]}
      >
        <Text style={[styles.title, { color: Colors[colorScheme].black }]}>
          Endereço
        </Text>
        <Formik
          validationSchema={schemaDataUsers}

          initialValues={{
            name: route.params.name ? route.params.name : "",
            document: route.params.document ? route.params.document : "",
            dueDate: route.params.dueDate ? route.params.dueDate : "",
            phone: route.params.phone ? route.params.phone : "",
            password: route.params.password ? route.params.password : "",
            street: route.params.street ? route.params.street : "Hermatino",
            complement: route.params.complement ? route.params.complement : "Casa",
            number: route.params.number ? route.params.number : "630",
            postCode: route.params.postCode ? route.params.postCode : "47802-382",
            city: route.params.city ? route.params.city : "",
            district: route.params.district ? route.params.district : "",
            state: route.params.state ? route.params.state : "BA",
          }}
          enableReinitialize
          onSubmit={handleNextStep}
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
                title="Rua:"
                placeholder="..."
                onChangeText={handleChange("street")}
                onBlur={handleBlur("street")}
                value={values.street}
              />
              {errors.street && touched.street && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.street}
                </Text>
              )}

              <TextInputCustom
                title="Numero:"
                placeholder="..."
                onChangeText={handleChange("number")}
                onBlur={handleBlur("number")}
                value={values.number}
              />
              {errors.number && touched.number && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.number}
                </Text>
              )}

              <TextInputCustom
                title="Complemento:"
                placeholder="..."
                onChangeText={handleChange("complement")}
                onBlur={handleBlur("complement")}
                value={values.complement}
              />
              {errors.complement && touched.complement && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.complement}
                </Text>
              )}

              <MaskInputCustom
                type={'zip-code'}
                title="CEP:"
                keyboardType="decimal-pad"
                placeholder="00000-000"
                onChangeText={handleChange("postCode")}
                onBlur={handleBlur("postCode")}
                value={values.postCode}
              />
              {errors.postCode && touched.postCode && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.postCode}
                </Text>
              )}







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
                  navigate("SelectViewSignUpStep", { title: "Cidade:", ...values });
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
                  {values?.city?.name}
                </Text>
                {!values.city && (
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
                  navigate("SelectViewSignUpStep", { title: "Bairro:", ...values });
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
                  {values?.district?.name}
                </Text>
                {!values.district && (
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
                  navigate("SelectViewSignUpStep", { title: "Estado:", ...values });
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
                  {values.state}
                </Text>
                {!values.state && (
                  <Text style={{ fontSize: 10, color: "red" }}>
                    Obrigatório
                  </Text>
                )}
              </TouchableOpacity>
              <Text></Text>



              <ButtonCustom
                isLoading={false}
                background={Colors[colorScheme].primary}
                onPress={handleSubmit}
                title="Próximo"
              />
            </>
          )}
        </Formik>
      </View>
      {/* {showModal && <ModalAlertCustom onPress={() => setShowModal(!showModal)} mensage={mensage?.mensage} icon={mensage?.icon} btnOk={'OK'} title={mensage?.title} />} */}
    </ScrollView>
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
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // marginTop: 40,
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
