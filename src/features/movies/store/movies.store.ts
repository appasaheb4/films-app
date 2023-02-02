import {action, computed, makeObservable, observable} from 'mobx';
import {Movies, Popular} from '../models';
import {MoviesService} from '../service';
import {Alert} from 'react-native';

export class MoviesStore {
  moviesList!: Movies[];
  popularList!: Popular[];

  constructor() {
    this.moviesList = [];
    this.popularList = [];

    makeObservable<MoviesStore, any>(this, {
      moviesList: observable,
      popularList: observable,

      moviesService: computed,
      updateMoviesList: action,
      updatePopularList: action,
    });
  }

  get moviesService() {
    return new MoviesService();
  }

  updateMoviesList = (res: any) => {
    if (res?.length === 0) {
      return Alert.alert('Facing issue.Please try again');
    }
    this.moviesList = res;
  };

  updatePopularList = (res: any) => {
    if (res.results?.length === 0) {
      return Alert.alert('Facing issue.Please try again');
    }
    this.popularList = res?.results;
  };
}
