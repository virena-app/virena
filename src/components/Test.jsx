import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  test: store.example.test
})

const mapDispatchToProps = dispatch => ({
  handleChange: treeData => dispatch(actions.example(treeData))
})

class Test extends Component {
  render () {
    return (
      <div>
        <input type='text' onChange={(e) => this.props.handleChange(e.target.value)} value={this.props.test}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Test);