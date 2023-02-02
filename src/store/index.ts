import React from 'react';
import {Store} from './store';
import {AccountStore} from '@/features/auth/stores';
import {UsersStore} from '@/features/users/store';
import {DashboardStore} from '@/features/dashboard/store';
import {MoviesStore} from '@/features/movies/store';

export class Stores extends Store {
  accountStore!: AccountStore;
  usersStore!: UsersStore;
  dashboardStore!: DashboardStore;
  moviesStore!: MoviesStore;

  constructor() {
    super();
    this.accountStore = new AccountStore();
    this.usersStore = new UsersStore();
    this.dashboardStore = new DashboardStore();
    this.moviesStore = new MoviesStore();
  }
}

export const stores = new Stores();
export const StoresContext = React.createContext(stores);
export const useStores = () => React.useContext(StoresContext);
