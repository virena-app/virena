export const pascalCase = title => title.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join('')

export const getAllScreenTitles = treeData => {
  return treeData.reduce((screenTitles, node) => {
    if (node.subtitle === 'Simple Screen') return screenTitles.concat(node.title);
    else if (node.children) return screenTitles.concat(getAllScreenTitles(node.children));
    else return screenTitles;
  }, [])
}

/**
 * Populates dropdown menu with all available parents to add a new child to
 * @param {array} treeData - The current state of the sortable tree
 */

export const getAllParents = treeData => {
  return sortableTree.reduce((parents, node) => {
    return node.subtitle !== "Screen" ? parents.concat(node.title, getAllParents(node.children)) : parents
  }, []);
}

/**
 * Flattens the sortable tree / redux store state
 * @param {array} treeData - The current state of the sortable tree
 */

export const flattenTree = treeData => {
  return treeData.reduce((flattenedTree, node) => {
    return node.children ? flattenedTree.concat({...node, children: node.children.map(child => child.id)}, flattenTree(node.children)) : flattenedTree.concat(node)
  }, [])
}

/**
 * Required to generate the navigator.js file
 * @param {array} treeData - The current state of the sortable tree
 * @param {object} parent - A parent node whose immediate children's titles we want
 */


export const getImmediateChildrenTitles = (parent, treeData) => {
  for (let i = 0; i < treeData.length; i++) {
    if (treeData[i].title === parent.title) {
      return treeData[i].children.map(child => child.title)
    }
    else if (treeData[i].children) return getImmediateChildrenTitles(parent, treeData[i].children)
  }
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
  }
}