import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { awsclient } from './client';
import theme from '../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={awsclient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {element}
    </ThemeProvider>
  </ApolloProvider>
);
