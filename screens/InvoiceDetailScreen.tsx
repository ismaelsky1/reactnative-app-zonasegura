import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Linking, Clipboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Clipboard from '@react-native-clipboard/clipboard';
import { Picker } from "@react-native-picker/picker";

import HeaderCustom from "../components/HeaderCustom";
import ListViewCustom from "../components/ListViewCustom";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import { ModalContext, ModalContextProvider } from "../contexts/modal";
import useColorScheme from "../hooks/useColorScheme";
import { ItemListView, ModalAlert } from "../types";
import ModalAlertCustom from "../components/ModalAlertCustom";
import ModalAgendaCustom from "../components/ModalAgendaCustom";
import CardPriceCustom from "../components/CardPriceCustom";
import moment from "moment";

export default function InvoiceDetailScreen({ route }: any) {
  // const { openModalAlert, closeModal } = useContext(ModalContext);
  // const { navigate, goBack } = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [showModalAgenda, setShowModalAgenda] = useState(false);
  const [mensage, setMensage] = useState<ModalAlert>({});
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [currentCharge, setCurrentCharge] = useState<any>();
  const [currentChargeStatus, setCurrentChargeStatus] = useState('');

  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log('route', route.params)
    setCurrentCharge(route.params)
    let status = '';
    if (route.params.charges[0].status == 'ACTIVE') {
      status = 'Em aberto';
    }
    if (route.params.charges[0].status == 'PAID') {
      status = 'Pago';
    }
    if (route.params.charges[0].status == 'MANUAL_RECONCILIATION') {
      status = 'Pago';
    }
    if (route.params.charges[0].status == 'CANCELLED') {
      status = 'Cancelado';
    }
    setCurrentChargeStatus(status)
  }, [route]);

  const copyToClipboard = () => {
    Clipboard.setString("05875518529");
    setShowModal(true);
    setMensage({
      icon: "check",
      title: "Chave Copiada: ",
      btnOk: "Continuar",
      mensage: "Va em seu aplicativo de pagamento e Cole a chave.",
      onPress: () => {
        setShowModal(false);
      },
    });
  };

  return (
    <>
      <HeaderCustom back={"true"} title={"Fatura"} />

      <View
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme].secund },
        ]}
      >

        {currentCharge && (<CardPriceCustom
          title={"Plano Mensal"}
          subTitle="serviço de seguraça privada"
          price={`R$ ${currentCharge.charges[0].amount.toFixed(2)}`}
          date={`Vencimento dia ${moment(currentCharge.charges[0].dueDate).format('DD/MM/yyyy')}`}
          status={currentChargeStatus}
          link={{ url: '', params: {} }}
        />)}
        {/* <Text style={styles.title}>Status</Text>

        <Picker
          style={{ width: '100%', height: 40 }}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="Aberto" value="OPEN" />
          <Picker.Item label="Pago" value="PAID" />
          <Picker.Item label="Atrasado" value="LATE" />
        </Picker> */}

        <Text style={styles.title}>Forma de Pagamento</Text>
        {currentCharge && (<ListViewCustom
          data={[
            {
              name: "Boleto ou Cartão de Crédito",
              descript: "Rápido e pratico",
              onPress: () => {
                Linking.openURL(currentCharge.charges[0].checkoutUrl);
              },
              icon: "barcode",
              next: true,
            },
            // {
            //   name: "PIX CPF: 058.755.100-20",
            //   descript: "Necessário enviar o comprovante.",
            //   onPress: () => {
            //     copyToClipboard();
            //   },
            //   icon: "link",
            //   next: true,
            // },
            {
              name: "Agendar retirada",
              descript: "Buscar no seu endereço.",
              onPress: () => {
                Linking.openURL(
                  "https://api.whatsapp.com/send?phone=5577981143208&text=Ol%C3%A1%20desejo%20efetuar%20o%20pagamento!%20"
                );
              },
              icon: "bicycle",
              next: true,
            },
          ]}
        />)}
      </View>
      {showModal && (
        <ModalAlertCustom
          onPress={() => setShowModal(!showModal)}
          mensage={mensage?.mensage}
          icon={mensage?.icon}
          btnOk={"OK"}
          title={mensage?.title}
        />
      )}
      {showModalAgenda && (
        <ModalAgendaCustom
          onPress={() => setShowModalAgenda(!showModalAgenda)}
          mensage={mensage?.mensage}
          icon={mensage?.icon}
          btnOk={"OK"}
          title={mensage?.title}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    width: "100%",
  },
  subtitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: "15%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
