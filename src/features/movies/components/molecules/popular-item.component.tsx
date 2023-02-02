import React from 'react';
import {Image} from 'react-native';
import {Box, Text, IconsIonicons} from '@/library/components';

interface PopularItemProps {
  item: any;
  index: number;
}

export const PopularItem = ({item, index}: PopularItemProps) => {
  return (
    <Box key={index} padding="xs" margin="ss" flexDirection="row">
      <Image
        source={
          index % 2 === 0
            ? require('@/assets/images/temp/image7.png')
            : require('@/assets/images/temp/image8.png')
        }
        style={{width: 100, height: 150, borderRadius: 10}}
      />
      <Box marginLeft="sm">
        <Text color="white">{item.title}</Text>
        <Text color="white">
          <IconsIonicons icon="star" size={12} />
          {` ${item.vote_average}/10 IDMb`}
        </Text>
        <Box flexDirection="row">
          {item.genre_ids?.map((o: any) => (
            <Box
              style={{borderRadius: 10, margin: 5, width: 50}}
              alignItems="center"
              backgroundColor="primary">
              <Text color="black">{o}</Text>
            </Box>
          ))}
        </Box>
        <Text color="white">
          <IconsIonicons icon="time" size={12} />
          {` ${(item.vote_count / 120).toFixed(2)}/h `}
        </Text>
      </Box>
    </Box>
  );
};
