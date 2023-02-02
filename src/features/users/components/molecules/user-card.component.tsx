import React from 'react';
import {Image as RNImage} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Box, Text} from '@/library/components';
import {Theme} from '@/theme';

interface UsersCardProps {
  item: any;
}

export const UsersCard = ({item}: UsersCardProps) => {
  const {images} = useTheme<Theme>();
  return (
    <Box>
      <Box padding="ss" flexDirection="row">
        <Box flex={30} maxHeight={100}>
          <RNImage
            source={
              item.picture
                ? {
                    uri: item && item.picture,
                  }
                : images.defaultAvatar
            }
            style={{height: '100%', width: '100%', borderRadius: 2}}
            resizeMode="cover"
          />
        </Box>
        <Box flex={60} marginLeft="ss">
          <Text variant="bodyText">{item && item.fullName}</Text>
          <Text variant="bodyTextSmall">{item && item.userId}</Text>
          <Text variant="bodyTextSmall">{item && item.mobileNo}</Text>
        </Box>
      </Box>
    </Box>
  );
};
