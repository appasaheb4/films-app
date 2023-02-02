import {action, computed, makeObservable, observable} from 'mobx';
import {Users} from '../Models';
import {UsersService} from '../service';

export class UsersStore {
  usersList!: Users[];

  constructor() {
    this.usersList = [];

    makeObservable<UsersStore, any>(this, {
      usersList: observable,

      usersService: computed,
      updateUsersList: action,
    });
  }

  get usersService() {
    return new UsersService();
  }

  updateUsersList = (res: any) => {
    this.usersList = res.users.data;
  };

  filterUserList(res: any) {
    this.usersList = res.filterUsers.data;
  }
}
