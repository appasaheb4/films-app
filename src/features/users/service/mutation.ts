import {gql} from '@apollo/client';

export const USER_LIST = gql`
  mutation ($input: UserInput!) {
    users(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data
    }
  }
`;

export const FILTER = gql`
  mutation ($input: UserInput!) {
    filterUsers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data
    }
  }
`;
