/* eslint-disable import/prefer-default-export */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  useRestyle,
  backgroundColor,
  border,
  layout,
  shadow,
  BackgroundColorProps,
  BorderProps,
  LayoutProps,
  ShadowProps,
  ColorProps,
} from '@shopify/restyle';
import {theme} from '@/theme';
import {Box, Text} from '../atoms';
import {ButtonSize} from './e-nums';

type Theme = typeof theme;
const restyleFunctions = [backgroundColor, border, layout, shadow];
type Props = BorderProps<Theme> &
  LayoutProps<Theme> &
  ShadowProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    label: string;
    labelColor?: ColorProps<Theme>['color'];
    disabled?: boolean;
    icon?: string;
    iconSize?: number;
    iconColor?: string;
  };
// const Text = createText<Theme>();

const BaseButton = ({label, labelColor, onPress, disabled, ...rest}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.5} onPress={onPress}>
      <Box opacity={disabled ? 0.7 : undefined} {...props}>
        <Text variant="bodyTextSmall" color={labelColor} fontWeight="bold">
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

interface ButtonProps {
  label: string;
  buttonSize?: ButtonSize;
  color?: ColorProps<Theme>['color'] | string;
  labelColor?: ColorProps<Theme>['color'] | string;
  onPress: () => void;
  width?: number;
  disabled?: boolean;
}

export function Button({
  label,
  color,
  labelColor,
  width = undefined,
  buttonSize = 48,
  onPress,
  disabled,
}: ButtonProps): JSX.Element {
  return (
    <BaseButton
      disabled={disabled}
      label={label}
      labelColor={labelColor || 'black'}
      backgroundColor={color || 'primary'}
      borderRadius={4}
      height={buttonSize}
      alignItems="center"
      width={width}
      justifyContent="center"
      shadowRadius={30}
      shadowOffset={{width: 0, height: 10}}
      shadowOpacity={1}
      shadowColor="limsPlusGrey"
      elevation={2}
      onPress={onPress}
    />
  );
}

interface IconTextButtonProps {
  label: string;
  labelColor?: ColorProps<Theme>['color'] | string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  buttonSize?: ButtonSize;
  color?: ColorProps<Theme>['color'] | string;
  onPress: () => void;
  width?: number;
  disabled?: boolean;
}

const IconTextBaseButton = ({
  label,
  labelColor = 'black',
  icon = 'home',
  iconSize,
  iconColor = 'black',
  onPress,
  disabled,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.5} onPress={onPress}>
      <Box
        opacity={disabled ? 0.5 : undefined}
        {...props}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box marginRight="ss" />
        <Text variant="bodyTextSmall" color={labelColor}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export function IconTextButton({
  label,
  labelColor,
  icon,
  iconSize,
  iconColor,
  color,
  width = undefined,
  buttonSize,
  onPress,
  disabled,
}: IconTextButtonProps): JSX.Element {
  return (
    <IconTextBaseButton
      disabled={disabled}
      label={label}
      labelColor={labelColor}
      icon={icon}
      iconSize={iconSize}
      iconColor={iconColor}
      backgroundColor={color || 'primary'}
      borderRadius={4}
      height={buttonSize}
      alignItems="center"
      width={width}
      justifyContent="center"
      shadowRadius={30}
      shadowOffset={{width: 0, height: 10}}
      shadowOpacity={1}
      shadowColor="limsPlusGrey"
      elevation={2}
      onPress={onPress}
    />
  );
}
