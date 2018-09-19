/**
 * Required to generate the screen files
 * @param {array} sortableTree - The flattened version of the sortable tree state
 */
  
const getAllScreenTitles = sortableTree => {
  return sortableTree.reduce( (screenTitlesArr, comp ) => {
    if (comp.type === 'Screen') return screenTitlesArr.concat(comp.title);
    else if (comp.children) return screenTitlesArr.concat(getAllScreenTitles(comp.children));
    else return screenTitlesArr;
  }, []).map(title => title.replace(/\s+/g, ''))
}

/**
 * Master function which generates screen files
 * @param {string} screenTitle - The title property of a screen component
 */
  
const generateScreenTemplate = screenTitle => {
  return `
    import React, {Component} from 'react'

    class ${screenTitle} extends Component {
      render() {
        return (
          <div>This is ${screenTitle}!</div>
        )
      }
    }

    export default ${screenTitle}
  `
}

export default generateScreenTemplate;