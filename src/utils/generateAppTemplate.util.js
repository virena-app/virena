const generateAppTemplate = treeData => {
  const RootComponent = treeData[0].title;
  return `
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ${RootComponent} } from './navigator.js';


export default class App extends React.Component {
  render() {
    return (
        <${RootComponent} />
    )
  }
}

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

export default generateAppTemplate