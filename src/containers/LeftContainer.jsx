import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import Details from '../components/Details.jsx';
import ExpandablePanel from '../components/ExpandablePanel.jsx'


const mapStateToProps = store => ({
  treeData: store.data.treeData,
  input: store.data.input
})

const mapDispatchToProps = dispatch => ({
  setParentName: name => dispatch(actions.setParentName(name)),
  addParent: name => dispatch(actions.addParent(name))
})

class LeftContainer extends Component {
  render() {
    return (
      <div className='left'>
        <form className='parent-form' onSubmit={(e) => {
              e.preventDefault();
              this.props.addParent();
            }}>
          <input type='text' value={this.props.input} placeholder='Input component name...' onChange={(e) => this.props.setParentName(e.target.value)} required/>
          <select>
            <option value='Switch'>Switch</option>
            <option value='Stack'>Stack</option>
            <option value='Drawer'>Drawer</option>
            <option value='BottomTab'>BottomTab</option>
          </select>
          <input type='submit' value='Add Parent Component' />
        </form>
        <Details />
        {/* <ExpandablePanel /> */}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LeftContainer);
