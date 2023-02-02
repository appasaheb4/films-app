import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react-lite';

import {Box, Spacer, Text, TextInput} from '@/library/components';
import {useStores} from '@/store';
import {UsersCard} from '../components';
import {startup} from '..';

export const Users = observer(() => {
  const {usersStore} = useStores();
  const [srText, setSrText] = useState('');

  useEffect(() => {
    startup();
  }, []);

  return (
    <Box width="100%" height="100%" padding="sm">
      <Box height="10%">
        <Box height="40%" alignItems="center">
          <Text variant="bodyText" color="white">
            Search
          </Text>
        </Box>
        <Box height="60%" flex={1}>
          <TextInput
            icon="search"
            iconColor="white"
            value={srText}
            placeholder="Search users"
            onChangeText={value => {
              usersStore.usersService.filter({
                input: {
                  type: 'search',
                  filter: {
                    srText: value,
                  },
                  page: 0,
                  limit: 10,
                },
              });
              setSrText(value);
            }}
          />
        </Box>
      </Box>
      <Spacer multiplier={1} />
      <Box height="90%">
        <FlatList
          data={usersStore && usersStore.usersList}
          //refreshing={reloadList}
          onEndReached={() => {
            console.log('next mode');
          }}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {}}>
              <UsersCard item={item} />
            </TouchableOpacity>
          )}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{paddingBottom: 20}}
        />
      </Box>
    </Box>
  );
});
