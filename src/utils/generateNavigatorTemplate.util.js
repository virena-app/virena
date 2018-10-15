import { getAllScreenTitles, getImmediateChildrenTitles, getAllParents, getParent, immediateBottomTabChild, getAllSwitchNavigators, getAllSwitches } from './helperFunctions.util'

/**
 * Master function which generates navigator.js file
 * @param {array} treeData - The current state of the sortable tree.
 */
  
// const generateNavigatorTemplate = treeData => {
//   console.log('is there a immediate bottom child ', immediateBottomTabChild(treeData));
//   const screenTitles = getAllScreenTitles(treeData);
//   const navigators = getAllParents(treeData);
//   const switches = getAllSwitches(treeData);
//   let twoBottomNavs = 0;
//   navigators.forEach(nav => {
//     if(!nav.children) return new Error;
//   })
//   return "import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';\n" +
//   screenTitles.map(title => `import ${title} from './${title}.js'`).join('\n') + '\n\n' +
//   navigators.map(navigator => {
//     const childrenTitles = navigator.children.map(child => child.title)
//     console.log('childrenTitles of'+ navigator.title +'inside gennavTemplate', navigator.children)
//     let navigation = `export const ${navigator.title} = create${navigator.subtitle}Navigator({` + (childrenTitles.length ?
//     childrenTitles.map(title => {
//       return `${title}: { screen: ${title} }`
//     }).join(', ') + '})' : '})')

//     if (navigator.subtitle === 'BottomTab') {
//       twoBottomNavs++;
//       if (twoBottomNavs >= 2) {
//         navigation = `${navigation} \n${navigator.title}.navigationOptions = ({navigation}) => { let tabBarVisible = true; if(navigation.state.index >= 0) tabBarVisible = false; return { tabBarVisible } }`
//       }
//     }

//     return navigation;
//   }).reverse().join('\n\n');
// }

const generateNavigatorTemplate = treeData => {
  const screenTitles = getAllScreenTitles(treeData);
  const navigators = getAllParents(treeData);
  for (let i = 0; i < navigators.length; i++) {
    if (!navigators[i].children) return "ERROR";
  }
  return `import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';\n`
  + screenTitles.map(title => `import ${title} from './${title}.js'`).join('\n')
  + '\n'
  + (treeData[0].subtitle === "Switch"
  ? `import ${treeData[0].title} from './${treeData[0].title}.js'` + '\n\n' 
  : '')
  + navigators.map(navigator => {
    const childrenTitles = navigator.children.map(child => child.title);
    if (navigator.subtitle !== 'Switch') {  
      return `export const ${navigator.title} = create${navigator.subtitle}Navigator({` 
      + (childrenTitles.length 
      ? childrenTitles.map(title => {
        return `${title}: { screen: ${title} }`
      }).join(', ') + '})' 
      : '})')
    } else { 
    return `export const RootSwitch = createSwitchNavigator({${navigator.title}: ${navigator.title}, ` 
    + (childrenTitles.length 
    ? childrenTitles.map(title => {
        return `${title}: { screen: ${title} }`
      }).join(', ') + '})' : '})')
    }
  }).reverse().join('\n\n');
}

export default generateNavigatorTemplate