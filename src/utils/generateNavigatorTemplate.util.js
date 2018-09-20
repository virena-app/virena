

/**
 * Populates dropdown menu with all available parents to add a new child to
 * @param {array} sortableTree - The current state of the sortable tree
 */

const getAllParents = sortableTree => {
  return sortableTree.reduce( (parentsArr, branch) => {
    return branch.type !== "Screen" ? parentsArr.concat(branch.title, getAllParents(branch.children)) : parentsArr
  }, []);
}

/**
 * Flattens the sortable tree / redux store state
 * @param {array} sortableTree - The current state of the sortable tree
 */

export const flattenTree = sortableTree => {
  return sortableTree.reduce((flattenedTree, comp) => {
    return comp.children ? flattenedTree.concat({...comp, children: comp.children.map(child => child.id)}, flattenTree(comp.children)) : flattenedTree.concat(comp)
  }, [])
}

/**
 * Required to generate the navigator.js file
 * @param {array} flatTree - The flattened version of the sortable tree state
 * @param {object} parent - A parent node whose immediate children's titles we want
 */

const getImmediateChildrenTitles = (flatTree, parent) => {
  return flatTree.filter(screen => {
    for (let i = 0; i < parent.children.length; i++) {
      if (screen.id === parent.children[i]) return true;
    }
    return false;
  }).map(child => child.title.replace(/\s+/g, ''));
}

/**
 * Master function which generates navigator.js file
 * @param {array} screens - The flattened version of the sortable tree state
 */
  
const generateNavigatorFile = treeData => {
  const flatTree = flattenTree(treeData);
  const simpleScreens = flatTree.filter( screen => screen.subtitle === 'Simple Screen');
  const unspace = title => title.replace(/\s+/g, '');
  const navigators = flatTree.filter(components => components.children );
  return "import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';\n" +
  simpleScreens.map(screen => `import ${screen.title} from './${screen.title}.js'`).join('\n') + '\n\n' +
  navigators.map(navigator => {
    const childrenTitles = getImmediateChildrenTitles(flatTree, navigator);
    return `export const ${unspace(navigator.title)} = create${navigator.subtitle}Navigator({` + (childrenTitles.length ?
    childrenTitles.map(title => {
      return `${title}: { screen: ${title} }`
    }).join(', ') + '})' : '})')
  }).reverse().join('\n\n');

}

export default generateNavigatorFile