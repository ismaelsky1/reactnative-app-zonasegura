import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

import { Text, View } from './Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

interface Props {
  title?: string;
  placeholder?: string;
  keyboardType?: 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad' | 'default';
  value?: string;
  invalid?: boolean;
  options?: any;
  type: 'cel-phone' | 'cnpj' | 'cpf' | 'datetime' | 'money' | 'only-numbers' | 'zip-code' | 'credit-card' | 'custom';
  onChangeText: (res: any) => void;
  onBlur?: (res: any) => void;
}

export default function MaskInputCustom(props: Props) {
  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();


  return <View style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>

    <Text style={[styles.title, { color: Colors[colorScheme].black2 }]}>{props?.title}</Text>
    <TextInputMask
      type={props.type}
      options={props.options}
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props?.placeholder}
      keyboardType={props.keyboardType}
      onBlur={props.onBlur}
      style={[styles.input, { backgroundColor: Colors[colorScheme].white, color: Colors[colorScheme].black }]} 
    />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    width: '100%'
  },
  input: {
    width: '100%',
    fontSize: 16,
    padding: 8,
    marginVertical: 5,
    borderRadius: 5
  }
});
