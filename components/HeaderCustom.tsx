import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from './Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  back?: string;
  title: string;
  step?: string;
}

export default function HeaderCustom(props: Props) {
  const colorScheme = useColorScheme();
  const { navigate, goBack } = useNavigation();


  return <View style={[styles.container, { backgroundColor: Colors[colorScheme].primary }]}>
    <TouchableOpacity onPress={goBack}>
      <Ionicons name="md-chevron-back" size={24} color={Colors[colorScheme].white} />
    </TouchableOpacity>
    <Text style={[styles.title, { color: Colors[colorScheme].white }]}>{props.title}</Text>
    <Text>{props?.step}</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 60,
    width: '100%',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 20
  },
});
