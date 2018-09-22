import { getAllScreenTitles, getImmediateChildrenTitles, flattenTree } from './helperFunctions.util'

/**
 * Master function which generates navigator.js file
 * @param {array} screens - The flattened version of the sortable tree state
 */
  
const generateNavigatorTemplate = treeData => {
  const flatTree = flattenTree(treeData);
  const simpleScreens = flatTree.filter( screen => screen.subtitle === 'Simple Screen');
  const navigators = flatTree.filter(components => components.children );
  return "import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';\n" +
  simpleScreens.map(screen => `import ${screen.title} from './${screen.title}.js'`).join('\n') + '\n\n' +
  navigators.map(navigator => {
    const childrenTitles = getImmediateChildrenTitles(navigator, treeData);
    return `export const ${navigator.title} = create${navigator.subtitle}Navigator({` + (childrenTitles.length ?
    childrenTitles.map(title => {
      return `${title}: { screen: ${title} }`
    }).join(', ') + '})' : '})')
  }).reverse().join('\n\n');

}

export default generateNavigatorTemplate