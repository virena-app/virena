import React, { Component } from 'react';
import PhoneScreen from '../components/PhoneScreen.jsx';
import Screen from '../components/Screen.jsx';
import Switch from '../components/Switch.jsx';
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
<<<<<<< HEAD
  selectComponent: (node) => dispatch(actions.selectComponent(node)),
=======
  selectComponent: (name, subtitle, children, key, path) => dispatch(actions.selectComponent(name, subtitle, children, key, path)),
>>>>>>> master
})

class PhoneContainer extends Component {
  render() {
    const { treeData, selectedComponent, drawerState, openDrawer, closeDrawer, selectComponent } = this.props;
    let backdrop;
<<<<<<< HEAD
    const { selectedComponent, selectComponent, treeData, drawerState, openDrawer, closeDrawer } = this.props;
=======
>>>>>>> master
    if (drawerState) {
      backdrop = <Backdrop closeDrawer={closeDrawer}/>
    }

    const navigator = () => {
<<<<<<< HEAD
      if (this.props.selectedComponent.subtitle === 'BottomTab') {
        console.log('i am here');
=======
      if (selectedComponent.subtitle === 'BottomTab') {
>>>>>>> master
        return (
          <div className='screen-view'>
            <PhoneScreen treeData={treeData} selectedComponent={selectedComponent}/>
            <BottomTab selectedComponent={selectedComponent} />
          </div>
        )
      } else if (selectedComponent.subtitle === 'Drawer') {
        return (
<<<<<<< HEAD
          <div className='screen-view'>
            <div className='drawer-wrapper'>
              <button onClick={openDrawer} className='toggle-btn'>Toggle Drawer</button>
              <Drawer selectedComponent={selectedComponent} drawerState={drawerState}/>
              {backdrop}
            </div>
            <PhoneScreen treeData={treeData} selectedComponent={selectedComponent}/>
          </div>
=======
      <div className='screen-view'>
        <div className='drawer-wrapper'>
          <button onClick={openDrawer} className='toggle-btn'>Toggle Drawer</button>
          <Drawer selectedComponent={selectedComponent} drawerState={drawerState} selectComponent={selectComponent}/>
          {backdrop}
        </div>
        <PhoneScreen treeData={treeData} selectedComponent={selectedComponent}/>
      </div>
>>>>>>> master
        )
      } else if (selectedComponent.subtitle === 'Simple Screen') {
        console.log(getParent(treeData, selectedComponent));
          return (
            <div className='screen-view'>
              <PhoneScreen 
                treeData={treeData} 
                selectedComponent={selectedComponent} 
                parent={getParent(treeData, selectedComponent)}/>
              <BottomTab selectedComponent={getParent(treeData, selectedComponent)} />
            </div>
          )
       } else if (selectedComponent.subtitle === 'Switch') {
          // from the switch, go to immediate child
          // should show 'login' screen
          // have a link to go to the immediate child
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