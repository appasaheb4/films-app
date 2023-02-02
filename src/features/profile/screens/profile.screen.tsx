import React, {useEffect, useState, useCallback} from 'react';
import {Linking} from 'react-native';
import {Box, Text, Avatar} from '@/library/components';
import {observer} from 'mobx-react-lite';
import {useStores} from '@/store';

export const Profile = observer(() => {
  const {
    accountStore: {user},
  } = useStores();

  return (
    <Box width="100%" height="100%" padding="sm">
      <Box flexDirection="row" alignItems="center">
        {/* <BackButton componentId={componentId as string} iconColor="white" /> */}
        <Box flex={1} alignItems="center">
          <Text variant="bodyText" color="white">
            My Profile
          </Text>
        </Box>
      </Box>
      <Box marginHorizontal="m">
        <Box justifyContent="center" alignItems="center" marginTop="xxl">
          <Avatar
            size="extraLarge"
            image={
              user?.picture ||
              'https://limsplus.blob.core.windows.net/users/1599559777530.jpeg'
            }
          />
          <Text variant="bodyTextRegular" fontWeight="bold" marginTop="ss">
            {user?.fullName || 'LimsPlus'}
          </Text>
          <Box flexDirection="row" alignItems="center">
            <Text variant="bodyTextRegular" marginLeft="l">
              {user?.userId || 'ts1234'}
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <Text variant="bodyTextRegular" marginLeft="l">{`+91 ${
              user?.mobileNo || '9260303151'
            }`}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
