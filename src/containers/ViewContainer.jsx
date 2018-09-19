import React, {Component} from 'react';
// import * as actions from '../actions/actions';
import { populateImg } from '../utils/populateImg';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  selectedComponent: store.data.selectedComponent,
})

const mapDispatchToProps = dispatch => ({})
class ViewContainer extends Component {
  render() {
    let image = '../assets/';
    console.log('hi');
    const selected = this.props.selectedComponent;
    console.log('hi2');
    image = populateImg(image, selected);
    console.log(`image here ${image}`);
    return (
      <div className='view'>
        {/* <img id='iphone' src='../assets/iphonex.png'></img> */}
        <img id='iphone' src={image}></img>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);