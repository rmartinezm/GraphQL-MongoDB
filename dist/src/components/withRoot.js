import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#c6f4fe',
      main: '#43dbfc',
      dark: '#3cc5e2',
      contrastText: '#000000',
    },
    secondary: {
      light: '#c6f4fe',
      main: '#43dbfc',
      dark: '#3cc5e2',
      contrastText: '#000000',
    },
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;