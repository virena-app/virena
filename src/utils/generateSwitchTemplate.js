import { getAllSwitches } from './helperFunctions.util.js';

const generateSwitchTemplate = (title, i, children) => {
    children.title.map
  
    return `
  import React, {Component} from 'react'
  import { StyleSheet, Text, View } from 'react-native';
  
  class ${screenTitle} extends Component {
    
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>This is ${screenTitle}!</Text>
          <Button onClick={this.navigation.navigate(${child.title})}></Button>
        </View>
      )
    }
  }
  
  export default ${screenTitle}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 40,
      fontWeight: 'bold',
    }
  });
    `
  }
  
  export default generateSwitchTemplate;