import React, {Component} from 'react';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  selectedComponent: store.add.selectedComponent,
})

const mapDispatchToProps = dispatch => ({})
export default class ViewContainer extends Component {
  render() {
    const image = `../assets/${this.props.selectedComponent}`;
    return (
      <div className='view'>
        {/* <img id='iphone' src='../assets/iphonex.png'></img> */}
        <img id='iphone' src={image}></img>
      </div>
    )
  }
}