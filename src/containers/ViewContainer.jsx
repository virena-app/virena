import React, {Component} from 'react';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  selectedComponent: store.add.selectedComponent,
})

const mapDispatchToProps = dispatch => ({})
export default class ViewContainer extends Component {
  render() {
    const image = '../assets/';
    const selected = this.props.selectedComponent;
    
    if(selected) {
      switch(selected.type) {
        case 'BottomTab':
          if(selected.children.length === 1) image += '1tab.png';
          if(selected.children.length === 2) image += '2tab.png';
          if(selected.children.length === 3) image += '3tab.png';
          if(selected.children.length === 4) image += '4tab.png';
          if(selected.children.length === 5) image += '5tab.png';
          break;
        case 'Drawer':
        if(selected.children.length === 1) image += '1drawer.png';
        if(selected.children.length === 2) image += '2drawer.png';
        if(selected.children.length === 3) image += '3drawer.png';
        if(selected.children.length === 4) image += '4drawer.png';
        if(selected.children.length === 5) image += '5drawer.png';
        break;
          break;
        case 'Simple Screen':
          break;
        case 'Stack':
          break;
        case 'Switch':
          break;
        default:
          image += 'defauilt.png'
      }

    }else {
      image += 'default.png';
    }

    return (
      <div className='view'>
        {/* <img id='iphone' src='../assets/iphonex.png'></img> */}
        <img id='iphone' src={image}></img>
      </div>
    )
  }
}