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

const mapStateToProps = store => ({})

const mapDispatchToProps = dispatch => ({

})

class NativeSelects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      name: 'hai',
      type: 'Component Type'
    };
  }

  handleChange (type) { 
    event => {
      console.log(event.target.value);
    this.setState({ [type]: event.target.value });
  }}

  render() {
    const { classes } = this.props;

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
          <InputLabel htmlFor="age-native-helper">Parent</InputLabel>
          <NativeSelect
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={<Input name="age" id="age-native-helper" />}
          >
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>
      </div>
    )
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NativeSelects));