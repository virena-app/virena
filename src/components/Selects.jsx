import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

class Selects extends Component {
  render() {
    const { classes, treeData, typeSelected, parentSelected, availableParents, selectType, selectParent } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="typeSelect">Type</InputLabel>
          <Select
            native
            value={typeSelected}
            onChange={(event) => {
              const selection = event.target.value;
              selectType(selection)
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
            <option value={'Simple Screen'}>Screen</option>
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