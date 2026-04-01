import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

import Main from "./src/Main";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://10.0.2.2:5000/graphql",
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
