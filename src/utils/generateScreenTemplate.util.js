
/**
 * Master function which generates screen files
 * @param {string} screenTitle - The title property of a screen component
 */
  
const generateScreenTemplate = screenTitle => {
  
  return `
import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native';

class ${screenTitle} extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is ${screenTitle}!</Text>
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

export default generateScreenTemplate;