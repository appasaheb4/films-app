import React from 'react';
import {DotIndicator} from 'react-native-indicators';
import {Box} from './box.component';

export const Loader = (): JSX.Element => (
  <Box>
    <DotIndicator color="#F9A12E" size={10} />
  </Box>
);
