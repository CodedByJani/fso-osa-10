import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";
import Constants from "expo-constants";

import Main from "./src/Main";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const { apolloUri } = Constants.expoConfig.extra;

const authStorage = new AuthStorage();

const httpLink = new HttpLink({
  uri: apolloUri,
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const accessToken = await authStorage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  } catch (e) {
    console.log(e);
    return { headers };
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthStorageContext.Provider value={authStorage}>
        <Main />
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
