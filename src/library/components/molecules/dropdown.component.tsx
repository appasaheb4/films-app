import React, {FC, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Box} from '@/library/components';

const INPUT_HEIGHT = 48;

interface Props {
  label: string;
  displayKey?: any;
  hasError?: boolean;
  data: Array<{label: string; value: string}>;
  onSelect: (item: {label: string; value: string}) => void;
}

export const Dropdown: FC<Props> = ({
  label,
  displayKey = 'title',
  hasError,
  data,
  onSelect,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const dropdownButton = useRef<any>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selected, setSelected] = useState<any>(undefined);

  const openDropdown = (): void => {
    dropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const onItemPress = (item: any): void => {
    setSelected(item[displayKey]);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{color: '#ffffff'}}>{item[displayKey]}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Box
            marginHorizontal="md"
            width="93%"
            alignSelf="center"
            backgroundColor="limsPlusGrey"
            style={[styles.dropdown, {top: dropdownTop + 15}]}>
            <FlatList
              data={data || []}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </Box>
        </TouchableOpacity>
      </Modal>
    );
  };

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
      <TouchableOpacity
        ref={dropdownButton}
        onPress={toggleDropdown}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {data ? renderDropdown() : null}
        <Text style={{color: '#ffffff'}}>{selected || label}</Text>
        <Icon name="chevron-down" color="#ffffff" />
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    shadowColor: '#000000',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
