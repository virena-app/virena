import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const mapStateToProps = store => ({
  treeData: store.data.treeData,
})

const mapDispatchToProps = dispatch => ({

})

class NativeSelects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: 'hai',
      type: 'Component Type',
      parentsArray: [],
    };
  }

  handleChange (type) { 
    event => {
      console.log(event.target.value);
    this.setState({ [type]: event.target.value });
  }}
  
  loadParentsDropdown () {
    let output = [];
    const getAllParents = (tree) => {
      tree.forEach( branch => {
        if (branch.type !== "screen") {
          output.push({title:branch.title, id: branch.id}) 
        }
        if (branch.children && branch.children.length > 0) {
          getAllParents(branch.children);
        }
      })
    }
    getAllParents(this.props.treeData);
    let results = output.map(titleObj => <option value={titleObj.title} key={titleObj.id}>{titleObj.title}</option>)
    return results;
  }

  render() {
    const { classes, treeData } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="typeSelect">Type</InputLabel>
          <Select
            native
            value={this.state.type}
            onChange={(event) => {
              const selection = event.target.value;
              this.setState({ type: selection });
            }}
            inputProps={{
              name: 'type',
              id: 'typeSelect',
            }}
          >
            <option value="" />
            <option value={'Stack'}>Stack</option>
            <option value={'Drawer'}>Drawer</option>
            <option value={'BottomTab'}>BottomTab</option>
            <option value={'Switch'}>Switch</option>
            <option value={'Simple Screen'}>Simple Screen</option>
          </Select>
          <FormHelperText>{'Current Type:' + this.state.type}</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="parentSelect">Parent</InputLabel>
          <NativeSelect
            value={this.state.parent}
            onChange={(event) => {
              const selection = event.target.value;
              this.setState({ parent: selection });
            }}
            input={<Input name="parent" id="parentSelect" />}
          >
            <option value="" />
            {this.loadParentsDropdown()}
          </NativeSelect>
        </FormControl>
      </div>
    )
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(NativeSelects));