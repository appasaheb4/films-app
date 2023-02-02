/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import {Text, Box, Button, Spacer} from '..';

interface PopupProps {
  visible: boolean;
  title: string;
  onSubmit: () => void;
}

export const Popup = ({
  visible = false,
  title = 'Are you sure?',
  onSubmit,
}: PopupProps): JSX.Element => {
  const modalBackgroundStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const [show, setShow] = useState<boolean>(visible);

  useEffect(() => {
    setTimeout(() => setShow(visible), 1000);
  }, [visible]);

  return (
    <Modal transparent animationType="fade" visible={show} style={{zIndex: 1}}>
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={modalBackgroundStyle}>
        <Box
          backgroundColor="stickyHeaderMessageBGColor"
          borderRadius={5}
          padding="l"
          width={344}>
          <Text variant="Body1" textAlign="center">
            {title}
          </Text>
          <Spacer multiplier={1} />
          <Box flexDirection="row" justifyContent="space-around">
            <Button
              label="Ok"
              onPress={() => {
                onSubmit && onSubmit();
              }}
              width={60}
              labelColor="black"
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
