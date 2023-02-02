import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {ThemeProvider} from '@shopify/restyle';
import {I18nextProvider} from 'react-i18next';
import FlashMessage from 'react-native-flash-message';
import i18next from '@/localization';
import {ErrorBoundary} from '@/library/modules';
import {theme} from '@/theme/theme';
import {NetworkIndicators} from '@/library/components';
import {ApolloProvider, client} from '@/core-services/graphql-service';
import {FullScreenProgress} from '@/library/components';
import {useStores} from '@/store';
import {Root} from './src/core-navigations';
import {configure} from 'mobx';
configure({
  enforceActions: 'never',
});

const App = observer(() => {
  const {loading, flagLoading, accountStore} = useStores();

  const backgroundStyle = {
    flex: 1,
  };

  useEffect(() => {
    accountStore.login();
  }, []);
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18next}>
            <View style={backgroundStyle}>
              <StatusBar
                animated
                barStyle="light-content"
                backgroundColor="#000000"
              />
              <Root />
              <NetworkIndicators />
              {loading && flagLoading ? <FullScreenProgress /> : null}
            </View>
            <FlashMessage />
          </I18nextProvider>
        </ThemeProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
});

export default App;
