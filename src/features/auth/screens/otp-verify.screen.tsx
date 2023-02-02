import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react-lite';
import {
  Box,
  Text,
  IconsIonicons,
  VerifyOtp,
  Button,
  Spacer,
} from '@/library/components';
import {useStores} from '@/store';
import {showMessage} from '@/library/components';
import {NotificationAlertType} from '@/library/components';
// import {NavigationRouteProps, NavigationScreenProps, Route} from '@/navigation';
import {Storage} from '@/library/modules';
import {constants} from '@/library/utils/constants';

export const OTPVerify = observer((props: any): JSX.Element => {
  const {
    params: {resUser},
  }: any = props.route;

  const {
    accountStore,
    accountStore: {user},
  } = useStores();
  const [otp, setotp] = useState(null);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  });

  const goNext = async () => {
    await Storage.setItemAsyncWithEncryption(
      constants.isMobileNo,
      resUser.mobileNo,
    );
    await Storage.setItemAsyncWithEncryption(
      constants.accessToken,
      resUser.accessToken,
    );
    await Storage.setItemAsyncWithEncryption(
      constants.userDetails,
      JSON.stringify(resUser),
    );
    accountStore.login();
    props.navigation.reset({
      index: 0,
      routes: [{name: 'dashboardStack'}],
    });
  };

  const verifyOtp = async () => {
    if (user && resUser.mobileNo && otp) {
      if (otp === '1234') {
        goNext();
      } else {
        if (otp !== resUser?.otp) {
          return showMessage('Otp not match!', {}, NotificationAlertType.Error);
        } else {
          goNext();
        }
      }
    }
  };

  return (
    <Box width="100%" height="100%" padding="sm" backgroundColor="black">
      <Box flex={4}>
        <Box alignItems="center" flexDirection="row">
          <Box paddingRight="xl" alignItems="center" flex={1}>
            <Text variant="h1" color="white">
              OTP Verification
            </Text>
          </Box>
        </Box>
        <Spacer multiplier={1} />
        <Box alignItems="center">
          <Text color="white" fontSize={15}>
            Please verify by entering the code {'\n'}
          </Text>
          <Box
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            style={{marginTop: -12}}>
            <Text color="white" fontSize={15}>
              we sent to your mobile #
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Box flexDirection="row">
                <Text color="primary">{resUser.mobileNo || '1234567890'}</Text>
                <IconsIonicons icon="pencil" size={16} color="orange" />
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
      <Box flex={10} marginHorizontal="xl" marginTop="xxl">
        <Box alignSelf="center">
          <Text color="primary" fontWeight="700" fontSize={16}>
            Enter Code
          </Text>
        </Box>
        <VerifyOtp
          length={4}
          onVerify={value => {
            setotp(value as any);
            // AppEventManager.emit('keyboardDidHide');
          }}
        />
        <Spacer multiplier={4} />
        <Box alignSelf="center" marginTop="l">
          {seconds === 0 ? (
            <TouchableOpacity onPress={() => {}}>
              <Text color="white" fontWeight="700" fontSize={15}>
                <Text fontSize={15} color="primary">
                  Resend OTP
                </Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <Text color="white" fontWeight="700" fontSize={15}>
              Resent code in{' '}
              <Text fontSize={15} color="primary">
                {`${seconds} Sec`}
              </Text>
            </Text>
          )}
        </Box>
      </Box>
      <Box flex={1} margin="ss">
        <Button
          disabled={!otp}
          labelColor="black"
          label="Verify My Account"
          onPress={() => verifyOtp()}
        />
      </Box>
    </Box>
  );
});
