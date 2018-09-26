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
  return treeData.reduce((max, node) => {
    if (node.children) max = Math.max(1 + maxDepth(node.children), max);
    return max;
  }, 1);
}

export const duplicateTitle = (title, treeData) => {
  return treeData.reduce((bool, node) => {
    if (node.title === title) bool = node.id;
    return node.children ? bool || duplicateTitle(title, node.children) : bool
  }, false)
}

export const findNewNode = (oldTreeData, newTreeData, three) => {
  let res;
  //console.log("OLDTREEDATA", JSON.stringify(oldTreeData), "NEWTREEDATA", JSON.stringify(newTreeData))
  //console.log(newTreeData)
  for (let i = 0; i < oldTreeData.length; i++) {
    const oldNode = oldTreeData[i];
    const newNode = newTreeData[i];
    if (oldNode.children && newNode.children && oldNode.children.length === newNode.children.length) res = findNewNode(oldNode.children, newNode.children)
    else if (!oldNode.children && newNode.children) res = newNode.children[0];
    else if (oldNode.children && newNode.children && oldNode.children.length !== newNode.children.length) res = newNode.children[newNode.children.length - 1]
    //console.log(res)
    if (res) return res
  }
}
 
export const deleteNode = (tree, title) => {
  return tree.reduce((newTree, node) => {
    if (node.title === title) {
      return newTree;
    }
    else if (node.title !== title && node.children && node.children.length) {
      return newTree.concat({
        ...node,
        children: deleteNode(node.children, title)
      })
    }
    else return newTree.concat(node)
  }, [])
}
 
export const addNode = (tree, parentTitle, newNode) => {
  return tree.reduce((newTree, node) => {
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

export const updateNode = (treeData, title, subtitle, selected) => {
  return treeData.reduce( (newTree, node) => {
    if (selected.id === node.id) {
      return newTree.concat({...node, title, subtitle});
    }
    else if (node.children) {
      return newTree.concat({...node, children: updateNode(node.children, title, subtitle, selected)})
    }
    //newTree.concat(updateNode(node.children, title, selected))
    else return newTree.concat(node)
  }, [])
}
 
export const getParent = (tree, node) => {
  const {id} = node;
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].children && tree[i].children.find(child => child.id === id)) return tree[i];
    else if (tree[i].children) return getParent(tree[i].children, node)
  }
}