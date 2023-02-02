import {action, computed, makeObservable, observable} from 'mobx';
import {Banner} from '../Models';
import {DashboardService} from '../service';
import {Alert} from 'react-native';

export class DashboardStore {
  bannerList!: Banner[];

  constructor() {
    this.bannerList = [];

    makeObservable<DashboardStore, any>(this, {
      bannerList: observable,

      dashboardService: computed,
      updateBannerList: action,
    });
  }

  get dashboardService() {
    return new DashboardService();
  }

  updateBannerList = (res: any) => {
    if (!res.bannersListAll.success) {
      return Alert.alert(res.bannersListAll.message);
    }
    this.bannerList = res.bannersListAll.data;
  };
}
