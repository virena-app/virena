import { getAllScreenTitles, getImmediateChildrenTitles, getAllParents, getParent, immediateBottomTabChild, getAllSwitchNavigators, getAllSwitches } from './helperFunctions.util'

/**
 * Master function which generates navigator.js file
 * @param {array} treeData - The current state of the sortable tree.
 */
  
 const generateNavigatorTemplate = treeData => {
  const screenTitles = getAllScreenTitles(treeData);
  const navigators = getAllParents(treeData);
  let twoBottomNavs = 0;
  for (let i = 0; i < navigators.length; i++) {
    if (!navigators[i].children || (navigators[i].children && !navigators[i].children.length)) return null;
  }
  return `import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';\n`
  + screenTitles.map(title => `import ${title} from './${title}.js'`).join('\n')
  + '\n'
  + (treeData[0].subtitle === "Switch"
  ? `import ${treeData[0].title} from './${treeData[0].title}.js'` + '\n\n' 
  : '\n')
  + navigators.map(navigator => {
    const childrenTitles = navigator.children.map(child => child.title);

    if (navigator.subtitle !== 'Switch') { 
      let navigation = `export const ${navigator.title} = create${navigator.subtitle}Navigator({` 
      + (childrenTitles.length 
      ? childrenTitles.map(title => {
        return `${title}: { screen: ${title} }`
      }).join(', ') + '})' 
      : '})')
      if (navigator.subtitle === 'BottomTab') {
        twoBottomNavs++;
        if(twoBottomNavs >= 2) {
          navigation = `${navigation} \n${navigator.title}.navigationOptions = ({navigation}) => { let tabBarVisible = true; if(navigation.state.index >= 0) tabBarVisible = false; return { tabBarVisible } }`
        }
      }
      return navigation;
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