import React, {Component} from 'react';
import ViewContainer from './ViewContainer.jsx';
import RightContainer from './RightContainer.jsx';
import LeftContainer from './LeftContainer.jsx';

export default class AppContainer extends Component {
  render() {
    return (
      <div className='main'>
        <ViewContainer />
        <LeftContainer />
        <RightContainer />
      </div>
    )
  }
}
