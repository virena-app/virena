import React, {Component} from 'react';
import PhoneContainer from './PhoneContainer.jsx';

class ViewContainer extends Component {
  render() {
    return (
      <div className='view'>
        <div className='inner-view'>
            <PhoneContainer />
        </div>
      </div>
    )
  }
}

export default ViewContainer;
