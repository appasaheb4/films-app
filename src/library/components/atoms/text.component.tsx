import React from 'react';
import {Text as RNText} from 'react-native';
import {
  color,
  opacity,
  visible,
  typography,
  spacing,
  spacingShorthand,
  textShadow,
  ColorProps,
  OpacityProps,
  SpacingProps,
  TextShadowProps,
  TypographyProps,
  VisibleProps,
  VariantProps,
  useRestyle,
  createVariant,
} from '@shopify/restyle';

import {Theme} from '@/theme';

type BaseTextProps = ColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  TypographyProps<Theme> &
  SpacingProps<Theme> &
  VariantProps<Theme, 'textVariants'> &
  TextShadowProps<Theme> & {
    numberOfLines?: number;
    children?: React.ReactNode;
  };

const textVariants = createVariant({themeKey: 'textVariants'});
const restyleFunctions = [
  textVariants as any,
  spacing,
  color,
  opacity,
  visible,
  typography,
  spacingShorthand,
  textShadow,
];

export const Text = ({children, ...rest}: BaseTextProps): JSX.Element => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <RNText allowFontScaling={false} {...props}>
      {children}
    </RNText>
  );
};
