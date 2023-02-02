import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import {User, Login} from '../models';
import {AuthService} from '../services';
import {Storage} from '@/library/modules';
import {constants} from '@/library/utils/constants';

export class AccountStore {
  isLoggedIn = false;
  user!: User;
  inputLogin!: Login;
  loginParams!: Login;
  rememberMe: boolean;

  constructor() {
    this.user = new User({});
    this.loginParams = new Login({});
    this.inputLogin = new Login({});
    this.rememberMe = false;

    makeObservable<AccountStore, any>(this, {
      isLoggedIn: observable,
      user: observable,
      rememberMe: observable,
      inputLogin: observable,
      loginParams: observable,

      authService: computed,
      updateUser: action,
      updateRememberMe: action,
      login: action,
      updateInputUser: action,
      updateLoginParams: action,
    });
  }

  get authService() {
    return new AuthService();
  }

  updateInputUser(user: Login) {
    this.inputLogin = user;
  }

  clearInputUser() {
    this.inputLogin = new Login({});
  }

  updateUser = (user: Partial<User>) => {
    this.user = new User({...user});
  };

  updateRememberMe = (rememberMe: boolean) => {
    this.rememberMe = rememberMe;
  };

  async login() {
    // const isMobileNo = await Storage.existAsync(constants.isMobileNo);
    // const isAccessToken = await Storage.existAsync(constants.accessToken);
    const isEmail = await Storage.existAsync(constants.isEmail);
    if (isEmail) {
      runInAction(() => {
        this.isLoggedIn = true;
      });
    }
  }

  updateLoginParams(params: Login) {
    this.loginParams = params;
  }
}
export const accountStore = new AccountStore();
