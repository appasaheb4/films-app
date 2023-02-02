import {client, ServiceResponse} from '@/core-services/graphql-service';
import {USER_LIST, FILTER} from './mutation';
import {stores} from '@/store';

export class UsersService {
  userList = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = 'P'; // stores.accountStore.user && stores.accountStore.user.environment;
      const role = 'SYSADMIN'; // stores.accountStore.user && stores.accountStore.user.role;
      client
        .mutate({
          mutation: USER_LIST,
          variables: {
            input: {
              page,
              limit,
              env,
              role,
            },
          },
        })
        .then((response: any) => {
          stores.usersStore.updateUsersList(response.data);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });

  filter = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      stores.uploadLoadingFlag(false);
      client
        .mutate({
          mutation: FILTER,
          variables,
        })
        .then((response: any) => {
          if (!response.data.filterUsers.success) {
            return this.userList();
          }
          stores.usersStore.filterUserList(response.data);
          stores.uploadLoadingFlag(true);
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
