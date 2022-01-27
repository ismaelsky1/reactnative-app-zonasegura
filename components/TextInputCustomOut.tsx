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
  value?: any;
  invalid?: boolean;
  onChangeText: (res: any) => void;
  onBlur?: (res: any) => void;
}

export default function TextInputCustomOut(props: Props) {
  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();


  return <View style={[styles.container]}>
    <TextInput multiline={true}
    maxLength={200}
      numberOfLines={5} placeholder={props?.placeholder} keyboardType={props.keyboardType} value={String(props.value)} onBlur={props.onBlur} onChangeText={props.onChangeText} style={[styles.input, { backgroundColor: Colors[colorScheme].white, color: Colors[colorScheme].black, borderColor: Colors[colorScheme].gray }]} />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 8,
  }
});
