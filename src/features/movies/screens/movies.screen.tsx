import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Box, Text, Button, IconsIonicons} from '@/library/components';
import {useStores} from '@/store';
import {useEffect} from 'react';
import {PopularItem, ShowingItem} from '../components';
import {Storage} from '@/library/modules';
import {constants} from '@/library/utils/constants';

export const Movies = observer(() => {
  const {moviesStore} = useStores();
  const [userName, setUserName] = useState('');

  const loadAsync = async () => {
    setUserName(
      (await Storage.getItemAsync(constants.isEmail))?.split('@')[0] || '',
    );
  };

  useEffect(() => {
    moviesStore.moviesService.popularList();
    loadAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%" padding="sm" height="100%" backgroundColor="black">
      <Box height="5%" flexDirection="row" justifyContent="space-between">
        <Text color="primary" fontSize={18}>
          Welcome Viewer
        </Text>
        <IconsIonicons icon="notifications-outline" size={24} />
      </Box>

      <Box height="40%">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text color="white" fontSize={18}>
            Now Showing
          </Text>
          <Button
            label="See More"
            onPress={() => {}}
            color="transparent"
            labelColor="white"
            width={100}
          />
        </Box>
        <FlatList
          data={moviesStore.popularList || []}
          horizontal
          renderItem={({item, index}) => (
            <ShowingItem item={item} index={index} />
          )}
          keyExtractor={item => String(item.id)}
        />
      </Box>
      <Box height="60%" padding="sm">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between">
          <Text color="white" fontSize={18}>
            Popular
          </Text>
          <Button
            label="See More"
            onPress={() => {}}
            color="transparent"
            labelColor="white"
            width={100}
          />
        </Box>

        <FlatList
          data={moviesStore.popularList || []}
          renderItem={({item, index}) => (
            <PopularItem item={item} index={index} />
          )}
          keyExtractor={item => String(item.id)}
        />
      </Box>
    </Box>
  );
});
