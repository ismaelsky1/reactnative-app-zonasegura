/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
 import * as React from 'react';
 import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;

  SetLocationMap: undefined;
  Profile: undefined;
  InvoiceDetail: undefined;
  HistoryInvoice: undefined;
  ProfileAddress: undefined;
  SetLocationMapAddress: undefined;
  SelectView: undefined;
  SolicitationDetail: undefined;
  HistorySolicitatio: undefined;
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



export type AgentStackParamList = {
  RootAgent: undefined;
  NotFound: undefined;

  SolicitationDetail: undefined;
  DetailClient: undefined;
  InvoiceDetail: undefined;

  HistoryInvoice: undefined;
  
  SetLocationMap: undefined;
  Profile: undefined;
  ProfileAddress: undefined;
  SetLocationMapAddress: undefined;
  SelectView: undefined;
  
};
export type AgentBottomTabParamList = {
  TabClient: undefined;
  TabHomeAgent: undefined;
  TabProfile: undefined;
};
export type TabClientParamList = {
  TabClientScreen: undefined;
};
export type TabHomeAgentParamList = {
  TabHomeAgentScreen: undefined;
};




export type ItemListView = {
  name: string;
  descript?: string | null;
  next?: boolean | null;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  onPress: any;
  // onPress: ()=> void | JSX.Element;
  status?: any | null;
}

export type ModalAlert = {
  back?: string;
  title?: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  mensage?: string;
  btnOk?: string;
  btnCancel?: string;
  isLoading?: boolean;
  onPress?: ()=> void;
  onPressCancel?: ()=> void;
}

export type ModalAlertMap = {
  back?: string;
  title?: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  mensage?: string;
  coordinates?: string;
  startup?: Date | any;
  btnOk?: string;
  btnCancel?: string;
  isLoading?: boolean;
  onPress?: ()=> void;
  onPressCancel?: ()=> void;
}







