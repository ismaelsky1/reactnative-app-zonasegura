/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
 import * as React from 'react';
 import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;

  RequestService: undefined;
  SetLocationMap: undefined;
  Profile: undefined;
  InvoiceDetail: undefined;
  HistoryInvoice: undefined;
  ProfileAddress: undefined;
  SetLocationMapAddress: undefined;
};

export type BottomTabParamList = {
  TabWallet: undefined;
  TabHome: undefined;
  TabProfile: undefined;
};

export type TabWalletParamList = {
  TabWalletScreen: undefined;
};

export type TabHomeParamList = {
  TabHomeScreen: undefined;
};

export type TabProfileParamList = {
  TabProfileScreen: undefined;
};

export type ItemListView = {
  name: string;
  descript?: string | null;
  next?: boolean | null;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  onPress: any;
  // onPress: ()=> void | JSX.Element;
  styleItem?: any | null;
}

export type ModalAlert = {
  back?: string;
  title?: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  mensage?: string;
  btnOk?: string;
  btnCancel?: string;
  onPress?: ()=> void;
  onPressCancel?: ()=> void;
}


