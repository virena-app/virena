import React, { Component } from 'react';
import PhoneScreen from '../components/PhoneScreen.jsx';
import Screen from '../components/Screen.jsx';
import BottomTab from '../components/BottomTab.jsx';
import Drawer from '../components/Drawer.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import Backdrop from '../components/Backdrop.jsx';
import { getParent } from '../utils/helperFunctions.util';

const mapStateToProps = store => ({
  treeData: store.data.treeData,
  selectedComponent: store.data.selectedComponent,
  drawerState: store.data.drawerState
})

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(actions.openDrawer()),
  closeDrawer: () => dispatch(actions.closeDrawer())
})

class PhoneContainer extends Component {
  render() {
    let backdrop;
    if (this.props.drawerState) {
      backdrop = <Backdrop closeDrawer={this.props.closeDrawer}/>
    }

    const navigator = () => {
      if (this.props.selectedComponent.subtitle === 'BottomTab') {
        console.log('i am here');
        return (
          <div className='screen-view'>
            <PhoneScreen treeData={this.props.treeData} selectedComponent={this.props.selectedComponent}/>
            <BottomTab selectedComponent={this.props.selectedComponent} />
          </div>
        )
      } else if (this.props.selectedComponent.subtitle === 'Drawer') {
        return (
          <div className='screen-view'>
            <div className='drawer-wrapper'>
              <button onClick={this.props.openDrawer} className='toggle-btn'>Toggle Drawer</button>
              <Drawer selectedComponent={this.props.selectedComponent} drawerState={this.props.drawerState}/>
              {backdrop}
            </div>
            <PhoneScreen treeData={this.props.treeData} selectedComponent={this.props.selectedComponent}/>
          </div>
        )
      } 
      else if(this.props.selectedComponent.subtitle === 'Simple Screen') {
        console.log(getParent(this.props.treeData, this.props.selectedComponent));
          return (
            <div className='screen-view'>
              <PhoneScreen 
                treeData={this.props.treeData} 
                selectedComponent={this.props.selectedComponent} 
                parent={getParent(this.props.treeData, this.props.selectedComponent)}/>
              <BottomTab selectedComponent={getParent(this.props.treeData, this.props.selectedComponent)} />
            </div>
          )
       }
      }

    return (
      <div className='screen-wrapper'>
        {navigator()}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PhoneContainer));