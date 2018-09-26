import React, { Component } from 'react';
import PhoneScreen from '../components/PhoneScreen.jsx';
import BottomTab from '../components/BottomTab.jsx';
import Drawer from '../components/Drawer.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import Backdrop from '../components/Backdrop.jsx';

const mapStateToProps = store => ({
  treeData: store.data.treeData,
  selectedComponent: store.data.selectedComponent,
  drawerState: store.data.drawerState
})

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(actions.openDrawer()),
  closeDrawer: () => dispatch(actions.closeDrawer()),
  selectComponent: (name, subtitle, children, key, path) => dispatch(actions.selectComponent(name, subtitle, children, key, path)),
})

class PhoneContainer extends Component {
  render() {
    const { treeData, selectedComponent, drawerState, openDrawer, closeDrawer, selectComponent } = this.props;
    let backdrop;
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