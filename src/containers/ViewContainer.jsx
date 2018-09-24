import React, {Component} from 'react';
// import * as actions from '../actions/actions';
import { populateImg } from '../utils/populateImg';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import PhoneContainer from './PhoneContainer.jsx';

const mapStateToProps = store => ({
  selectedComponent: store.data.selectedComponent,
  treeData: store.data.treeData,
})

const mapDispatchToProps = dispatch => ({})
class ViewContainer extends Component {

  render() {
    let image = '../assets/';
    const selected = this.props.selectedComponent;
    image = populateImg(image, selected, this.props.treeData);
    console.log(`image here ${image}`);
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);