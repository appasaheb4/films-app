import React, {useState} from 'react';
import {Platform, UIManager} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Box, Text, Button, IconsIonicons} from '@/library/components';
import {useStores} from '@/store';
import {useEffect} from 'react';
import {PopularItem, ShowingItem} from '../components';
import {Storage} from '@/library/modules';
import {constants} from '@/library/utils/constants';
import {List, Divider} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface MoviesListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const MoviesList = observer((props: MoviesListProps) => {
  const {moviesStore} = useStores();
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    moviesStore.moviesService.listMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%" padding="sm" height="100%" backgroundColor="white">
      <Box height="5%" flexDirection="row" justifyContent="space-between">
        <Text color="black" fontSize={18}>
          Welcome Viewer
        </Text>
        <IconsIonicons icon="notifications-outline" color="black" size={24} />
      </Box>
      <ScrollView>
        <Box height="90%">
          <List.Section title="Movies">
            {moviesStore.moviesList?.map(item => (
              <List.Accordion
                title={
                  <>
                    <Text>{item.title}</Text>
                  </>
                }
                left={props => (
                  <>
                    <List.Icon {...props} icon="movie" />
                  </>
                )}
                right={props => (
                  <Box flexDirection={'row'}>
                    {props.isExpanded ? (
                      <List.Icon {...props} icon="chevron-up" />
                    ) : (
                      <List.Icon {...props} icon="chevron-down" />
                    )}
                  </Box>
                )}
                expanded={item.id === selectedId ? true : false}
                onPress={() => {
                  if (selectedId == item.id) {
                    setSelectedId('');
                  } else {
                    setSelectedId(item.id);
                  }
                }}>
                <Box alignSelf="flex-end" marginRight="m">
                  <Button
                    label="Details"
                    buttonSize={20}
                    width={60}
                    onPress={() => {
                      props.navigation.navigate('movies-details', {
                        id: item.id,
                      });
                      console.log({id: item.id});
                    }}
                  />
                </Box>
                {item.speciesConnection.species?.map((o: any) => (
                  <Box>
                    <List.Item title={'Name: ' + o.name} />
                    <List.Item title={'Classification: ' + o.classification} />
                    <Divider />
                  </Box>
                ))}
              </List.Accordion>
            ))}
          </List.Section>
        </Box>
      </ScrollView>
    </Box>
  );
});
