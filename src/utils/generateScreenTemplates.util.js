/**
 * Required to generate the screen files
 * @param {array} sortableTree - The flattened version of the sortable tree state
 */
  
export const getAllScreenTitles = sortableTree => {
  return sortableTree.reduce( (screenTitlesArr, comp ) => {
    //console.log(comp.subtitle);
    if (comp.subtitle === 'Simple Screen') return screenTitlesArr.concat(comp.title);
    else if (comp.children) return screenTitlesArr.concat(getAllScreenTitles(comp.children));
    else return screenTitlesArr;
  }, []).map(title => title.replace(/\s+/g, ''))
}

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
        <Text>This is ${screenTitle}!</Text>
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
});
  `
}

export default generateScreenTemplate;