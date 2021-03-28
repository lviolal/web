import {ApolloClient} from 'apollo-client';
import fetch from 'isomorphic-fetch';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createHttpLink } from 'apollo-link-http';

const url = process.env.GATSBY_APP_SYNC_URL;
const region = process.env.GATSBY_APP_SYNC_REGION;
const auth = {
  type: process.env.GATSBY_APP_SYNC_AUTH_TYPE,
  apiKey: process.env.GATSBY_APP_SYNC_API_KEY
};
const link = ApolloLink.from([
   createAuthLink({ url, region, auth }), 
   createHttpLink({ uri: url })
])

export const awsclient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  fetch,
})
