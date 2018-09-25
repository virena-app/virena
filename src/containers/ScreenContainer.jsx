import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScreenDisplay from './ScreenDisplay.jsx';
import BottomTab from './BottomTab.jsx';
import Drawer from './Drawer.jsx'
import { withRouter } from 'react-router-dom';

const mapStateToProps = store => ({
  selectedComponent: store.data.selectedComponent,
  treeData: store.data.treeData,
})

const mapDispatchToProps = dispatch => ({})
class ScreenContainer extends Component {
  render() {
    const { selectedComponent, treeData } = this.props;
    return (
      <div className='screen-container'>
        <ScreenDisplay treeData={treeData} selected={selectedComponent}/>
        { selectedComponent.subtitle === 'Drawer'
          ? <Drawer treeData={treeData} selected={selectedComponent}/>
          : null
        }
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenContainer))
