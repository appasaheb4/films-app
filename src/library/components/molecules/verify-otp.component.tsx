/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from 'react-native';
import {Box} from '../atoms/box.component';

interface VerifyOtpProps {
  length: number;
  onVerify: (otp: string, clearPin?: () => void) => void;
  otpClear?: boolean;
}

export const VerifyOtp = ({
  length,
  onVerify,
  otpClear = false,
}: VerifyOtpProps): JSX.Element => {
  const [pin, setPin] = useState('');
  const elRef = [...Array(length)].map(() => useRef<TextInput>(null));
  const mainRef = useRef<TextInput>(null);

  const clearPin = () => {
    mainRef?.current?.clear();
    mainRef?.current?.focus();
    elRef[0]?.current?.focus();
    setPin('');
  };

  useEffect(() => {
    if (otpClear) {
      mainRef?.current?.clear();
      mainRef?.current?.focus();
      elRef[0]?.current?.focus();
      setPin('');
    }
  }, [otpClear]);

  useEffect(() => {
    if (pin.length === length) {
      onVerify(pin, clearPin);
      const len = pin.trim().length;
      elRef[len - 1]?.current?.blur();
      elRef[len - 1].current?.focus();
      return;
    }
    Platform.OS === 'ios'
      ? mainRef?.current?.focus()
      : setTimeout(() => mainRef?.current?.focus(), 50);
  }, [pin]);

  const setPinCharacter = (idx: number, c: string) => {
    const newPin = pin.split('');
    newPin[idx] = c;
    setPin(newPin.join('').trim());
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key !== 'Backspace') {
      return;
    }

    const newPin = pin.split('');

    newPin[newPin.length - 1] = '';
    setPin(newPin.join('').trim());
  };

  return (
    <Box style={{position: 'relative'}}>
      <Box
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 48,
          marginHorizontal: '-2%',
        }}
        marginVertical="m">
        {new Array(length).fill(0).map((i, idx) => (
          <Box
            key={idx.toString()}
            style={{
              borderRadius: 6,
              borderColor: pin[idx] ? 'orange' : 'rgba(255,255,255,0)',
              borderWidth: 2,
              backgroundColor: '#fff',
              height: 60,
              width: 40,
              flexGrow: 1,
              marginHorizontal: '4%',
              flexShrink: 0,
            }}>
            <TextInput
              ref={elRef[idx]}
              style={{
                width: '100%',
                fontSize: 36,
                paddingVertical: Platform.OS !== 'ios' ? 6 : 14,
                textAlign: 'center',
                color: 'black',
              }}
              keyboardType="phone-pad"
              maxLength={1}
              value={pin ? pin[idx] || '  ' : ''}
              blurOnSubmit={false}
              onChangeText={t => setPinCharacter(idx, t)}
              onKeyPress={e => handleKeyPress(e)}
            />
          </Box>
        ))}
      </Box>
      <TextInput
        ref={mainRef}
        autoFocus
        style={{
          position: 'absolute',
          textAlign: 'left',
          paddingHorizontal: 0,
          paddingVertical: 30,
          fontSize: 24,
          fontWeight: 'bold',
          letterSpacing: 70,
          width: '100%',
          left: 24,
          right: 0,
          top: 0,
          zIndex: 2,
          color: 'rgba(255,255,255,0)',
        }}
        maxLength={length}
        caretHidden={!!pin.length}
        textContentType="oneTimeCode"
        keyboardType="phone-pad"
        onChangeText={text => setPin(text)}
      />
    </Box>
  );
};
