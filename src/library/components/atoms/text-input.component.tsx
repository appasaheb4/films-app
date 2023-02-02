import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  TextInputFocusEventData,
} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/theme';
import {Box} from '..';

interface TextInputComponentProps {
  fontSize?: number;
  placeholder?: string;
  onFocus?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (value: string) => void;
  hasError?: boolean;
  keyboardTypeValue?: KeyboardTypeOptions;
  editable?: boolean;
  autoFocus?: boolean;
  textCenter?: string;
  icon?: string;
  iconColor?: string;
  maxLength?: number;
  secureTextEntry?: boolean;
  ref?: any;
}

const INPUT_HEIGHT = 48;
const COLOR_PLACEHOLDER_RED = '#E42E0F';
const COLOR_PLACEHOLDER = '#A1A1A1';

export const TextInput = ({
  fontSize,
  placeholder,
  value,
  onFocus,
  onBlur,
  hasError = false,
  onChangeText,
  keyboardTypeValue,
  editable = true,
  autoFocus = false,
  textCenter,
  icon,
  iconColor,
  maxLength,
  secureTextEntry = false,
  ref,
}: TextInputComponentProps): JSX.Element => {
  const theme = useTheme<Theme>();
  return (
    <Box
      flexDirection="row"
      backgroundColor="limsPlusGrey"
      alignItems="center"
      borderWidth={1}
      borderRadius={5}
      borderColor={hasError ? 'red' : 'transparent'}
      paddingLeft="l"
      paddingRight="m"
      marginTop="xs"
      marginBottom="xs"
      height={INPUT_HEIGHT}>
      <RNTextInput
        ref={ref}
        editable={editable}
        onFocus={() => {
          if (onFocus) {
            onFocus();
          }
        }}
        secureTextEntry={secureTextEntry}
        style={{
          flex: 1,
          fontSize,
          color: 'white',
          textAlignVertical: 'top',
          paddingTop: Platform.OS === 'ios' ? 0 : 6,
          paddingBottom: 0,
          textAlign: textCenter,
        }}
        placeholderTextColor={
          hasError ? COLOR_PLACEHOLDER_RED : COLOR_PLACEHOLDER
        }
        placeholder={placeholder}
        keyboardType={keyboardTypeValue || 'default'}
        onEndEditing={e => {
          if (onBlur) {
            onBlur(e.nativeEvent.text);
          }
        }}
        value={value}
        autoCapitalize={
          keyboardTypeValue === 'email-address' ? 'none' : 'sentences'
        }
        onChangeText={(textValue: string) => {
          if (onChangeText) {
            onChangeText(textValue);
          }
        }}
        autoFocus={autoFocus}
        maxLength={maxLength}
      />
    </Box>
  );
};
