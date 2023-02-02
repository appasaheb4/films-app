/* eslint-disable import/no-cycle */
import {useTheme} from '@shopify/restyle';
import React, {useState} from 'react';
import {Image, ImageStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {Theme} from '@/theme';

export interface AvatarProps {
  image?: string;
  isLocal?: boolean;
  size?: keyof typeof AvatarSizes;
  onPress?: () => void;
}

export enum AvatarSizes {
  xxSmall = 32,
  extraSmall = 40,
  small = 48,
  medium = 54,
  large = 64,
  extraLarge = 120,
}

export const Avatar = ({
  image,
  size = 'medium',
  isLocal,
  onPress,
}: AvatarProps): JSX.Element => {
  const {images, colors} = useTheme<Theme>();
  const [loadFailed, setLoadFailed] = useState<boolean>(false);
  const localAvatar =
    !loadFailed && isLocal && image ? images[image] : images.avatar;
  const avatarSize = AvatarSizes[size];
  const circleStyle: ViewStyle = {
    height: avatarSize,
    width: avatarSize,
    borderRadius: avatarSize / 2,
  };
  const imageElement = (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={{...circleStyle, backgroundColor: colors.primary}}>
      <Image
        source={image && !isLocal && !loadFailed ? {uri: image} : localAvatar}
        onError={e => {
          setLoadFailed(true);
        }}
        style={circleStyle as ImageStyle}
      />
    </TouchableOpacity>
  );

  return imageElement;
};
