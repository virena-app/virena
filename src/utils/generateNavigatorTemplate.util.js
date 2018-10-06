import { getAllScreenTitles, getImmediateChildrenTitles, getAllParents, getAllSwitches } from './helperFunctions.util'

/**
 * Master function which generates navigator.js file
 * @param {array} screens - The flattened version of the sortable tree state
 */
  
const generateNavigatorTemplate = treeData => {
  const screenTitles = getAllScreenTitles(treeData);
  const navigators = getAllParents(treeData);
  const switches = getAllSwitches(treeData);
  // navigators.forEach(nav => {
  //   if(!nav.children) return new Error;
  // })
  return "import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';\n" +
  screenTitles.map(title => `import ${title} from './${title}.js'`).join('\n')
  + switches.map(node => `import ${node.title} from './${node.title}.js'`).join('\n')
  + '\n\n' 
  + navigators.map(navigator => {
    const childrenTitles = navigator.children.map(child => child.title);
    return navigator.subtitle !== 'Switch'
      ? `export const ${navigator.title} = create${navigator.subtitle}Navigator({` + (childrenTitles.length ?
      childrenTitles.map(title => {
        return `${title}: { screen: ${title} }`
      }).join(', ') + '})' : '})')
      : `export const ${navigator.title} = create${navigator.subtitle}Navigator({` + (childrenTitles.length ?
        childrenTitles.map(title => {
          return `${title}: { screen: ${title} }`
        }).join(', ') + '})' : '})')
  }).reverse().join('\n\n');
}

const generateNavigatorTemplate = treeData => {
  const screenTitles = getAllScreenTitles(treeData);
  const navigators = getAllParents(treeData);
  console.log(navigators)
  const switches = getAllSwitches(treeData);
  for (let i = 0; i < navigators.length; i++) {
    if (!navigators[i].children) return "ERROR";
  }
  let i =  switches.length + 1;
  return "import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';\n" +
  screenTitles.map(title => `import ${title} from './${title}.js'`).join('\n')
  + '\n'
  + switches.map(node => `import ${node.title} from './${node.title}.js'`).join('\n')
  + '\n\n' 
  + navigators.map(navigator => {
    const childrenTitles = navigator.children.map(child => child.title);
    if (navigator.subtitle !== 'Switch') {
      return `export const ${navigator.title} = create${navigator.subtitle}Navigator({` + (childrenTitles.length ?
      childrenTitles.map(title => {
        return `${title}: { screen: ${title} }`
      }).join(', ') + '})' : '})')
    } else {
       i--
      return `export const Switch${i} = createSwitchNavigator({${navigator.title}: ${navigator.title}, ` 
      + (childrenTitles.length ?
        childrenTitles.map(title => {
          return `${title}: { screen: ${title} }`
        }).join(', ') + '})' : '})')
    }

  }).reverse().join('\n\n');
}

export default generateNavigatorTemplate