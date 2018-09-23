import React, {Component} from 'react';
// import * as actions from '../actions/actions';
import { generateImage } from '../utils/generateImage';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  selectedComponent: store.data.selectedComponent,
  treeData: store.data.treeData,
})

const mapDispatchToProps = dispatch => ({})
class ViewContainer extends Component {

  render() {
    let image = '../assets/';
    const selected = this.props.selectedComponent;
    image = generateImage(image, selected, this.props.treeData);
    console.log(`image here ${image}`);
    return (
      <div className='view'>
        <img id='iphone' src={image}></img>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);