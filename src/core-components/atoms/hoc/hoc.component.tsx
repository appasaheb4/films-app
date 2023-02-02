import React, {useRef} from 'react';
import {PanResponder, View} from 'react-native';
import {createNavigationContainerRef} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();

export const HOC = ({children}: {children: any}) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: evt => {
        // const eventId = evt._targetInst.memoizedProps.testID;
        // if (eventId) {
        //   logEventId(eventId);
        // } else {
        //   // eslint-disable-next-line no-console
        //   console.log('EVENT ID NOT AVAILABLE');
        // }
        return false;
      },
    }),
  ).current;

  return (
    <View style={{flex: 1}} {...panResponder.panHandlers}>
      {children}
    </View>
  );
};
