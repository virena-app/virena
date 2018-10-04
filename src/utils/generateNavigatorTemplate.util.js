import { getAllScreenTitles, getImmediateChildrenTitles, getAllParents } from './helperFunctions.util'

/**
 * Master function which generates navigator.js file
 * @param {array} screens - The flattened version of the sortable tree state
 */
  
const generateNavigatorTemplate = treeData => {
  const screenTitles = getAllScreenTitles(treeData);
  const navigators = getAllParents(treeData);
  navigators.forEach(nav => {
    if(!nav.children) return new Error;
  })
  return "import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';\n" +
  screenTitles.map(title => `import ${title} from './${title}.js'`).join('\n') + '\n\n' +
  navigators.map(navigator => {
    const childrenTitles = navigator.children.map(child => child.title)
    console.log('childrenTitles of'+ navigator.title +'inside gennavTemplate', navigator.children)
    return `export const ${navigator.title} = create${navigator.subtitle}Navigator({` + (childrenTitles.length ?
    childrenTitles.map(title => {
      return `${title}: { screen: ${title} }`
    }).join(', ') + '})' : '})')
  }).reverse().join('\n\n');
}

export default generateNavigatorTemplate