import React from 'react';
import {Switch} from 'react-native';
import {Box} from '../atoms';

interface ToggleProps {
  status?: boolean;
  onChange?: (value: any) => void;
}

export const Toggle = ({status, onChange}: ToggleProps): JSX.Element => (
  <Switch
    style={{transform: [{scaleX: 1}, {scaleY: 1}]}}
    trackColor={{false: 'white', true: 'white'}}
    thumbColor={status ? 'primary' : 'white'}
    onValueChange={value => {
      onChange(value);
    }}
    value={status}
  />
);
