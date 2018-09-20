import fs from 'fs';
//import { format } from 'prettier';
import generateScreenTemplate, { getAllScreenTitles } from './generateScreenTemplates.util.js';
import generateNavigatorTemplate from './generateNavigatorTemplate.util.js';

const exportFiles = (treeData, path) => {
  const screenTitles = getAllScreenTitles(treeData);
  console.log(Object.keys(fs))
  const promises = [];
  screenTitles.forEach((title) => {
    const newPromise = new Promise((resolve, reject) => {
      fs.writeFile(`${path}/${title}.jsx`,
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
    fs.writeFile(`${path}/navigator.jsx`, 
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

  promises.push(navPromise);



  return Promise.all(promises);
};

export default exportFiles;