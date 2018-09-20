import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

class ExportFilesButton extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {treeData, exportFiles} = this.props;
    return (
      <Button variant="contained" color="primary" 
      onClick={()=> {
        //open modal function
        this.props.exportFiles(this.props.treeData);
      }}>
        Export
      </Button>
    );
  }
}

export default ExportFilesButton;