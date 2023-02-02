import {Modal} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {Box, Pressable} from '../..';
import {animation} from '@/assets/animation';
import {DeviceHelper} from '@/library/utils';

export const FullScreenProgress = () => {
  return (
    <Box>
      <Modal
        animationType="fade"
        transparent
        visible={true}
        onRequestClose={() => {
          // this.hideModal();
        }}>
        <Pressable
          onPress={() => {}}
          backgroundColor="whiteOpacity95"
          borderRadius={5}
          alignItems="center"
          justifyContent="center"
          width={DeviceHelper.width()}
          height={DeviceHelper.height()}>
          <LottieView
            style={{backgroundColor: 'transparent', width: '70%'}}
            source={animation.loading}
            autoPlay
            speed={2}
            loop
          />
        </Pressable>
      </Modal>
    </Box>
  );
};
