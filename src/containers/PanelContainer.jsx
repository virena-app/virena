import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import ExpandablePanel from '../components/ExpandablePanel.jsx';
import ExportFilesButton from '../components/ExportFilesButton.jsx';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import AlertModal from '../components/AlertModal.jsx'

const mapStateToProps = store => ({
  treeData: store.data.treeData,
  input: store.data.input,
  selectedComponent: store.data.selectedComponent,
  initialTypeSelection: store.data.initialTypeSelection,
  typeSelected: store.data.typeSelected,
  parentSelected: store.data.parentSelected,
  availableParents: store.data.availableParents,
  changeNameInput: store.data.changeNameInput,
  fileExportModalState: store.data.fileExportModalState,
})

const mapDispatchToProps = dispatch => ({
  setParentName: name => dispatch(actions.setParentName(name)),
  addParent: name => dispatch(actions.addParent(name)),
  selectType: selection => dispatch(actions.selectType(selection)),
  selectInitialType: selection => dispatch(actions.selectInitialType(selection)),
  selectParent: selection => dispatch(actions.selectParent(selection)),
  updateNameAndType: (name, type, key, path) => dispatch(actions.updateNameAndType(name, type, key, path)),
  setNameToChange: name => dispatch(actions.setNameToChange(name)),
  exportFiles: treeData => dispatch(actions.exportFiles(treeData)),
  selectComponent: (name, key, path) => dispatch(actions.selectComponent(name, key, path)),
  closeExportModal: (boolean) => dispatch(actions.closeExportModal(boolean)),
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
  render() {
    const { treeData, input, classes, selectedComponent, initialTypeSelection, typeSelected, parentSelected, setParentName, addParent, updateParentAndType,
    availableParents, selectType, selectParent, updateNameAndType, changeNameInput, setNameToChange, selectComponent, selectInitialType, exportFiles,
    fileExportModalState, closeExportModal } = this.props;
    return (
      <div className='panel'>
        <form className='form' autoComplete='off'>
          <InputLabel htmlFor='typeSelect'>Type</InputLabel>
          <FormControl className={classes.formControl}>
            <TextField
              InputProps={{
                className: classes.input
              }}
              label={<span style={{ color: 'white', fontSize: '13px', paddingLeft: '5px' }}>Name</span>}
              className={classes.textField}
              value={input}
              onChange={(e) => setParentName(e.target.value)}
              required={true}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              className={classes.selectType}
              value={initialTypeSelection}
              onChange={(event) => {
                const selection = event.target.value;
                selectInitialType(selection)
              }}
              inputProps={{
                name: 'type',
                id: 'typeSelect',
                className: classes.input,
              }}
            >
              <MenuItem value="" className={classes.menu}/>
              <MenuItem value={'Stack'} className={classes.menu}>Stack</MenuItem>
              <MenuItem value={'Drawer'} className={classes.menu}>Drawer</MenuItem>
              <MenuItem value={'BottomTab'} className={classes.menu}>BottomTab</MenuItem>
              <MenuItem value={'Switch'} className={classes.menu}>Switch</MenuItem>
              <MenuItem value={'Simple Screen'} className={classes.menu}>Screen</MenuItem>
            </Select>
            <Button type='submit' variant='contained' className={classes.addParentButton} onClick={(e) => {
              e.preventDefault();
              addParent();
            }}>
              Add
            </Button> 
          </FormControl>
        </form>
        <ExpandablePanel treeData={treeData} selectedComponent={selectedComponent} typeSelected={typeSelected} parentSelected={parentSelected}
        availableParents={availableParents} selectType={selectType} selectParent={selectParent} updateNameAndType={updateNameAndType}
        changeNameInput={changeNameInput} setNameToChange={setNameToChange} selectComponent={selectComponent}/>
        <ExportFilesButton treeData={treeData} exportFiles={exportFiles}></ExportFilesButton>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(PanelContainer));
