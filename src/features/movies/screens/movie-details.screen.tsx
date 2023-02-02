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
export const MovieDetails = observer((props: any) => {
  const {
    params: {id},
  }: any = props.route;
  const {moviesStore} = useStores();
  const [movideDetails, setMoviesDetails] = useState<any>();

  useEffect(() => {
    moviesStore.moviesService.movieDetails({filmId: id}).then(res => {
      console.log({res});
      setMoviesDetails(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%" padding="sm" height="100%" backgroundColor="white">
      <Box
        height="5%"
        flexDirection="row"
        flex={1}
        alignItems="center"
        justifyContent="center">
        <Text color="black" fontSize={18} textAlign="center">
          {movideDetails?.title}
        </Text>
      </Box>

      <Box height="90%">
        <Box
          padding="sm"
          borderRadius={10}
          borderColor="primary"
          borderWidth={2}>
          <Text>Title: {movideDetails?.title}</Text>
          <Text>Director: {movideDetails?.director}</Text>
          <Text>Created: {movideDetails?.created}</Text>
          <Text>ReleaseDate: {movideDetails?.releaseDate}</Text>
          <Text>OpeningCrawl : </Text>
          <Text marginLeft="xxl">{movideDetails?.openingCrawl}</Text>
          <Text>Producers{movideDetails?.producers?.join(', ')}</Text>
        </Box>
      </Box>
    </Box>
  );
});
