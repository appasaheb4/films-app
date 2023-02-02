import {client, ServiceResponse} from '@/core-services/graphql-service';
import {GET_BANNER_LIST_ALL} from './query';
import {stores} from '@/store';

export class DebitCardService {
  listAllBanner = () =>
    new Promise<any>((resolve, reject) => {
      client
        .query({
          query: GET_BANNER_LIST_ALL,
        })
        .then((response: any) => {
          stores.dashboardStore.updateBannerList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
