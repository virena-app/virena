import { getAllScreenTitles, getImmediateChildrenTitles, getAllParents, getParent, immediateBottomTabChild } from './helperFunctions.util'

/**
 * Master function which generates navigator.js file
 * @param {array} screens - The flattened version of the sortable tree state
 */
  
const generateNavigatorTemplate = treeData => {
  console.log('is there a immediate bottom child ', immediateBottomTabChild(treeData));
  const screenTitles = getAllScreenTitles(treeData);
  const navigators = getAllParents(treeData);
  let twoBottomNavs = 0;
  navigators.forEach(nav => {
    if(!nav.children) return new Error;
  })
  return "import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';\n" +
  screenTitles.map(title => `import ${title} from './${title}.js'`).join('\n') + '\n\n' +
  navigators.map(navigator => {
    const childrenTitles = navigator.children.map(child => child.title)
    console.log('childrenTitles of'+ navigator.title +'inside gennavTemplate', navigator.children)
    let navigation = `export const ${navigator.title} = create${navigator.subtitle}Navigator({` + (childrenTitles.length ?
    childrenTitles.map(title => {
      return `${title}: { screen: ${title} }`
    }).join(', ') + '})' : '})')

    if (navigator.subtitle === 'BottomTab') {
      twoBottomNavs++;
      if (twoBottomNavs >= 2) {
        navigation = `${navigation} \n${navigator.title}.navigationOptions = ({navigation}) => { let tabBarVisible = true; if(navigation.state.index >= 0) tabBarVisible = false; return { tabBarVisible } }`
      }
    }

    return navigation;

  }).reverse().join('\n\n');
}

export default generateNavigatorTemplate