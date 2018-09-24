import fs from 'fs';
import { format } from 'prettier';
import generateScreenTemplate from './generateScreenTemplate.util.js';
import generateNavigatorTemplate from './generateNavigatorTemplate.util.js';
import generateAppTemplate from './generateAppTemplate.util.js';
import { getAllScreenTitles } from './helperFunctions.util.js'

const exportFiles = (treeData, path) => {
  path = '/home/sam/components'
  const screenTitles = getAllScreenTitles(treeData);
  const promises = [];
  screenTitles.forEach((title) => {
    const newPromise = new Promise((resolve, reject) => {
      fs.writeFile(`${path}/${title}.js`,
        format(generateScreenTemplate(title)), {
          singleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          jsxBracketSameLine: true,
          parser: 'babylon',
        },
        (err) => {
          if (err) return reject(err)
          return resolve();
        });
    });

    promises.push(newPromise);
  });

  const navPromise = new Promise((resolve, reject) => {
    fs.writeFile(`${path}/navigator.js`, 
      format(generateNavigatorTemplate(treeData)), {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'babylon'
      },
      (err) => {
        if (err) return reject(err);
        return resolve();
      });
  });

  const appPromise = new Promise((resolve, reject) => {
    fs.writeFile(`${path}/App.js`, 
      format(generateAppTemplate(treeData)), {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'babylon'
      },
      (err) => {
        if (err) return reject(err);
        return resolve();
      });
  });

  promises.push(navPromise);
  promises.push(appPromise);

  return Promise.all(promises);
};

export default exportFiles;