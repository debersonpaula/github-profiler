import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import GithubProfilerApp from './apps/GithubProfilerApp';

const theme = createMuiTheme({});

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GithubProfilerApp />
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}
