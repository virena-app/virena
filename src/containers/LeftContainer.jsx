import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ExpandablePanel from '../components/ExpandablePanel.jsx'
import '../visuals/styles.css';

const mapStateToProps = store => ({
  userInput: store.add.userInput
});

const mapDispatchToProps = dispatch => ({
  addUserInput: userInput => dispatch(actions.addUserInput(userInput)),
});
class LeftContainer extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    this.props.addUserInput(event.target.value)
  }

  handleAdd(event) {
    event.preventDefault();


  }

  render() {
    return (
      <div className='column left-container'>
        <form onSubmit={this.handleAdd}>
          <input 
            type='text' 
            placeholder='Add Component. . .' 
            onChange={this.handleChange}/>
          <button type='submit'>+</button>
        </form>
        <div>
          <ExpandablePanel />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);