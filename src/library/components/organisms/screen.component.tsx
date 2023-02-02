import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import NetInfo from '@react-native-community/netinfo';
import {useStores} from '@/store';
import {Box} from '../atoms/box.component';
import {Loader} from '../atoms/loader.component';
import {NoInternetConnection} from './no-internet-connection';

const styles = StyleSheet.create<{default: ViewStyle}>({
  default: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export enum Padding {
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'l',
  xxl = 'xxl',
}

interface ScreenComponentProps {
  useStatusBar?: boolean;
  useScrollView?: boolean;
  children: React.ReactNode;
  padding?: Padding;
  // statusBarColor?: Colors;
  // gradient?: Array<typeof colors> | Array<string>;
}

export const Screen: React.FunctionComponent<ScreenComponentProps> = observer(
  ({
    useStatusBar = true,
    useScrollView = false,
    children,
    padding = Padding.s,
  }) => {
    const {loading} = useStores();
    const [isConnected, setInternetStatus] = useState<boolean | null>(true);
    const keyboardDidHide = (): void => {
      Keyboard.dismiss();
    };
    useEffect(() => {
      NetInfo.addEventListener(state => {
        setInternetStatus(state.isConnected);
      });
      Keyboard.addListener('keyboardDidHide', keyboardDidHide);
      // AppEventManager.subscribe('keyboardDidHide', async () => {
      //   keyboardDidHide();
      // });
    }, []);
    return (
      <>
        <SafeAreaView style={styles.default}>
          {useStatusBar && (
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
          )}
          <KeyboardAvoidingView style={styles.default}>
            <Box
              flex={1}
              padding={useScrollView ? 0 : padding}
              backgroundColor="white">
              {useScrollView && (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled">
                  <Box flex={1} padding={padding} backgroundColor="white">
                    {isConnected ? (
                      <Box flex={1}>
                        {children}
                        {loading && <Loader />}
                      </Box>
                    ) : (
                      <NoInternetConnection />
                    )}
                  </Box>
                </ScrollView>
              )}
              {!useScrollView && (
                <>
                  {isConnected ? (
                    <Box flex={1}>
                      {children}
                      {loading && <Loader />}
                    </Box>
                  ) : (
                    <NoInternetConnection />
                  )}
                </>
              )}
            </Box>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  },
);
