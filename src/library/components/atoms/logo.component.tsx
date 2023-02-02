import React from 'react';
import {useTheme} from '@shopify/restyle';
import {Image as RNImage, ImageSourcePropType} from 'react-native';
import {Theme} from '@/theme';

interface LogoProps {
  image?: ImageSourcePropType;
  size?: number;
}

export const Logo = ({image, size = 80}: LogoProps): JSX.Element => {
  const {images} = useTheme<Theme>();
  return (
    <RNImage
      source={image || images.logo}
      style={{height: size, width: size}}
      resizeMode="contain"
    />
  );
};
