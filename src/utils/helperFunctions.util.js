export const pascalCase = title => title.replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1)).replace(/[-_\s\W]+/gi, '');

export const getAllScreenTitles = treeData => {
  console.log('treeData in getAllScreenTitles', treeData);
  return treeData.reduce((screenTitles, node) => {
    if (node.subtitle === 'Simple Screen') return screenTitles.concat(node.title);
    else if (node.children) return screenTitles.concat(getAllScreenTitles(node.children));
    else return screenTitles;
  }, []);
}

/**
 * Populates dropdown menu with all available parents to add a new child to
 * @param {array} treeData - The current state of the sortable tree
 */

export const getAllParents = treeData => {
  if (!treeData) {
    //logic to invoke ErrorSnackBar
    console.log('Navigators must have child screens/navigators!');
  }
  return treeData.reduce((parents, node) => {
    return node.subtitle !== "Simple Screen" ? parents.concat(node, getAllParents(node.children)) : parents
  }, []);
}

/**
 * Flattens the sortable tree / redux store state
 * @param {array} treeData - The current state of the sortable tree
 */

export const flattenTree = treeData => {
  return treeData.reduce((flattenedTree, node) => {
    return node.children ? flattenedTree.concat({...node, children: node.children.map(child => child.id)}, flattenTree(node.children)) : flattenedTree.concat(node)
  }, []);
}

/**
 * Required to generate the navigator.js file
 * @param {array} treeData - The current state of the sortable tree
 * @param {object} parent - A parent node whose immediate children's titles we want
 */


export const getImmediateChildrenTitles = (parent, treeData) => {
  console.log('treeData inside getImmediateChildrenTitles', treeData);
  for (let i = 0; i < treeData.length; i++) {
    if (treeData[i].title === parent.title) {
      console.log('inside first if for gict', )
      return treeData[i].children.map(child => child.title)
    }
    else if (treeData[i].children) return getImmediateChildrenTitles(parent, treeData[i].children)
  };
}

/**
 * Get info for any child's parent and its order in the parent's children array
 * @param {object} node - The child node whose info we want to retrieve
 * @param {object} parent - The parent node where we start the traversal. Defaults to the ultimate parent.
 */
export const getNthChildInfo = (node, parent) => {
  const { title } = node;
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i]
    if ((child.title) === title) return { parent, n: i + 1 }
    else if (child.children) return getNthChildInfo(node, child);
  };
}

export const maxDepth = treeData => {
  let depth = 1;
  return treeData.reduce((max, node) => {
    if (node.children) max = Math.max(depth + maxDepth(node.children), max);
    return max;
  }, 1);
}

export const duplicateTitle = (title, treeData) => {
  console.log('dupTitle treeData.length', treeData.length);
  if (!treeData.length) return true
  return treeData.reduce((bool, node) => {
    if (node.title === title) bool = true;
    return node.children ? bool || duplicateTitle(title, node.children) : bool
  }, false)
}