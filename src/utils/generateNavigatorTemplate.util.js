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
 * @param {array} components - The flattened version of the sortable tree state
 * @param {object} parent - A parent node whose immediate children's titles we want
 */

const getImmediateChildrenTitles = (components, parent) => {
  return components.filter(screen => {
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
  const screens = flattenTree(treeData);
  const unspace = title => title.replace(/\s+/g, '');
  const navigators = screens.filter( screen => screen.children );
  return navigators.map(navigator => {
    console.log(navigator);
    const childrenTitles = getImmediateChildrenTitles(screens, navigator);
    return `const ${unspace(navigator.title)} = create${navigator.subtitle}Navigator({` + (childrenTitles.length ?
    childrenTitles.map(title => {
      return `${title}: { screen: ${title} }`
    }).join(', ') + '})' : '})')
  }).reverse().join('\n\n') + `\n\nexport default ${unspace(screens[0].title)}`;
}

export default generateNavigatorFile