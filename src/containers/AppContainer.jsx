import React, {Component} from 'react';
import TopNav from '../components/TopNav.jsx';
import ViewContainer from './ViewContainer.jsx';
import TreeContainer from './TreeContainer.jsx';
import PanelContainer from './PanelContainer.jsx';
const { ipcRenderer } = require('electron');

export default class AppContainer extends Component {
  componentDidMount() {
    console.log('AppContainer Mounted!')
  }
  render() {
    console.log('AppContainer Rendered!');
    ipcRenderer.on('userLoggedIn', (event, loginData) => {
      console.log('Received login data', loginData);
    })
    return (
      <div>
        <TopNav />
        <div className='main'>
        <ViewContainer />
        <div className='vertical-line'></div>
        <TreeContainer />
        <div className='vertical-line'></div>
        <PanelContainer />
      </div>
      </div>
    )
  }
}
