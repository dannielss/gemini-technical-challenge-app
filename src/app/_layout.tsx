import { Slot } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RootSiblingParent } from 'react-native-root-siblings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: `${process.env.EXPO_PUBLIC_API_URL}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function Layout() {
  return (
      <ApolloProvider client={client}>
        <RootSiblingParent>
          <Slot />
        </RootSiblingParent>
      </ApolloProvider>
  );
}