import React, { useState, useEffect, useCallback } from "react";
import { Vibration } from "react-native";
import { Text, View } from "../components/Themed";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { Permissions } from 'react-native-unimodules';
import { useIsFocused } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Constants from "expo-constants";

import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Switch,
  Image,
  TouchableHighlight,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ModalAlertCustom from "../components/ModalAlertCustom";

import { ModalAlert } from "../types";
import api from "../services/api";
import { useAuth } from "../hooks/auth";
import logoImg from "../assets/images/shield.png";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Animated from "react-native-reanimated";
import ListViewCustom from "../components/ListViewCustom";
import ListViewDanger from "../components/ListViewDanger";

export default function SetLocationMapAddressScreen() {
  const { user, setUser } = useAuth();
  const isFocused = useIsFocused();

  const { navigate, goBack } = useNavigation();
  const colorScheme = useColorScheme();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoade, setIsLoade] = useState<boolean>(false);
  const [solicitationOpen, setSolicitationOpen] = useState(0);
  const [current, setCurrent] = useState<any>(null);
  const [listSolicitationNow, setListSolicitationNow] = useState<any>([]);
  const [listSolicitationSheduled, setListSolicitationSheduled] = useState<any>(
    []
  );

  const [alertMsg, setAlertMsg] = useState<ModalAlert>({});
  const [loading, setLoading] = useState(false);
  const [nick, setNick] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    
    
    const timeout = setInterval(() => {
      getSolicitation();
    }, 60000);
  }, []);

  useEffect(() => {
    const use = user.name.split(" ");
    setNick(use[0]);
    getSolicitation();
  }, [isFocused]);

  useEffect(() => {
    Vibration.vibrate();
  }, [solicitationOpen]);

  const getSolicitation = async () => {
    try {
      setIsLoade(true);
      const { data } = await api.get("agent/dashboard");
      const now = data.now.map((item: any) => {
        return {
          name: item.client.name,
          descript: item.typeSolicitation.name,
          icon: item.typeSolicitation.icon,
          status: item.status,
          onPress: () => {
            navigate("SolicitationDetail", item);
          },
        };
      });
      const sheduled = data.scheduled.map((item: any) => {
        const startUp = new Date(item.startUp);
        return {
          name: item.client.name,
          descript: `${startUp.getHours()}:${
            startUp.getMinutes() < 10 ? "0" : ""
          }${startUp.getMinutes()} - ${item.typeSolicitation.name}`,
          icon: item.typeSolicitation.icon,
          status: item.status,
          onPress: () => {
            navigate("SolicitationDetail", item);
          },
        };
      });

      setListSolicitationNow(now);
      setListSolicitationSheduled(sheduled);
      setSolicitationOpen(data.open);
      setCurrent(data.current);
      console.log('data.current',data.current)

      setIsLoade(false);
    } catch (error: any) {
      // console.log("error", error);

      setShowModal(!showModal);
      setMensage({
        title: "Error",
        mensage: "Tente novamente mais tarde.",
        btnOk: "Ok",
        icon: "alert",
        onPress: () => {
          setShowModal(false);
        },
      });
    }
  };

  function fastScreen() {
    return (
      <View
        key="fastScreen"
        style={{ flex: 1, backgroundColor: Colors[colorScheme].secund }}
      >
        <ListViewCustom key="fastScreen1" data={listSolicitationNow} />
      </View>
    );
  }

  function scheduledScreen() {
    return (
      <View
        key="scheduledScreen"
        style={{ flex: 1, backgroundColor: Colors[colorScheme].secund }}
      >
        <ListViewCustom
          key="scheduledScreen1"
          data={listSolicitationSheduled}
        />
      </View>
    );
  }

  const Tab = createMaterialTopTabNavigator();

  function MyTabBar({ state, descriptors, navigation, position }: any) {
    return (
      <View
        key={descriptors + "1"}
        style={{ flexDirection: "row", borderRadius: 15, marginBottom: 10 }}
      >
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_: any, i: any) => i);
          // const opacity = position.interpolate({
          //   inputRange,
          //   outputRange: inputRange.map((i : any) => (i === index ? 1 : 0)),
          // });

          return (
            <TouchableOpacity
              key={label + "1"}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                backgroundColor: isFocused
                  ? Colors[colorScheme].primary
                  : Colors[colorScheme].white,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                height: 35,
              }}
            >
              <Animated.Text
                key={label}
                style={{
                  opacity: 1,
                  color: isFocused
                    ? Colors[colorScheme].white
                    : Colors[colorScheme].black2,
                }}
              >
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <>
      <View key={"container"} style={styles.container}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: Colors[colorScheme].primary,
            },
          ]}
        >
          <View style={styles.headerSwitch}>
            {/* <Switch
              style={styles.switchStatus}
              trackColor={{
                false: "#767577",
                true: Colors[colorScheme].black2,
              }}
              thumbColor={isEnabled ? Colors[colorScheme].sucess2 : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            {isEnabled && (
              <Text
                style={[
                  styles.textAtiveStatusAgent,
                  { color: Colors[colorScheme].white },
                ]}
              >
                Ativo
              </Text>
            )}
            {!isEnabled && (
              <Text
                style={[
                  styles.textAtiveStatusAgent,
                  { color: Colors[colorScheme].white },
                ]}
              >
                Ausente
              </Text>
            )} */}
          </View>
          <Image style={styles.logo} source={logoImg} />
        </View>
        <View
          style={[styles.body, { backgroundColor: Colors[colorScheme].secund }]}
        >
          <Text style={[styles.textNick, { color: Colors[colorScheme].text }]}>
            Ol?? {nick}
          </Text>
          <Text
            style={[
              styles.textNotification,
              { color: Colors[colorScheme].text },
            ]}
          >
            Voc?? tem {solicitationOpen} novos chamados!
            {/* Voc?? tem {nick} novos chamados! */}
          </Text>
          <Text
            style={[
              styles.textCurrentSolicitation,
              { color: Colors[colorScheme].black2 },
            ]}
          >
            Chamado em atendimento
          </Text>
          {current && (
            <TouchableOpacity
              onPress={() => {
                navigate("SolicitationDetail", current);
              }}
            >
              <View
                style={[
                  styles.cardCurrent,
                  { backgroundColor: Colors[colorScheme].white },
                ]}
              >
                <View
                  style={[
                    // styles.cardCurrent,
                    { backgroundColor: Colors[colorScheme].white },
                  ]}
                >
                  <Ionicons
                    style={{
                      backgroundColor: Colors[colorScheme].secund,
                      padding: 18,
                      borderRadius: 6,
                      marginRight: 10,
                    }}
                    name="megaphone-outline"
                    size={34}
                    color={Colors[colorScheme].orange}
                  />
                </View>
                <View
                  style={[
                    // styles.cardCurrent,
                    {
                      backgroundColor: Colors[colorScheme].white,
                      width: "70%",
                    },
                  ]}
                >
                  <Text
                    style={[
                      // styles.textCardNickName,
                      { color: Colors[colorScheme].black2, fontWeight: "700" },
                    ]}
                  >
                    {current?.client.name}
                  </Text>
                  <Text
                    style={[
                      // styles.textCardNickName,
                      { color: Colors[colorScheme].orange, fontWeight: "700" },
                    ]}
                  >
                    {current?.typeSolicitation?.type == "NOW" && "#R??pido"}
                    {current?.typeSolicitation?.type == "SCHEDULED" &&
                      "#Agendado"}
                  </Text>
                  <Text
                    style={[
                      // styles.textCardNickName,
                      {
                        color: Colors[colorScheme].black2,
                        fontWeight: "100",
                      },
                    ]}
                  >
                    {current?.client.street} - {current?.client.number},{" "}
                    {current?.district.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          <Text
            style={[
              styles.textCurrentSolicitation,
              { color: Colors[colorScheme].black2 },
            ]}
          >
            Chamados
          </Text>
          <NavigationContainer independent={true}>
            <Tab.Navigator
              style={{
                backgroundColor: Colors[colorScheme].secund,
              }}
              tabBar={(props: any) => <MyTabBar {...props} />}
            >
              <Tab.Screen name="Rapido" component={fastScreen} />
              <Tab.Screen name="Agendado" component={scheduledScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </View>

      {showModal && (
        <ModalAlertCustom
          title={mensage.title}
          mensage={mensage?.mensage}
          onPress={mensage.onPress}
          btnOk={mensage.btnOk}
          icon={mensage.icon}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flex: 1,
    // height: "90%",
  },

  header: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    padding: 15,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  headerSwitch: {
    flexDirection: "row",
    display: "flex",
    backgroundColor: "rgba(52, 52, 52, 0.0)",
  },
  textAtiveStatusAgent: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  switchStatus: {
    marginRight: 5,
  },
  logo: {
    width: 50,
    height: 50,
  },
  body: {
    marginTop: -25,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
    padding: 25,
  },
  textNick: {
    fontSize: 24,
    fontWeight: "700",
  },
  textNotification: {
    fontSize: 14,
    fontWeight: "100",
  },
  textCurrentSolicitation: {
    fontSize: 12,
    fontWeight: "100",
    marginTop: 20,
    marginBottom: 10,
  },
  cardCurrent: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    height: 110,
  },
});
