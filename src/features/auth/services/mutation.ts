import {gql} from '@apollo/client';

export const GENERATEOTP = gql`
  mutation ($input: LoginUserInput!) {
    generateOtpApp(input: $input) {
      success
      message
      data
    }
  }
`;

export const VERIFYOTP = gql`
  mutation ($input: LoginUserInput!) {
    verifyOtpApp(input: $input) {
      success
      message
      data
    }
  }
`;
