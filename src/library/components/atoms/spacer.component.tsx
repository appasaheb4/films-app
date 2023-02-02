import React from 'react';
import {View} from 'react-native';
import {theme} from '@/theme';

interface SpacerProps {
  multiplier?: number;
}

export const Spacer: React.FunctionComponent<SpacerProps> = ({
  multiplier = 1,
}: SpacerProps) => (
  <View style={{height: theme.measure.GUTTER * (multiplier || 1)}} />
);

Spacer.defaultProps = {
  multiplier: 1,
};
