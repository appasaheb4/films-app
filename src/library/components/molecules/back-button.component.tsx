import React from 'react';
import {ColorProps} from '@shopify/restyle';
import {Theme} from '@/theme';
import {TouchableOpacity} from 'react-native';
import {Box} from '../atoms';
import {ButtonSize} from './e-nums';

interface BackButtonProps {
  icon?: string;
  size?: ButtonSize;
  backgroundColor?: ColorProps<Theme>['color'];
  round?: boolean;
  onPress?: () => void;
  iconColor?: string;
  componentId: string;
}

export const BackButton = ({
  icon = 'arrow-left',
  size = ButtonSize.large,
  backgroundColor = 'transparent',
  round = true,
  onPress,
  iconColor = 'black',
  componentId,
}: BackButtonProps): JSX.Element => (
  <TouchableOpacity
    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
    onPress={() => {
      if (onPress) {
        onPress();
      }
    }}>
    <Box
      backgroundColor={backgroundColor}
      borderRadius={round ? size / 2 : 0}
      height={size}
      width={size}
      justifyContent="center"
      alignItems={round ? 'center' : 'flex-start'}>
      <TouchableOpacity
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}
      />
    </Box>
  </TouchableOpacity>
);
