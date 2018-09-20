// import fs from 'fs';

export const getAllScreenTitles = (treeData, screenTitles = []) => {
  treeData.forEach(component => {
    if (component.subtitle === 'screen') screenTitles.push(component.title)
    if (typeof component.children === 'object') return getAllScreenTitles(component.children, screenTitles)
  })
  return screenTitles;
}

export const getAllNavigators = (treeData, navigatorTitles = []) => {
  treeData.forEach(component => {
    if (component.subtitle !== 'screen') navigatorTitles.push(component.title)
    if (Array.isArray(component.children)) return getAllNavigators(component.children, navigatorTitles)
  })
  return navigatorTitles;
}

export const generateScreenComponents = () => {
  // fs.mkdir('./hello', () => console.log('error'));
  titles.forEach(element => {
    fs.writeFile('')
    `import React, { Component } from 'react';
  
     export default class ${element} extends Component {
       render() {
         return (
           <div>'This is ${element}</div>
         )
       }
     }
    `
  })
}