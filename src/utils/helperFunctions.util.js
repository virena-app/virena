//TODO: Rewrite some of these using map instead of unnecessary reduce (...What was I thinking 2 weeks ago?)

/**
 * Sanitizes user input to have valid jsx syntax
 * @param {string} title - The variable name label of the component/navigator
 */

export const pascalCase = title => title
  .replace(/[a-z]+/gi, word => word[0]
  .toUpperCase() + word.slice(1))
  .replace(/[-_\s\W]+/gi, '');

/**
 * Get info for any child's parent and its order in the parent's children array
 * @param {object} - The current state of the sortable tree
 */

export const maxDepth = treeData => {
  return treeData.reduce((max, node) => {
    if (node.children) max = Math.max(1 + maxDepth(node.children), max);
    return max;
  }, 1);
}

/**
 * Get all titles of simple screen components to generate simple screen templates
 * @param {treeData} treeData - The current state of the sortable tree
 */

export const getAllScreenTitles = treeData => {
  return treeData.reduce((screenTitles, node) => {
    if (node.subtitle === 'Simple Screen') return screenTitles.concat(node.title);
    else if (node.children) return screenTitles.concat(getAllScreenTitles(node.children));
    else return screenTitles;
  }, []);
}

/**
 * Returns an array of all parent objects (aka navigators)
 * @param {array} treeData - The current state of the sortable tree
 */

export const getAllParents = treeData => {
  return treeData.reduce((parents, node) => {
    return node.subtitle !== "Simple Screen" ? 
      parents.concat(node, getAllParents(node.children)) : 
      parents;
  }, []);
}

/**
 * Flattens the sortable tree state with children ids as 'foreign key' refs
 * @param {array} treeData - The current state of the sortable tree
 */

export const flattenTree = treeData => {
  return treeData.reduce((flattenedTree, node) => {
    return node.children ? 
      flattenedTree.concat({...node, children: node.children.map(child => child.id)}, flattenTree(node.children)) : 
      flattenedTree.concat(node);
  }, []);
}

/**
 * Gets only immediate children of parent/navigator to generate the navigator.js template
 * @param {array} treeData - The current state of the sortable tree
 * @param {object} parent - A parent node whose immediate children's titles we want
 */

export const getImmediateChildrenTitles = (parent, treeData) => {
  for (let i = 0; i < treeData.length; i++) {
    if (treeData[i].title === parent.title) {
      return treeData[i].children.map(child => child.title)
    }
    else if (treeData[i].children) return getImmediateChildrenTitles(parent, treeData[i].children)
  };
}

/**
 * Get info for any child's parent and its order in the parent's children array
 * @param {object} node - The child node whose info we want to retrieve
 * @param {object} parent - The parent node where we start the traversal. Defaults to sortable tree's entry point.
 */

export const getNthChildInfo = (node, parent) => {
  const { title } = node;
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i]
    if ((child.title) === title) return { parent, n: i + 1 }
    else if (child.children) return getNthChildInfo(node, child);
  };
}

/**
 * Determines whether user input for a given title is a duplicate of any other in the sortable tree.
 * @param {string} title - The variable name label of a component
 * @param {array} treeData - The current state of the sortable tree
 */

export const duplicateTitle = (title, treeData) => {
  return treeData.reduce((bool, node) => {
    if (node.title === title) bool = node.id;
    return node.children ? bool || duplicateTitle(title, node.children) : bool
  }, false)
}

/**
 * Makes a comparison between an old tree and a new tree with one newly added navigator/component
 * and returns the added node.
 * @param {array} oldTreeData - The variable name label of a component
 * @param {array} newTreeData - The current state of the sortable tree
 */

 //works but could use refactoring
export const findNewNode = (oldTreeData, newTreeData) => {
  let res;
  for (let i = 0; i < oldTreeData.length; i++) {
    const oldNode = oldTreeData[i];
    const newNode = newTreeData[i];
    if (oldNode.children && newNode.children && oldNode.children.length === newNode.children.length) res = findNewNode(oldNode.children, newNode.children)
    else if (!oldNode.children && newNode.children) res = newNode.children[0];
    else if (oldNode.children && newNode.children && oldNode.children.length !== newNode.children.length) res = newNode.children[newNode.children.length - 1]
    if (res) return res
  }
}

/**
 * Deletes a node by id from the sortable tree.
 * @param {array} treeData - The current state of the sortable tree
 * @param {number} id - The id of the to-be-deleted node
 */
 
export const deleteNode = (treeData, id) => {
  return treeData.reduce((newTree, node) => {
    if (node.id === id) {
      return newTree;
    }
    else if (node.id !== id && node.children && node.children.length) {
      return newTree.concat({
        ...node,
        children: deleteNode(node.children, id)
      })
    }
    else return newTree.concat(node)
  }, [])
}

/**
 * Adds a node as a child to a given parent
 * @param {array} treeData - The current state of the sortable tree
 * @param {number} id - The id of the to-be-deleted node
 */
 
export const addNode = (treeData, parentTitle, newNode) => {
  return treeData.reduce((newTree, node) => {
    if (node.title === parentTitle) {
      const copy = {...node};
      if (copy.children) copy.children.push(newNode)
      else copy.children = [newNode]
      return newTree.concat(copy)
    }
    else if (node.children) {
      return newTree.concat({
        ...node,
        children: addNode(node.children, parentTitle, newNode)
      })
    } else return newTree.concat(node)
  }, [])
}

/**
 * Updates a node's title and/or subtitle properties.
 * @param {array} treeData - The current state of the sortable tree
 * @param {string} title - The new title to update the node with
 * @param {array} subtitle - The new subtitle to update the node with
 * @param {string} selected - The node to be updated
 */

export const updateNode = (treeData, title, subtitle, headerStatus, selected) => {
  return treeData.reduce( (newTree, node) => {
    if (selected.id === node.id) {
      return newTree.concat({...node, title, subtitle, headerStatus});
    }
    else if (node.children) {
      return newTree.concat({...node, children: updateNode(node.children, title, subtitle, headerStatus, selected)})
    }
    else return newTree.concat(node)
  }, [])
}

export const getParent = (treeData, node) => {
  const {id} = node;
  for (let i = 0; i < treeData.length; i++) {
    if (treeData[i].children && treeData[i].children.find(child => child.id === id)) return treeData[i];
    else if (treeData[i].children) return getParent(treeData[i].children, node)
  }
}

export const nodeExists = (treeData, id) => {
  return treeData.reduce((bool, currentNode) => {
    if (currentNode.id === id) return true;
    else if (currentNode.children) return bool || nodeExists(currentNode.children, id);
    else return bool;
  }, false)
}

<<<<<<< HEAD
/**
 * @param {array} treeData - current state of the tree data
 */

export const immediateBottomTabChild = treeData => {
  return treeData.reduce((bool, currentNode) => {
    if (currentNode.children) {
      if (currentNode.subtitle === 'BottomTab' && currentNode.children[0].subtitle === 'BottomTab') return true;
      else immediateBottomTabChild(currentNode.children)
    }
    return bool;
  }, false)
}

export const getAllSwitchNavigators = treeData => {
  return treeData.reduce((switches, node) => {
    if (node.subtitle === 'Switch') return switches.concat(node);
    else if (node.children) return switches.concat(getAllSwitchNavigators(node.children));
    else return switches;
  }, []);
=======
export const findMaxId = (treeData) => {
  return treeData.reduce((max, node) => {
    return Math.max(node.children ? findMaxId(node.children) : -Infinity, node.id, max)
  }, -Infinity)
>>>>>>> master
}