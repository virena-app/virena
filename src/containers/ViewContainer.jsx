import React, {Component} from 'react';
<<<<<<< HEAD
import * as actions from '../actions/actions';
import { generateImage } from '../utils/generateImage';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import PhoneContainer from './PhoneContainer.jsx';


export default class ViewContainer extends Component {
=======
import { HashRouter } from 'react-router-dom';
import PhoneContainer from './PhoneContainer.jsx';

class ViewContainer extends Component {
>>>>>>> master

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
<<<<<<< HEAD
}
=======
}

export default ViewContainer;
>>>>>>> master
