import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import SubmitParentForm from '../components/SubmitParentForm.jsx';
import ExpandablePanel from '../components/ExpandablePanel.jsx';
import ExportFilesButton from '../components/ExportFilesButton.jsx';
import SaveProjectButton from '../components/SaveProjectButton.jsx';
import { withStyles } from '@material-ui/core/styles';
import StatusPopup from '../components/StatusPopup.jsx';
const { ipcRenderer } = require('electron');

const mapStateToProps = store => ({
  treeData: store.data.treeData,
  input: store.data.input,
  selectedComponent: store.data.selectedComponent,
  initialTypeSelection: store.data.initialTypeSelection,
  typeSelected: store.data.typeSelected,
  parentSelected: store.data.parentSelected,
  availableParents: store.data.availableParents,
  changeNameInput: store.data.changeNameInput,
  statusPopupOpen: store.data.statusPopupOpen,
  statusPopupErrorOpen: store.data.statusPopupErrorOpen,
  logoSpin: store.data.logoSpin,
  userLoggedIn: store.data.userLoggedIn,
  displayName: store.data.displayName,
  uid: store.data.uid,
})

const mapDispatchToProps = dispatch => ({
  setParentName: name => dispatch(actions.setParentName(name)),
  addParent: name => dispatch(actions.addParent(name)),
  selectType: selection => dispatch(actions.selectType(selection)),
  selectInitialType: selection => dispatch(actions.selectInitialType(selection)),
  selectParent: selection => dispatch(actions.selectParent(selection)),
  updateNameAndType: (name, type, key, path) => dispatch(actions.updateNameAndType(name, type, key, path)),
  setNameToChange: name => dispatch(actions.setNameToChange(name)),
  exportFiles: (treeData, dirPath) => dispatch(actions.exportFiles(treeData, dirPath)),
  selectComponent: (name, key, path) => dispatch(actions.selectComponent(name, key, path)),
  closeStatusPopup: () => dispatch(actions.closeStatusPopup()),
  saveProject: treeData => dispatch(actions.saveProject(treeData)),
  openDirectory: () => dispatch(actions.openDirectory()),
  toggleLogo: () => dispatch(actions.toggleLogo()),
  setUserData: (loginData) => dispatch(actions.setUserData(loginData))
})

const styles = theme => ({
  formControl: {
    display: 'flex',
    flexDirection: 'row',
  },
  textField: {
    background: '#2068c9',
    borderRadius: '5px',
    width: '120px'
  },
  input: {
    color: 'white',
  },
  selectType: {
    background: '#2068c9',
    marginLeft: '10px',
    borderRadius: '5px',
    width: '120px',
    fontSize: '13px',
    paddingLeft: '20px'
  },
  inputLabel: {
    color: 'white',
    zIndex: 999,
    marginLeft: '15px',
    fontSize: '12px',
  },
  addParentButton: {
    fontSize: '10px',
    marginLeft: '15px',
  },
  export: {
    background: 'white'
  }
})

class PanelContainer extends Component {
  componentDidMount() {
    const { exportFiles, treeData, setUserData } = this.props;
    console.log('PanelContainer componentDidMount');
    ipcRenderer.on('selectedDir', (event, dirPath) => {
      exportFiles(treeData, dirPath);
    })
    ipcRenderer.on('userLoggedIn', (event,loginData) => {
      console.log('Received login data in panelContainer', loginData);
      setUserData(loginData);
    })
    ipcRenderer.on('guestLoggedIn', (event, loginData) => {
      console.log('Received guest data', loginData);
    })
  }

  render() {
    const { treeData, input, classes, selectedComponent, initialTypeSelection, typeSelected, parentSelected, setParentName, addParent, logoSpin, toggleLogo, 
    availableParents, selectType, selectParent, updateNameAndType, changeNameInput, setNameToChange, selectComponent, selectInitialType, 
    statusPopupOpen, userLoggedIn, statusPopupErrorOpen, closeStatusPopup, saveProject, openDirectory } = this.props;
    let logoClass;
    if (logoSpin) logoClass = 'logo'
    else logoClass = 'logo paused'

    return (
      <div className='panel'>
        <div>
          <SubmitParentForm treeData={treeData} input={input} classes={classes} initialTypeSelection={initialTypeSelection}
           setParentName={setParentName} addParent={addParent} selectInitialType={selectInitialType}/>
          <ExpandablePanel treeData={treeData} selectedComponent={selectedComponent} typeSelected={typeSelected} parentSelected={parentSelected}
          availableParents={availableParents} selectType={selectType} selectParent={selectParent} updateNameAndType={updateNameAndType}
          changeNameInput={changeNameInput} setNameToChange={setNameToChange} selectComponent={selectComponent}/>
        </div>
        <div className='logo-wrapper'>
          <div className='horizontal-line'></div>
          <br/>
          <img src='./assets/virena-icon-white.png' className={logoClass} onClick={toggleLogo}></img>
          {userLoggedIn && <SaveProjectButton treeData={treeData} saveProject={saveProject}/>}
          <ExportFilesButton treeData={treeData} openDirectory={openDirectory} statusPopupOpen={statusPopupOpen} statusPopupErrorOpen={statusPopupErrorOpen} closeStatusPopup={closeStatusPopup}></ExportFilesButton>
        </div>
        <StatusPopup 
          statusPopupOpen={statusPopupOpen}
          statusPopupErrorOpen={statusPopupErrorOpen}
          closeStatusPopup={closeStatusPopup}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(PanelContainer));
