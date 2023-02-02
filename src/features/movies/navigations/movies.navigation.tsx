import * as React from 'react';
import {Stack} from '../../../core-navigations/root.navigation';
import {Movies} from '../screens/movies.screen';
import {MoviesList} from '../screens/movies-list.screen';
import {MovieDetails} from '../screens/movie-details.screen';
const journey = 'DASHBD';
const journeyId = `${'Android'}_${journey}`;

export const moviesStack = () => {
  const moviesRoutes = [
    {
      name: 'movies',
      component: Movies,
      screenId: 'DASH-MOV',
    },
  ];

  return (
    <Stack.Navigator initialRouteName={'movies'}>
      {moviesRoutes?.map(route => {
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
};

export const moviesListStack = () => {
  const moviesRoutes = [
    {
      name: 'movies-list',
      component: MoviesList,
      screenId: 'DASH-MOV-LIST',
    },
    {
      name: 'movies-details',
      component: MovieDetails,
      screenId: 'DASH-MOV-DETAILS',
    },
  ];

  return (
    <Stack.Navigator initialRouteName={'movies-list'}>
      {moviesRoutes?.map(route => {
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
};
