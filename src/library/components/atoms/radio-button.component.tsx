import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, IconSize, Text, IconsIonicons} from '@/library/components';

export interface RadioButtonProps {
  title?: string;
  isChecked: boolean;
  disabled?: boolean;
  checkIcon: string;
  unCheckIcon: string;
  onCheckChange: () => void;
  size?: IconSize;
  checkIconColor?: string;
  unCheckIconColor?: string;
}

export const RadioButton = ({
  title,
  isChecked,
  disabled,
  onCheckChange,
  checkIcon,
  unCheckIcon,
  size,
  checkIconColor = 'orange',
  unCheckIconColor = 'orange',
}: RadioButtonProps): JSX.Element => (
  // const { colors } = useTheme<Theme>();
  <TouchableOpacity disabled={disabled} onPress={onCheckChange}>
    <Box flexDirection="row" alignItems="center">
      <IconsIonicons
        icon={isChecked ? 'checkmark-circle-outline' : 'ellipse-outline'}
        size={size}
        color={isChecked ? checkIconColor : unCheckIconColor}
      />
      <Text paddingHorizontal="ss" color="white">
        {title}
      </Text>
    </Box>
  </TouchableOpacity>
);
