import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from './Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
  placeholder?: string;
  keyboardType?: 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad' | 'default';
  value?: string;
  invalid?: boolean;
  onChangeText: (res: any)=> void;
  onBlur?: (res: any)=> void;
}

export default function HeaderCustom(props: Props) {
  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();


  return <View style={[styles.container, { backgroundColor: Colors[colorScheme].secund }]}>

    <Text style={[styles.title, { color: Colors[colorScheme].black2 }]}>{props?.title}</Text>
    <TextInput placeholder={props?.placeholder} keyboardType={props.keyboardType} value={props.value} onBlur={props.onBlur} onChangeText={props.onChangeText} style={[styles.input, { backgroundColor: Colors[colorScheme].white, color: Colors[colorScheme].black }]} />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
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
