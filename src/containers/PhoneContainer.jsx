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
      backdrop = <Backdrop closeDrawer={closeDrawer} />
    }

    const navigator = () => {
      if (!selectedComponent) {
        return (
          <div className='screen-view'></div>
        )
      }
      else if (selectedComponent.subtitle && selectedComponent.subtitle === 'BottomTab') {
        return (
          <div className='screen-view column'>
            <PhoneScreen treeData={treeData} selectedComponent={selectedComponent} />
            <BottomTab selectedComponent={selectedComponent} selectComponent={selectComponent} />
          </div>
        )
      } else if (selectedComponent.subtitle && selectedComponent.subtitle === 'Drawer') {
        return (
          <div className='screen-view column'>
            <div className='drawer-wrapper'>
              <button onClick={openDrawer} className='toggle-btn'>Toggle Drawer</button>
              <Drawer selectedComponent={selectedComponent} drawerState={drawerState} selectComponent={selectComponent} />
              {backdrop}
            </div>
            <PhoneScreen treeData={treeData} selectedComponent={selectedComponent} />
          </div>
        )
      } else if (selectedComponent.subtitle && selectedComponent.subtitle === 'Simple Screen') {
          // const parent = getParent(treeData, selectedComponent);
          return (
            <div className='screen-view column'>
              <div className='phone-screen column'>
                <div>{selectedComponent.title}</div>
              </div>
            </div>
          )
       } else if (selectedComponent.subtitle && selectedComponent.subtitle === 'Switch') {
          return (
            <div className='screen-view column'>
              <Switch 
                selectedComponent={selectedComponent} 
                selectComponent={selectComponent} 
                child={selectedComponent.children ? selectedComponent.children[0] : null} />
            </div>
          )
       } else if (selectedComponent.subtitle && selectedComponent.subtitle === 'Stack') {
          const screen = () => { 
            let screens = [];
            let selectedChild = selectedComponent.children[0]
            if (selectedChild.subtitle === 'BottomTab') {              
              screens.push(<PhoneScreen selectedComponent={selectedChild} />);
              screens.push(<BottomTab selectedComponent={selectedChild} />);
            } else if (selectedChild.subtitle === 'Drawer') {
                screens.push(<div className='drawer-wrapper'>
                              <button onClick={openDrawer} className='toggle-btn'>Toggle Drawer</button>
                              <Drawer selectedComponent={selectedChild} drawerState={drawerState} selectComponent={selectComponent} />
                              {backdrop}
                            </div>)
                screens.push(<PhoneScreen treeData={treeData} selectedComponent={selectedChild} />)
            }

            return screens;
          }
          return (
            <div className='screen-view column'>
              {screen()}
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