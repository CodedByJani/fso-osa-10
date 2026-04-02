import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import Constants from "expo-constants";

import Main from "./src/Main";

const { apolloUri } = Constants.expoConfig.extra;

const client = new ApolloClient({
  link: new HttpLink({
    uri: apolloUri,
  }),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}
