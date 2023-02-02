import * as React from 'react';
import {Stack} from '@/core-navigations/root.navigation';

import {Login} from '../screens/login.screen';
import {Login1} from '../screens/login1.screen';
import {OTPVerify} from '../screens/otp-verify.screen';

const journey = 'LOG';
const journeyId = `${'Android'}_${journey}`;

export default function AuthStack() {
  const authRoutes = [
    {
      name: 'login',
      component: Login1,
      screenId: 'LOGIN',
    },
    {
      name: 'otpVerify',
      component: OTPVerify,
      screenId: 'OTP_VERIFY',
    },
  ];
  return (
    <Stack.Navigator initialRouteName={'login'}>
      {authRoutes?.map(route => {
        return (
          <Stack.Screen
            key={route.name}
            name={route.name}
            initialParams={{eventId: `${journeyId}_${route.screenId}`}}
            component={route.component}
            options={{headerShown: false}}
          />
        );
      })}
    </Stack.Navigator>
  );
}
