import * as React from 'react';
import {Stack} from '../../../core-navigations/root.navigation';
import {Dashboard} from '../screens/dashboard.screen';

const journey = 'DASHBD';
const journeyId = `${'Android'}_${journey}`;

export default function DashboardStack() {
  const dashboardRoutes = [
    {
      name: 'dashboard',
      component: Dashboard,
      screenId: 'DASH-BOARD',
    },
  ];

  return (
    <Stack.Navigator initialRouteName={'dashboard'}>
      {dashboardRoutes?.map(route => {
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
