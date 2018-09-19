import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Selects from './Selects.jsx'
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    background:'linear-gradient(45deg, #37474F 30%, #455A64 90%)',
    color: 'white',
    
  },

  expansion: {
    backgroundColor: 'black'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',

  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


//need to grab name of selected tree component and render to options panel
class DetailedExpansionPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    const { classes, selectedComponent, typeSelected, parentSelected, availableParents, selectType, selectParent, updateNameAndType,
      changeNameInput, setNameToChange } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel className={classes.expansion}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>
                {selectedComponent.length > 0? selectedComponent[0].title : 'Select a component'}
              </Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Options Panel</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              <Selects typeSelected={typeSelected} parentSelected={parentSelected} availableParents={availableParents} selectType={selectType} selectParent={selectParent} updateNameAndType={updateNameAndType}/>
            </div>
            
            <div className={classNames(classes.column, classes.helper)}>
              <TextField
                id="standard-with-placeholder"
                label="Change Component Name"
                placeholder="Change Name"
                className={classes.textField}
                margin="normal"
                onChange={(e) => setNameToChange(e.target.value)}
              />  
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary" 
            onClick={() => {
              updateNameAndType(changeNameInput, typeSelected, selectedComponent[0].key, selectedComponent[0].path)
              
            }}
            >
              Save
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedExpansionPanel);