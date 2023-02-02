import {client, ServiceResponse} from '@/core-services/graphql-service';
import {
  UserService,
  GENERATEOTP,
  VERIFYOTP,
} from '@/lp-core-service/settings/users';

export class AuthService {
  userService = new UserService(client, 'new', 'new');
  onGenerateOtp = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({variables});
      client
        .mutate({
          mutation: GENERATEOTP,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  onVerifyOtp = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client
        .mutate({
          mutation: VERIFYOTP,
          variables,
        })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
