import React, {Component} from 'react';
import * as actions from '../actions/actions';
import { generateImage } from '../utils/generateImage';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import PhoneContainer from './PhoneContainer.jsx';


export default class ViewContainer extends Component {

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