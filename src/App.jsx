import React, {Component} from 'react';
import AppContainer from './containers/AppContainer.jsx';
const { ipcRenderer } = require('electron');
export default class App extends Component {
  
  render() {
    console.log('App rendered!')
    ipcRenderer.on('userLoggedIn', (event,loginData) => {
      console.log('Received login data in App Render', loginData);
    })
    return (
      <AppContainer />
    )
  }
}