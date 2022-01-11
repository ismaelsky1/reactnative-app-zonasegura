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
      SetLocationMap: {
        screens: {
          SetLocationMapScreen: 'SetLocationMap'
        }
      },
      ProfileScreen: {
        screens: {
          ProfileScreen: 'Profile'
        }
      },
      InvoiceDetailScreen: {
        screens: {
          InvoiceDetailScreen: 'InvoiceDetail'
        }
      },
      HistoryInvoiceScreen: {
        screens: {
          HistoryInvoiceScreen: 'HistoryInvoice'
        }
      },
      ProfileAddressScreen: {
        screens: {
          ProfileAddressScreen: 'ProfileAddress'
        }
      },
      SelectViewScreen: {
        screens: {
          SelectViewScreen: 'SelectView'
        }
      },
      SetLocationMapAddressScreen: {
        screens: {
          SetLocationMapAddressScreen: 'SetLocationMapAddress'
        }
      },
      HistorySolicitatioScreen: {
        screens: {
          HistorySolicitatioScreen: 'HistorySolicitatio'
        }
      },


      // AGENT ROLE SCREEN
      RootAgent: {
        screens: {
          TabHomeAgent: {
            screens: {
              TabHomeAgentScreen: 'TabHomeAgent',
            },
          },
          TabClient: {
            screens: {
              TabClientScreen: 'TabClient',
            },
          }
        },
      },
      
      SolicitationDetailScreen: {
        screens: {
          SolicitationDetailScreen: 'SolicitationDetail'
        }
      },
      
      NotFound: '*',
    },
  },
};
