import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus, Platform, SafeAreaView} from 'react-native';
import {Box} from '../atoms/box.component';
import {showMessage} from './flash-notification/flash-notification.component';
import {
  Connected,
  Disconnected,
} from './internet-status/internet-status.component';

const AUTO_HIDE_DURATION = 5000;

export const NetworkIndicators = () => {
  const hasInternet = useRef<boolean>();
  const [appState, setAppState] = useState(AppState.currentState);

  const showDisconnectedMessage = () => {
    showMessage('', {
      autoHide: false,
      hideOnPress: false,
      renderCustomContent: () => Disconnected,
      style: {
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingTop: 0,
        height: 40,
        zIndex: 9999,
        backgroundColor: '#505F6B',
      },
    });
  };

  const showConnectedMessage = () => {
    showMessage('', {
      duration: AUTO_HIDE_DURATION,
      autoHide: true,
      renderCustomContent: () => Connected,
      style: {
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 0,
        paddingTop: 0,
        height: 40,
        zIndex: 9999,
        backgroundColor: '#00AC69',
      },
    });
  };

  const connectivityChangeListener = () => {
    NetInfo.addEventListener(state => {
      if (state.isInternetReachable !== null) {
        if (!state.isInternetReachable) {
          hasInternet.current = false;
          showDisconnectedMessage();
        } else if (
          hasInternet?.current !== undefined &&
          !hasInternet.current &&
          state.isInternetReachable
        ) {
          hasInternet.current = true;
          showConnectedMessage();
        }
      }
    });
  };

  const netInfo = useNetInfo();
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState !== nextAppState) {
      if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active' &&
        Platform.OS === 'ios'
      ) {
        if (netInfo.isInternetReachable !== null) {
          if (!netInfo.isInternetReachable) {
            hasInternet.current = false;
            showDisconnectedMessage();
          } else if (
            hasInternet?.current !== undefined &&
            !hasInternet.current &&
            netInfo.isInternetReachable
          ) {
            hasInternet.current = true;
            showConnectedMessage();
          }
        }
      }
      setAppState(nextAppState);
    }
  };

  useEffect(() => {
    connectivityChangeListener();
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <SafeAreaView />
    </Box>
  );
};
