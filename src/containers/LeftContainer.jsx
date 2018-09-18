import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

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
        <p>LeftContainer</p>
        <form onSubmit={(e) => {
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
          <input type='submit' value='Add More' />
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LeftContainer);