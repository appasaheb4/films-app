import React from 'react';
import {Image} from 'react-native';
import {Box, Text, IconsIonicons} from '@/library/components';

interface ShowingItemProps {
  item: any;
  index: number;
}

export const ShowingItem = ({item, index}: ShowingItemProps) => {
  return (
    <Box key={index} padding="xs" margin="ss" width={180}>
      <Image
        source={
          index % 2 === 0
            ? require('@/assets/images/temp/image7.png')
            : require('@/assets/images/temp/image8.png')
        }
        style={{width: 150, height: 180, borderRadius: 10}}
      />
      <Box marginLeft="sm">
        <Text color="white">{item.title}</Text>
        <Text color="white">
          <IconsIonicons icon="star" size={12} />
          {` ${item.vote_average}/10 IDMb`}
        </Text>
      </Box>
    </Box>
  );
};
