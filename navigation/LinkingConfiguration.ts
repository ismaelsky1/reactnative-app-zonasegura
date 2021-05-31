/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabWallet: {
            screens: {
              TabWalletScreen: 'wallet',
            },
          },
          TabHome: {
            screens: {
              TabHomeScreen: 'home',
            },
          },
          TabProfile: {
            screens: {
              TabProfileScreen: 'profile',
            },
          },
        },
      },
      RequestService: {
        screens: {
          RequestServiceScreen: 'RequestService'
        }
      },
      NotFound: '*',
    },
  },
};
