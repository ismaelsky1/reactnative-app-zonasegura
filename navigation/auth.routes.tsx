import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';
import Forgout from '../screens/ForgoutScreen';
import CheckSms from '../screens/CheckSmsScreen';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="Forgout" component={Forgout} />
    <Auth.Screen name="CheckSms" component={CheckSms} />
    
  </Auth.Navigator>
);

export default AuthRoutes;