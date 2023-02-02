import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ViewStyle} from 'react-native';

interface IconProps {
  icon: string;
  size?: number;
  color?: string;
  customStyle?: ViewStyle;
}

export const IconsIonicons = ({
  icon,
  size = 20,
  color = '#F9A12E',
  customStyle,
}: IconProps): JSX.Element => (
  <Ionicons name={icon} size={size} color={color} />
);
