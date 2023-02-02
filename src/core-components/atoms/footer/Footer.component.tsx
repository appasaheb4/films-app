import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/theme';
import {IconsIonicons} from '@/library/components';

//import {DashboardStack} from '../../../features';
import {MoviesStack} from '../../../features';
const journey = 'DASH';
const journeyId = `${'Android'}_${journey}`;
const Tab = createBottomTabNavigator();
const tabs = [
  {
    name: 'Home',
    component: MoviesStack.moviesListStack,
    testID: 'HOME',
    icon: (iconColor: string, iconSize: number) =>
      iconColor ? (
        <IconsIonicons
          icon="nuclear-outline"
          size={iconSize}
          color={iconColor}
        />
      ) : (
        <IconsIonicons
          icon="nuclear-outline"
          size={iconSize}
          color={iconColor}
        />
      ),
  },
  {
    name: 'Home1',
    component: MoviesStack.moviesStack,
    testID: 'HOME1',
    icon: (iconColor: string, iconSize: number) =>
      iconColor ? (
        <IconsIonicons
          icon="bookmarks-outline"
          size={iconSize}
          color={iconColor}
        />
      ) : (
        <IconsIonicons
          icon="bookmarks-outline"
          size={iconSize}
          color={iconColor}
        />
      ),
  },
  {
    name: 'Home2',
    component: MoviesStack.moviesStack,
    testID: 'HOME2',
    icon: (iconColor: string, iconSize: number) =>
      iconColor ? (
        <IconsIonicons
          icon="bookmark-outline"
          size={iconSize}
          color={iconColor}
        />
      ) : (
        <IconsIonicons
          icon="bookmark-outline"
          size={iconSize}
          color={iconColor}
        />
      ),
  },
  // {
  //   name: 'referAFriend',
  //   component: ProductStack,
  //   testID: 'RFR-FRND',
  //   icon: (iconColor: string, iconSize: number) =>
  //     iconColor === palette.orange ? (
  //       <XB_Icon
  //         icon={icon.sharedusercoral}
  //         width={iconSize + 5}
  //         height={iconSize + 5}
  //       />
  //     ) : (
  //       <XB_Icon
  //         icon={icon.shareduser}
  //         width={iconSize + 5}
  //         height={iconSize + 5}
  //       />
  //     ),
  // },
  // {
  //   name: 'scanAndPay',
  //   component: ProductStack,
  //   testID: 'SCAN-PAY',
  //   icon: (iconColor: string, iconSize: number) =>
  //     iconColor === palette.orange ? (
  //       <XB_Icon icon={icon.scanQrcode} width={iconSize} height={iconSize} />
  //     ) : (
  //       <XB_Icon icon={icon.scanQrGrey} width={iconSize} height={iconSize} />
  //     ),
  // },
  // {
  //   name: 'rewards',
  //   component: ProductStack,
  //   testID: 'RWDS',
  //   icon: (iconColor: string, iconSize: number) =>
  //     iconColor === palette.orange ? (
  //       <XB_Icon
  //         icon={icon.rewardscoral}
  //         width={iconSize + 5}
  //         height={iconSize + 5}
  //       />
  //     ) : (
  //       <XB_Icon
  //         icon={icon.rewards}
  //         width={iconSize + 5}
  //         height={iconSize + 5}
  //       />
  //     ),
  // },
  // {
  //   name: 'menuTab',
  //   component: BurgerMenuStack,
  //   testID: 'BRGM-MENU',
  //   icon: (iconColor: string, iconSize: number) =>
  //     iconColor === palette.orange ? (
  //       <XB_Icon icon={icon.menucoral} width={iconSize} height={iconSize} />
  //     ) : (
  //       <XB_Icon icon={icon.menusimple} width={iconSize} height={iconSize} />
  //     ),
  // },
];

export const Footer = () => {
  const {colors} = useTheme<Theme>();
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.limsPlusGrey,
        tabBarStyle: {height: 40, paddingVertical: 4, backgroundColor: '#000'},
        tabBarLabelStyle: {fontSize: 0},
      }}
      initialRouteName={t('homeTab')}>
      {tabs?.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={t(tab.name)}
          component={tab.component}
          initialParams={{
            eventId: `${journeyId}_${tab.testID}`,
          }}
          options={{
            tabBarIcon: ({size, color}) => tab.icon(color, size),
            tabBarTestID: `${journeyId}_${tab.testID}-TAB`,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
