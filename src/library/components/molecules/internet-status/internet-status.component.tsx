import {Platform} from 'react-native';
import React from 'react';
import {Box} from '../../atoms/box.component';
import {Text} from '../../atoms/text.component';
// import BackOnlineIcon from '@/Assets/BackOnline.svg';
// import NoInternetIcon from '@/Assets/NoInternet.svg';
import {t} from '@/localization';

const ICON_SIZE = 18;
export const Connected = (
  <Box
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    backgroundColor="transparent"
    style={{marginTop: Platform.OS === 'ios' ? -4 : -8}}>
    {/* <BackOnlineIcon height={ICON_SIZE} width={ICON_SIZE} /> */}
    <Text textAlign="center" color="white" paddingLeft="sm">
      {t('networkIndicator:backOnline').toString()}
    </Text>
  </Box>
);

export const Disconnected = (
  <Box
    flexDirection="row"
    justifyContent="center"
    alignItems="center"
    backgroundColor="transparent"
    style={{marginTop: Platform.OS === 'ios' ? -4 : -8}}>
    {/* <NoInternetIcon height={ICON_SIZE} width={ICON_SIZE} /> */}
    <Text textAlign="center" color="white" paddingLeft="sm">
      {t('networkIndicator:noConnection')}
    </Text>
  </Box>
);
