const generateSwitchTemplate = (title, children) => {

// alert(JSON.stringify(title));
alert(JSON.stringify(children));
  
  return `
import React, {Component} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';`
+ '\n\n'

+ `class ${title} extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is ${title}!</Text>`
+ '\n'
+      children.map(child => `        <Button title='${child.title}' onPress={() => navigate('${child.title}')}></Button>`).join('\n')
+ '\n'
+ `     </View>
    )
  }
}

export default ${title}

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