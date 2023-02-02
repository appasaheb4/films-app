import React, {useEffect} from 'react';
import {Image, FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Box, Text, IconsIonicons} from '@/library/components';
import {useStores} from '@/store';
import Swiper from 'react-native-swiper';
import _ from 'lodash';

export const Credit = observer(() => {
  const {
    dashboardStore,
    accountStore: {user},
  } = useStores();

  useEffect(() => {
    dashboardStore.dashboardService.listAllBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%" height="100%">
      <Box height="30%">
        <Swiper
          removeClippedSubviews={false}
          height={0}
          paginationStyle={{bottom: -15}}
          dotColor="#ffffff"
          dotStyle={{
            borderColor: '#000',
            borderWidth: 1,
            width: '5%',
          }}
          activeDotColor="#FEC84D"
          loop={true}
          autoplay={true}>
          {_.takeRight(dashboardStore.bannerList, 10).map((item, index) => (
            <Box key={index} position="relative">
              <Image
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                source={{
                  uri: item.image,
                }}
              />
            </Box>
          ))}
        </Swiper>
      </Box>
      <Box height="70%" padding="sm">
        <Text variant="h1" color="primary" textAlign="center" marginTop="l">
          {`Welcome ${user.userId}`}
        </Text>

        <FlatList
          data={[
            {_id: 1, title: 'Report', icon: 'receipt-outline'},
            {_id: 1, title: 'Lab', icon: 'library-outline'},
            {_id: 1, title: 'Department', icon: 'layers-outline'},
            {_id: 1, title: 'Role', icon: 'documents-outline'},
            {_id: 1, title: 'Analyte', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
            {_id: 1, title: 'Report', icon: 'documents-outline'},
          ]}
          renderItem={({item, index}) => (
            <Box
              key={index}
              borderRadius={10}
              padding="m"
              backgroundColor="primary"
              alignItems="center"
              margin="md"
              width={100}
              height={70}>
              <IconsIonicons icon={item.icon} color="black" size={20} />
              <Text variant="bodyTextSmall" color="black" numberOfLines={1}>
                {item.title}
              </Text>
            </Box>
          )}
          keyExtractor={item => String(item._id)}
          numColumns={3}
        />
      </Box>
    </Box>
  );
});
