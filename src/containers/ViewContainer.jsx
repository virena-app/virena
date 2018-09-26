import React, {Component} from 'react';
import * as actions from '../actions/actions';
import { generateImage } from '../utils/generateImage';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import PhoneContainer from './PhoneContainer.jsx';


export default class ViewContainer extends Component {

  render() {
    // let image = '../assets/';
    // const selected = this.props.selectedComponent;
    // image = populateImg(image, selected, this.props.treeData);
    // console.log(`image here ${image}`);
    return (
      <div className='view'>
        <div className='inner-view'>
            <HashRouter>
              <PhoneContainer />
            </HashRouter>
        </div>
        {/* <img id='iphone' src={image}></img> */}
      </div>
    )
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);