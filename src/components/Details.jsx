import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';

const style = theme => ({
  expansion: {
    color: 'black',
  },
  forms: {
    margin: theme.spacing.unit*2
  }
})

class Details extends Component {
  render() {
    const { classes } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
          Hello
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <FormControl className={classes.forms}>
            <InputLabel htmlFor="age-helper">Name</InputLabel>
            <Select value='value'>
                <MenuItem>One</MenuItem>
                <MenuItem>Two</MenuItem>
                <MenuItem>Three</MenuItem>
            </Select>
          </FormControl>
          <Divider />
          <FormControl className={classes.forms}>
            <InputLabel htmlFor="age-helper">Age</InputLabel>
            <Select value='value'>
                <MenuItem>One</MenuItem>
                <MenuItem>Two</MenuItem>
                <MenuItem>Three</MenuItem>
            </Select>
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

export default (withStyles(style)) (Details);
