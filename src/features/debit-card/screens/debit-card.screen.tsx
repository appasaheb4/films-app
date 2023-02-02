import React, {useEffect, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import {Box, Text, Spacer, BottomSheetCreditCard} from '@/library/components';
import {useStores} from '@/store';
import Feather from 'react-native-vector-icons/Feather';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import _ from 'lodash';
import {Platform, StatusBar} from 'react-native';

export const DebitCard = observer(() => {
  const {dashboardStore} = useStores();

  const refBottomSheetCreditCard = useRef<BottomSheetModal>(null);

  useEffect(() => {
    dashboardStore.dashboardService.listAllBanner();
    refBottomSheetCreditCard.current?.present();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%" height="100%">
      <Box
        height="30%"
        padding="l"
        style={{
          marginTop: Platform.OS !== 'ios' ? 0 : 25,
        }}>
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="h1" fontWeight="bold">
            Debit Card
          </Text>
          <Feather name="upload-cloud" color="#FEC84D" size={25} />
        </Box>
        <Spacer multiplier={1} />
        <Text variant="bodyTextSmall">Available Balance</Text>
        <Spacer multiplier={0.6} />
        <Box flexDirection="row" alignItems="center">
          <Box
            padding="ss"
            backgroundColor="primary"
            borderRadius={5}
            minWidth={50}
            alignItems="center">
            <Text variant="bodyText" color="white">
              S$
            </Text>
          </Box>
          <Text variant="h2" marginLeft="m" fontWeight="bold">
            3,000
          </Text>
        </Box>
      </Box>
      <BottomSheetCreditCard
        bottomSheetRef={refBottomSheetCreditCard}
        onPress={() => {}}
      />
    </Box>
  );
});
