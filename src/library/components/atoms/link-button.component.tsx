import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from './text.component';
import {Padding} from '../organisms';

interface LinkButtonProps {
  label: string;
  size?: LinkButtonSize;
  bold?: boolean;
  onPress?: () => void;
}

export const LinkButton = ({
  label,
  size = 14,
  bold = false,
  onPress,
}: LinkButtonProps): JSX.Element => {
  // const { poppinsRegular } = theme.fonts;
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}>
      <Text
        // fontFamily={poppinsRegular}
        fontSize={size}
        color="white"
        textDecorationLine="underline"
        padding="ss">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
