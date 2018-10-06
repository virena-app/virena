import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


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
  input: {
    color: '#eee'
  },
  inputFocused: {}
});

class Selects extends Component {
  render() {
    const { classes, treeData, selectedComponent, typeSelected, parentSelected, availableParents, selectType, selectParent } = this.props;
    return (
      <div className={classes.root}>
        <FormControl required className={classes.formControl}>
          {/* <InputLabel 
            htmlFor="typeSelect"
            FormLabelClasses={{
              root: classes.input,
              focused: classes.inputFocused
            }}>
            Type
            </InputLabel> */}
          <Select
            required
            value={typeSelected}
            onChange={(event) => {
              const selection = event.target.value;
              selectType(selection)
            }}
            inputProps={{
              name: 'type',
              id: 'typeSelect',
              className: classes.input,
            }}>
            <MenuItem value=''/>
            <MenuItem value={'Stack'}>Stack</MenuItem>
            <MenuItem value={'Drawer'}>Drawer</MenuItem>
            <MenuItem value={'BottomTab'}>BottomTab</MenuItem>
            <MenuItem value={'Switch'}>Switch</MenuItem>
            <MenuItem value={'Simple Screen'}>Simple Screen</MenuItem>
          </Select>
          <FormHelperText>{'Current Type:' + typeSelected}</FormHelperText>
        </FormControl>
        {/* <FormControl className={classes.formControl}>
          <InputLabel htmlFor="parentSelect">Parent</InputLabel>
          <NativeSelect
            value={parentSelected}
            onChange={(event) => {
              const selection = event.target.value;
              selectParent(selection);
            }}
            input={<Input name="parent" id="parentSelect" />}
          >
            <option value="" />
            {availableParents}
          </NativeSelect>
        </FormControl> */}
      </div>
    )
  }
}

Selects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Selects);