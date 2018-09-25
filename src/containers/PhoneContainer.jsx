import React, { Component } from 'react';
import PhoneScreen from '../components/PhoneScreen.jsx';
import BottomTab from '../components/BottomTab.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  treeData: store.data.treeData,
  selectedComponent: store.data.selectedComponent,
})

const mapDispatchToProps = dispatch => ({

})

class PhoneContainer extends Component {
  render() {
    const navigator = () => this.props.selectedComponent.subtitle === 'BottomTab'? <BottomTab selectedComponent={this.props.selectedComponent} />: console.log('drawer');
    return (
      <div className='screen-view'>
        <PhoneScreen treeData={this.props.treeData} selectedComponent={this.props.selectedComponent}/>
        {navigator()}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PhoneContainer));