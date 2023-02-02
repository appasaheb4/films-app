import {gql} from '@apollo/client';

export const MOVIES_LIST = gql`
  query {
    allFilms {
      films {
        id
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
          }
        }
      }
    }
  }
`;

export const MOVIE_DETAILS = gql`
  query Film($filmId: ID) {
    film(id: $filmId) {
      created
      director
      id
      producers
      releaseDate
      title
      openingCrawl
    }
  }
`;
