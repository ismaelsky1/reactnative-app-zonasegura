import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from './components/Themed';
import { ModalContext, ModalContextProvider } from './contexts/modal';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Colors from './constants/Colors';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
        <StatusBar translucent={false} style='light' backgroundColor={Colors[colorScheme].primary}/>
      </SafeAreaProvider>
    );
  }
}
