import fs from 'fs';
import generateScreenTemplate, { getAllScreenTitles } from './generateScreenTemplates.util.js';
import generateNavigatorTemplate from './generateNavigatorTemplate.util.js';
import generateAppTemplate from './generateAppTemplate.util.js';

const exportFiles = (treeData, path) => {
  const screenTitles = getAllScreenTitles(treeData);
  const promises = [];
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
          return resolve();
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
        return resolve();
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
        return resolve();
      });
  });

  promises.push(navPromise);
  promises.push(appPromise);

  return Promise.all(promises);
};

export default exportFiles;