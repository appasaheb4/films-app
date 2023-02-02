import {
  service,
  ServiceResponse,
  endpoints,
} from '../../../core-services/rest-service';
import {client} from '@/core-services/graphql-service';
import {stores} from '@/store';
import {MOVIES_LIST, MOVIE_DETAILS} from './mutation';

export class MoviesService {
  popularList = () =>
    new Promise<any>((resolve, reject) => {
      try {
        service
          ?.get(
            `${endpoints.movies.popular}?api_key=1bd4b196208e259472d225ae1d3a5e33`,
          )
          .then(response => {
            console.log({response});
            stores.moviesStore.updatePopularList(response?.data);
            resolve(response?.data);
          })
          .catch(error => {
            reject(new ServiceResponse<any>(0, error.message, undefined));
          });
      } catch (error) {
        reject(error);
      }
    });

  listMovies = () =>
    new Promise<any>((resolve, reject) => {
      client
        .query({
          query: MOVIES_LIST,
        })
        .then((response: any) => {
          if (response.data?.allFilms?.films?.length > 0) {
            stores.moviesStore.updateMoviesList(response.data?.allFilms?.films);
            resolve(response.data?.allFilms?.films);
          }
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
  movieDetails = variables =>
    new Promise<any>((resolve, reject) => {
      client
        .query({
          query: MOVIE_DETAILS,
          variables,
        })
        .then((response: any) => {
          console.log({response});
          resolve(response.data?.film);
        })
        .catch(error =>
          reject(new ServiceResponse<any>(0, error.message, undefined)),
        );
    });
}
