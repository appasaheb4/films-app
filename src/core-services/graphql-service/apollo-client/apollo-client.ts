import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {setContext} from '@apollo/client/link/context';
import {createUploadLink} from 'apollo-upload-client';
import {stores} from '@/store';
import {Alert} from 'react-native';
import {Storage} from '@/library/modules';
import {constants} from '@/library/utils/constants';

const customFetch = async (uri: string, options: any): Promise<any> => {
  stores.setLoading(true);
  const response = await fetch(uri, options).then(async (res: any) => {
    stores.setLoading(false);
    if (res.status >= 500) {
      return Promise.reject(res.status);
    }
    return res;
  });
  return response;
};

const authLink = setContext(async (_, {headers}) => {
  // const accessToken = await Storage.getItemAsyncWithDecryption(
  //   constants.accessToken,
  // );
  return {
    headers: {
      ...headers,
      user: 'gh.a2e7d167-f2fb-44b2-8bf8-ed9f7a4d1afd:yHsPOQHLObRG-amqQStLWQ',
      // authorization: user.user ? `Bearer ${user.user.token}` : '',
      // authorization: `Bearer ${accessToken}`,
    },
  };
});

const UploadLink = createUploadLink({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  fetch: customFetch,
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({message, locations, path, extensions}) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
      if (message && message === 'Unauthenticated.') {
        Alert.alert('You have logged in with another device');
      } else if (extensions && extensions.validation) {
        const firstMessageKey = Object.keys(extensions.validation)[0];
        if (firstMessageKey) {
          Alert.alert(`${extensions.validation[firstMessageKey][0]}`);
        }
      } else {
        Alert.alert('Something went wrong! Please try again.');
      }
    });
  }
  if (networkError) {
    stores.setLoading(false);
    console.log(`[Network error]: ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: authLink.concat(from([errorLink, UploadLink])),
  cache: new InMemoryCache(),
});
export {ApolloProvider};
