import React, {useMemo, useCallback} from 'react';

import {Box, Text, Spacer} from '@/library/components';
import Feather from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

interface BottomSheetCreditCardProps {
  bottomSheetRef: any;
  onPress(): void;
}

export const BottomSheetCreditCard = (props: BottomSheetCreditCardProps) => {
  //const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['80%', '92%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index < 0) {
      props.bottomSheetRef.current?.present();
    }
  }, []);

  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      icon: 'upload-cloud',
      title: 'Top-up account',
      subTitle: 'Deposit money to your account to use with card',
      deposit: false,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      icon: 'aperture',
      title: 'Weekly spending limit',
      subTitle: 'Your weekly spending limit is S$ 5,000',
      deposit: true,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      icon: 'activity',
      title: 'Freeze card',
      subTitle: 'This deactivates your current debit card',
      deposit: false,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e244d72',
      icon: 'cloud-drizzle',
      title: 'Cloud',
      subTitle: 'This deactivates your current debit card',
      deposit: false,
    },
  ];

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={props.bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <Box
          height="32%"
          backgroundColor="primary"
          marginHorizontal="l"
          borderRadius={6}
          padding="m"
          overflow="visible">
          <Box flexDirection="row" justifyContent="flex-end">
            <Feather name="upload-cloud" color="black" size={20} />
            <Text marginLeft="ss">aspire</Text>
          </Box>
          <Spacer multiplier={1} />
          <Text variant="h1" color="black" fontWeight="bold">
            Mark Henry
          </Text>
          <Spacer multiplier={1} />
          <Text
            letterSpacing={
              3
            }>{`${7687}     ${6876}     ${9797}    ${7978}`}</Text>
          <Spacer multiplier={1} />
          <Text
            letterSpacing={2}
            variant="bodyTextSmall"
            color="black">{`Thus: 12/20        CVV:${456}`}</Text>
          <Box alignItems="flex-end">
            <Text variant="h1" color="black" fontWeight="bold">
              VISA
            </Text>
          </Box>
        </Box>
        <Spacer multiplier={0.6} />
        <Box height="65%" marginHorizontal="l">
          <Box flexDirection="row" justifyContent="space-between">
            <Text>Debit card spending limit</Text>
            <Box flexDirection="row">
              <Text variant="bodyTextRegular">$ 300 </Text>
              <Text color="limsPlusGrey4">| $ 5,000</Text>
            </Box>
          </Box>
          <Spacer multiplier={0.6} />
          <Progress.Bar
            progress={0.3}
            color="#FEC84D"
            height={14}
            borderRadius={10}
            width={Dimensions.get('window').width / 1.1}
          />
          <FlatList
            data={data}
            renderItem={({item}: any) => (
              <Box flexDirection="row" padding="m" alignItems="center">
                <Feather name={item.icon} color="black" size={25} />
                <Box marginLeft="m">
                  <Text>{item.title}</Text>
                  <Text color="limsPlusGrey4">{item.subTitle}</Text>
                </Box>
              </Box>
            )}
            keyExtractor={item => item.id}
          />
        </Box>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
