import {action, computed, makeObservable, observable} from 'mobx';
import {DebitCard} from '../Models';
import {DebitCardService} from '../Service';

export class DashboardStore {
  debitCard!: DebitCard;

  constructor() {
    this.debitCard = new DebitCard({});

    makeObservable<DashboardStore, any>(this, {
      debitCard: observable,

      debitCardService: computed,
      updateDebitCard: action,
    });
  }

  get debitCardService() {
    return new DebitCardService();
  }

  updateDebitCard = (info: DebitCard) => {
    this.debitCard = info;
  };
}
