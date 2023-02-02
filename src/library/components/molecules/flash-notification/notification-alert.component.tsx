import React from 'react';
import {hideMessage} from 'react-native-flash-message';
import {ResponsiveValue} from '@shopify/restyle';
import {useTranslation} from '@/localization';
import {Pressable} from '../../atoms/pressable.component';
import {Box} from '../../atoms/box.component';
import {Text} from '../../atoms/text.component';
import {Theme} from '@/theme/theme';

export enum NotificationAlertType {
  Success = 'Success',
  Error = 'Error',
  Default = 'Default',
}

export interface FlashNotificationButtonProps {
  type?: NotificationAlertType;
  actionLabel?: string;
  onAction?: () => void;
}

const ActionButton = ({
  actionLabel,
  onAction,
  type,
}: FlashNotificationButtonProps) => {
  const okText = useTranslation('common:ok');
  const label = actionLabel ?? okText;
  const onPress = onAction ?? hideMessage;
  const getButtonLabelColor = (): ResponsiveValue<
    keyof Theme['colors'],
    Theme
  > => {
    switch (type) {
      case NotificationAlertType.Default:
        return 'sky';
      default:
        return 'white';
    }
  };

  return (
    <Pressable style={{flex: 0.2, alignItems: 'flex-end'}} onPress={onPress}>
      <Text
        variant="bodyTextWhite"
        color={getButtonLabelColor()}
        textTransform="uppercase">
        {label}
      </Text>
    </Pressable>
  );
};

export interface NotificationAlertProps extends FlashNotificationButtonProps {
  message: string;
}

export const NotificationAlert = (
  props: NotificationAlertProps,
): JSX.Element => {
  const {message, ...rest} = props;

  const getBackgroundColor = (): ResponsiveValue<
    keyof Theme['colors'],
    Theme
  > => {
    switch (rest.type) {
      case NotificationAlertType.Success:
        return 'nature';
      case NotificationAlertType.Error:
        return 'red2';
      default:
        return 'limsPlusGrey';
    }
  };

  return (
    <Box
      backgroundColor={getBackgroundColor()}
      paddingVertical="sm"
      paddingHorizontal="lg"
      borderRadius={10}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      <Box flex={-1}>
        <Text variant="bodyTextWhite">{message}</Text>
      </Box>
      <Box flex={0} paddingHorizontal="xs" minWidth={50}>
        <ActionButton {...rest} />
      </Box>
    </Box>
  );
};
