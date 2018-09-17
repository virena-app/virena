import React, { Component } from 'react';
import AppContainer from './containers/AppContainer.jsx'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import './visuals/style.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#699E98',
      main: '#236A62',
      dark: '#00352F',
      contrastText: "#F4F4F4",
    },
    secondary: {
      light: "#FFCDA9",
      main: "#AB6938",
      dark: "#562500",
      contrastText: "#F4F4F4",
    },
    error: {
      light: "#FFA9A9",
      main: "#AB3838",
      dark: "#560000",
      contrastText: "#F4F4F4",
    },
  },
});

export default class App extends Component {
  
  render() {
    return (
      // <MuiThemeProvider theme={theme}>
      <div>
        <AppContainer />
      </div>
      // </MuiThemeProvider>
    ) 
  }
}