/**
 * Get info for any child's parent and its order in the parent's children array
 * @param {object} node - The child node whose info we want to retrieve
 * @param {object} parent - The parent node where we start the traversal. Defaults to the ultimate parent.
 */
const getNthChildInfo = (node, parent = this.props.treeData[0] ) => {
  const { title } = node;
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i]
    if ((child.title) === title) return { parent, n: i + 1 }
    else if (child.children) return getNthChildInfo(child, node);
  }
}

export default getNthChildInfo