import React, { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
// import { Permissions } from 'react-native-unimodules';

import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";

import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Switch,
  ScrollView,
  Linking,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import ModalAlertCustom from "../components/ModalAlertCustom";

import { ModalAlert } from "../types";
import api from "../services/api";
import { useAuth } from "../hooks/auth";
import ListViewCustom from "../components/ListViewCustom";

export default function DetailClientScreen({ route }: any) {
  const { user, setUser } = useAuth();

  const { navigate, goBack } = useNavigation();
  const colorScheme = useColorScheme();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);

  const [alertMsg, setAlertMsg] = useState<ModalAlert>({});
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<any>();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    setClient(route.params);
    setLocation({ coords: JSON.parse(route.params.coordinates) });
    console.log({ coords: JSON.parse(route.params.coordinates) })
  }, []);

  const handleSave = async (loc: any) => {
    setLoading(true);

    try {
      const { data } = await api.patch(`users/${user._id}`, {
        coordinates: JSON.stringify(loc.coords),
      });

      setUser(data);
      setShowModal(true);
      setMensage({
        title: "Concluido !",
        mensage: `Localização no maps atualizada. `,
        btnOk: "Ok",
        icon: "check",
        onPress: () => {
          setShowModal(false);
          navigate("ProfileAddress");
        },
      });
      setLoading(false);
    } catch (error) {
      setShowModal(!showModal);
      setMensage({
        title: "Error",
        mensage: "Tente novamente.",
        btnOk: "Ok",
        icon: "alert",
        onPress: () => {
          setShowModal(false);
        },
      });
    }
  };

  return (
    <>
      {client && <ScrollView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].secund },
        ]}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: Colors[colorScheme].secund,
            marginHorizontal: -5,
            marginVertical: 5,
          }}
        >
          <Ionicons
            onPress={() => {
              goBack();
            }}
            style={{}}
            name={"chevron-back"}
            size={25}
            color={Colors[colorScheme].black}
          />
          <Ionicons />
          <MaterialCommunityIcons
            onPress={() => {
              goBack();
            }}
            style={{}}
            name={"delete"}
            size={25}
            color={Colors[colorScheme].black}
          />
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: Colors[colorScheme].secund,
          }}
        >
          <Text style={{ fontSize: 20, marginVertical: 10 }}>
            {client.name}
          </Text>
          <View
            style={{
              backgroundColor: Colors[colorScheme].secund,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{client.phone}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${client.phone}`);
                }}
                style={[
                  styles.buttonOut,
                  {
                    backgroundColor: Colors[colorScheme].secund,
                    borderColor: Colors[colorScheme].gray,
                    borderRadius: 12,
                    borderWidth: 1,
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                  },
                ]}
              >
                <Ionicons
                  name="call"
                  size={23}
                  color={Colors[colorScheme].primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`https://api.whatsapp.com/send?phone=55${client.phone}&text=Ol%C3%A1%2C%20Preciso%20de%20suporte`);
                }}
                style={[
                  styles.buttonOut,
                  {
                    backgroundColor: Colors[colorScheme].secund,
                    borderColor: Colors[colorScheme].gray,
                    borderRadius: 12,
                    borderWidth: 1,
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Ionicons
                  name="logo-whatsapp"
                  size={23}
                  color={Colors[colorScheme].primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              {
                height: 1,
                width: "100%",
              },
            ]}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View
            style={{
              backgroundColor: Colors[colorScheme].secund,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>Plano R$ 30,00/m</Text>
            {/* <TouchableOpacity
              onPress={() => {
                handleSave(location);
              }}
              style={[
                styles.buttonOut,
                {
                  backgroundColor: Colors[colorScheme].secund,
                  borderColor: Colors[colorScheme].gray,
                  borderRadius: 12,
                  borderWidth: 1,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Feather
                name="edit"
                size={21}
                color={Colors[colorScheme].primary}
              />
            </TouchableOpacity> */}
          </View>
          <View
            style={[
              {
                height: 1,
                width: "100%",
              },
            ]}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View
            style={{
              backgroundColor: Colors[colorScheme].secund,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>Historico de pagamentos</Text>
            <TouchableOpacity
              onPress={() => {
                navigate('HistoryInvoice', { idClient: client._id });
              }}
              style={[
                styles.buttonOut,
                {
                  backgroundColor: Colors[colorScheme].secund,
                  borderColor: Colors[colorScheme].gray,
                  borderRadius: 12,
                  borderWidth: 1,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <AntDesign name="filetext1" size={21} color={Colors[colorScheme].primary} />

            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                height: 1,
                width: "100%",
              },
            ]}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <View
            style={{
              backgroundColor: Colors[colorScheme].secund,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>Status</Text>
            <Text style={{ fontSize: 11 }}>{client.status}</Text>
            {/* <Switch
              trackColor={{
                false: "#767577",
                true: Colors[colorScheme].black2,
              }}
              thumbColor={isEnabled ? Colors[colorScheme].sucess2 : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />*/}
          </View> 
        </View>
        {location ? (
          <View style={{ borderRadius: 8, overflow: 'hidden' }}>
            <MapView
              pointerEvents="none"
              initialRegion={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.0111,
              }}
              
              onRegionChange={(res) => {
                setLocation({ coords: res });
              }}
              style={styles.map}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
            >
              {/* <Marker
                key={1}
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                // title='Meu Local'
                // description='Teste'
              /> */}
            </MapView>

            <Ionicons
              style={{ position: "absolute", alignSelf: "center", top: "44%" }}
              name={"ios-location"}
              size={37}
              color={Colors[colorScheme].warning}
            />
          </View>
        ) : (
      <ActivityIndicator size="large" color={Colors[colorScheme].primary} />
        )}
      <View
        style={{ width: "100%", backgroundColor: Colors[colorScheme].secund }}
      >
        <Text
          style={{
            width: "100%",
            fontWeight: "100",
            color: Colors[colorScheme].black2,
            marginVertical: 5,
          }}
        >
          {client.street}, {client.number}, {client.district.name} , {client.city.name} - {client.state}
        </Text>
      </View>

    </ScrollView>}


{
  showModal && (
    <ModalAlertCustom
      title={mensage.title}
      mensage={mensage?.mensage}
      onPress={mensage.onPress}
      btnOk={mensage.btnOk}
      icon={mensage.icon}
    />
  )
}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 100
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    height: 105,
    // borderRadius: 20
  },
  buttonOut: {
    height: 40,
  },
  form: {
    height: 110,
    width: "100%",
    padding: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalMensage: {
    fontSize: 16,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: "100%",
  },
});
