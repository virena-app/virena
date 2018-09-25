import React, {Component} from 'react';
import * as actions from '../actions/actions';
import { generateImage } from '../utils/generateImage';
import { connect } from 'react-redux';
import { HashRouter, withRouter } from 'react-router-dom';
import ScreenContainer from './ScreenContainer.jsx';


export default class ViewContainer extends Component {

  render() {
    // let image = '../assets/';
    // const { selectedComponent } = this.props.selectedComponent;
    // image = generateImage(image, selected, this.props.treeData);
    // console.log(`image here ${image}`);
    return (
      <div className='view'>
        <div id='iphone'>
          <HashRouter>
            <ScreenContainer />
          </HashRouter>
        </div>
        {/* <img id='iphone' src={image}></img> */}
      </div>
    )
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);