import React, { Component } from 'react';
import PhoneScreen from '../components/PhoneScreen.jsx';
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
  drawerState: store.data.drawerState,
  screen: store.data.screen,
  phone: store.data.phone,
})

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(actions.openDrawer()),
  closeDrawer: () => dispatch(actions.closeDrawer()),
  selectComponent: node => dispatch(actions.selectComponent(node)),
})

class PhoneContainer extends Component {
  render() {
    let backdrop;
    
    const { 
      selectedComponent, 
      selectComponent, 
      treeData, 
      drawerState, 
      openDrawer, 
      closeDrawer, 
      screen, 
      phone,
    } = this.props;
    
    if (drawerState) {
      backdrop = <Backdrop closeDrawer={closeDrawer} />
    }

    const navigator = () => {
      if (!selectedComponent) {
        return (
          <div className={screen}></div>
        )
      }
      else if (selectedComponent.subtitle && selectedComponent.subtitle === 'BottomTab' ) {
        return (
          <div className={screen}>
            <PhoneScreen treeData={treeData} selectedComponent={selectedComponent} screen={screen} />
            <BottomTab selectedComponent={selectedComponent} selectComponent={selectComponent} phone={phone} />
          </div>
        )
        
      } else if (selectedComponent.subtitle && selectedComponent.subtitle === 'Drawer') {
        return (
          <div className={screen}>
            <div className='drawer-wrapper'>
              <button onClick={openDrawer} className='toggle-btn'>Toggle Drawer</button>
              <Drawer selectedComponent={selectedComponent} drawerState={drawerState} selectComponent={selectComponent} />
              {backdrop}
            </div>
            <PhoneScreen treeData={treeData} selectedComponent={selectedComponent} screen={screen} />
          </div>
        )
      } else if (selectedComponent.subtitle && selectedComponent.subtitle === 'Simple Screen') {
          // const parent = getParent(treeData, selectedComponent);
          return (
            // <div className={screen}>
              <div className={screen === 'iphone-screen' ? 'phone-screen column' : 'a-phone-screen column'}>
                <div>{selectedComponent.title}</div>
              </div>
            // </div>
          )
       } else if (selectedComponent.subtitle && selectedComponent.subtitle === 'Switch') {
          return (
            <div className={screen}>
              <Switch 
                selectedComponent={selectedComponent} 
                selectComponent={selectComponent} 
                child={selectedComponent.children ? selectedComponent.children : null}
                screen={screen} />
            </div>
          )
       } else if (selectedComponent.subtitle && selectedComponent.subtitle === 'Stack') {
          const screen = () => { 
            let screens = [];
            let selectedChild = selectedComponent.children ? selectedComponent.children[0] : null
            if (selectedChild && selectedChild.subtitle === 'BottomTab') {              
              screens.push(<PhoneScreen selectedComponent={selectedChild} screen={screen} />);
              screens.push(<BottomTab selectedComponent={selectedChild} phone={phone} />);
            } else if (selectedChild && selectedChild.subtitle === 'Drawer') {
                screens.push(<div className='drawer-wrapper'>
                              <button onClick={openDrawer} className='toggle-btn'>Toggle Drawer</button>
                              <Drawer selectedComponent={selectedChild} drawerState={drawerState} selectComponent={selectComponent} />
                              {backdrop}
                            </div>)
                screens.push(<PhoneScreen treeData={treeData} selectedComponent={selectedChild} screen={screen} />)
            }

            return screens;
          }
          return (
            <div className={screen}>
              {screen()}
            </div>
          )
       }
    }

    return (
      <div className={phone === 'iphone-view' ? 'screen-wrapper' : null}>
        {navigator()}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (PhoneContainer));