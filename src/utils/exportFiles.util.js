import fs from 'fs';
import { format } from 'prettier';
import generateScreenTemplate from './generateScreenTemplate.util.js';
import generateNavigatorTemplate from './generateNavigatorTemplate.util.js';
import generateAppTemplate from './generateAppTemplate.util.js';
import { getAllScreenTitles } from './helperFunctions.util.js'
import * as types from '../constants/actionTypes.js'

const exportFilesUtil = (treeData, path) => {
  console.log('treeData in exportFilesAction', treeData);
  path = '/Users/danielmatuszak/Desktop/Codesmith/TestRNVirena';
  path = '/home/sam/components';
  const screenTitles = getAllScreenTitles(treeData);
  const promises = [];
  let totalFiles = screenTitles.length;
  screenTitles.forEach((title) => {
    const newPromise = new Promise((resolve, reject) => {
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
        totalFiles++;
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
        totalFiles++
        return resolve('app');
      });
  });

  promises.push(navPromise);
  promises.push(appPromise);

  return Promise.all(promises)
};

export default exportFilesUtil;