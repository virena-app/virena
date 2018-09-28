import React, { Component } from 'react';
import PhoneScreen from '../components/PhoneScreen.jsx';
import Switch from '../components/Switch.jsx';
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
  closeDrawer: () => dispatch(actions.closeDrawer()),
  selectComponent: node => dispatch(actions.selectComponent(node)),
})

class PhoneContainer extends Component {
  render() {
    let backdrop;
    const { selectedComponent, selectComponent, treeData, drawerState, openDrawer, closeDrawer } = this.props;
    if (drawerState) {
      backdrop = <Backdrop closeDrawer={closeDrawer}/>
    }

    const navigator = () => {
      if (selectedComponent.subtitle === 'BottomTab') {
        return (
          <div className='screen-view'>
            <PhoneScreen treeData={treeData} selectedComponent={selectedComponent}/>
            <BottomTab selectedComponent={selectedComponent} />
          </div>
        )
      } else if (selectedComponent.subtitle === 'Drawer') {
        return (
      <div className='screen-view'>
        <div className='drawer-wrapper'>
          <button onClick={openDrawer} className='toggle-btn'>Toggle Drawer</button>
          <Drawer selectedComponent={selectedComponent} drawerState={drawerState} selectComponent={selectComponent}/>
          {backdrop}
        </div>
        <PhoneScreen treeData={treeData} selectedComponent={selectedComponent}/>
      </div>
        )
      } else if (selectedComponent.subtitle === 'Simple Screen') {
          const parent = getParent(treeData, selectedComponent);
          return (
            <div className='screen-view'>
              <PhoneScreen 
                treeData={treeData} 
                selectedComponent={selectedComponent} 
                parent={
                  parent.subtitle === 'BottomTab' || parent.subtitle === 'Drawer'
                  ? parent
                  : null
                }
                selectComponent={selectComponent}
              />
              {
                parent.subtitle === 'BottomTab'
                ? <BottomTab selectedComponent={parent} />
                : null
              }
            </div>
          )
       } else if (selectedComponent.subtitle === 'Switch') {
          return (
            <div className='screen-view'>
              <PhoneScreen selectedComponent={selectedComponent} child={selectedComponent.children[0]} />
              <Switch selectedComponent={selectedComponent} selectComponent={selectComponent} child={selectedComponent.children[0]} />
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