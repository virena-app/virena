import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import App from './App.jsx'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'


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

// const Index = () => {
//   return (
//     <MuiThemeProvider theme={theme}>
//       <App />
//     </MuiThemeProvider>
//   )
// }

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)

if (module.hot) {
  console.log('hello')
  module.hot.accept();
}