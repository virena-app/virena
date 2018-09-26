import React, {Component} from 'react';
import { HashRouter } from 'react-router-dom';
import PhoneContainer from './PhoneContainer.jsx';

class ViewContainer extends Component {

  render() {
    return (
      <div className='view'>
        <div className='inner-view'>
            <HashRouter>
              <PhoneContainer />
            </HashRouter>
        </div>
      </div>
    )
  }
}

export default ViewContainer;