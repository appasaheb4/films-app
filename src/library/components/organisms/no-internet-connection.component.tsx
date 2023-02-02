import React from 'react';
import {Box, Text, Logo, Button} from '@/library/components';
import {images} from '@/theme';

export const NoInternetConnection = () => (
  <>
    <Box alignItems="center" marginTop="xxxl">
      <Text variant="Header" color="white" marginTop="m">
        No Internet
      </Text>
      <Text variant="Header2" color="white" fontWeight="bold">
        Connection
      </Text>
      <Box width={302}>
        <Text
          variant="Body1"
          color="stickyHeaderMessageTextColor"
          marginTop="xm"
          textAlign="center">
          Please check your internet Connection and try again
        </Text>
      </Box>
      <Box marginTop="xxxl">
        <Button
          label="Try Again"
          width={105}
          onPress={() => {}}
          labelColor="black"
        />
      </Box>
    </Box>
  </>
);
