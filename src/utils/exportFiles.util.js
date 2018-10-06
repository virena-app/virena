import fs from 'fs';
// import { format } from 'prettier';
import generateScreenTemplate from './generateScreenTemplate.util.js';
import generateNavigatorTemplate from './generateNavigatorTemplate.util.js';
import generateAppTemplate from './generateAppTemplate.util.js';
import { getAllScreenTitles, immediateBottomTabChild } from './helperFunctions.util.js'
import * as types from '../constants/actionTypes.js'


const exportFilesUtil = (treeData, path) => {
  const screenTitles = getAllScreenTitles(treeData);
  const promises = [];
  screenTitles.forEach((title) => {
    const newPromise = new Promise((resolve, reject) => {
      if (immediateBottomTabChild(treeData)) {
        return reject(new Error('A BottomTabNav may NOT have a BottomTabNav as an immediate child'));
      }
      fs.writeFile(`${path}/${title}.js`,
        generateScreenTemplate(title), {
          singleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          jsxBracketSameLine: true,
          parser: 'babylon',
        },
        (err) => {
          if (err) return reject(err)
          return resolve(title);
        });
    });

    promises.push(newPromise);
  });

  const navPromise = new Promise((resolve, reject) => {
    fs.writeFile(`${path}/navigator.js`, 
      generateNavigatorTemplate(treeData), {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'babylon'
      },
      (err) => {
        if (err) return reject(err);
        return resolve('nav');
      });
  });

  const appPromise = new Promise((resolve, reject) => {
    fs.writeFile(`${path}/App.js`, 
      generateAppTemplate(treeData), {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'babylon'
      },
      (err) => {
        if (err) return reject(err);
        return resolve('app');
      });
  });

  promises.push(navPromise);
  promises.push(appPromise);

  return Promise.all(promises)
};

export default exportFilesUtil;