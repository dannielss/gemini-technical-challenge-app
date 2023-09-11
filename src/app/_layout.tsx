import { Slot } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export default function Layout() {
  return (
      <ApolloProvider client={client}>
        <Slot />
      </ApolloProvider>
  );
}