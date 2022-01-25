import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';
import SignUpStep2 from '../screens/SignUpStep2Screen';
import SignUpStep3 from '../screens/SignUpStep3Screen';
import SelectViewSignUpStep from '../screens/SelectViewSignUpStepScreen';

import Forgout from '../screens/ForgoutScreen';
import CheckSms from '../screens/CheckSmsScreen';
import RedefinePassword from '../screens/RedefinePasswordScreen';

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
    <Auth.Screen name="SignUpStep2" component={SignUpStep2} />
    <Auth.Screen name="SignUpStep3" component={SignUpStep3} />
    <Auth.Screen name="SelectViewSignUpStep" component={SelectViewSignUpStep} />
    
    <Auth.Screen name="Forgout" component={Forgout} />
    <Auth.Screen name="CheckSms" component={CheckSms} />
    <Auth.Screen name="RedefinePassword" component={RedefinePassword} />
    
  </Auth.Navigator>
);

export default AuthRoutes;