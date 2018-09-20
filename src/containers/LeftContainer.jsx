import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import ExpandablePanel from '../components/ExpandablePanel.jsx';

const mapStateToProps = store => ({
  treeData: store.data.treeData,
  input: store.data.input,
  selectedComponent: store.data.selectedComponent,
  typeSelected: store.data.typeSelected,
  parentSelected: store.data.parentSelected,
  availableParents: store.data.availableParents,
  changeNameInput: store.data.changeNameInput,
})

const mapDispatchToProps = dispatch => ({
  setParentName: name => dispatch(actions.setParentName(name)),
  addParent: name => dispatch(actions.addParent(name)),
  selectType: selection => dispatch(actions.selectType(selection)),
  selectInitialType: selection => dispatch(actions.selectInitialType(selection)),
  selectParent: selection => dispatch(actions.selectParent(selection)),
  updateNameAndType: (name, type, key, path) => dispatch(actions.updateNameAndType(name, type, key, path)),
  setNameToChange: name => dispatch(actions.setNameToChange(name)),
  selectComponent: (name, key, path) => dispatch(actions.selectComponent(name, key, path)),
})

class LeftContainer extends Component {
  render() {
    const { treeData, input, selectedComponent, typeSelected, parentSelected, setParentName, addParent, updateParentAndType,
    availableParents, selectType, selectParent, updateNameAndType, changeNameInput, setNameToChange, selectComponent, selectInitialType } = this.props;
    return (
      <div className='left'>
        <form className='parent-form' onSubmit={(e) => {
              e.preventDefault();
              addParent();
              console.log('avail', availableParents);
            }}>
          <input type='text' value={input} placeholder='Input component name...' onChange={(e) => setParentName(e.target.value)} required/>
          <select onChange={(e) => { 
            const selection = e.target.value;
            selectInitialType(selection)
          }}>
            <option value=''>Choose Type</option>
            <option value='Switch'>Switch</option>
            <option value='Stack'>Stack</option>
            <option value='Drawer'>Drawer</option>
            <option value='BottomTab'>BottomTab</option>
          </select>
          <input type='submit' value='Add Parent Component' />
        </form>
        <ExpandablePanel treeData={treeData} selectedComponent={selectedComponent} typeSelected={typeSelected} parentSelected={parentSelected}
        availableParents={availableParents} selectType={selectType} selectParent={selectParent} updateNameAndType={updateNameAndType}
        changeNameInput={changeNameInput} setNameToChange={setNameToChange} selectComponent={selectComponent}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LeftContainer);
