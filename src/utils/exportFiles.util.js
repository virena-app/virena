import fs from 'fs';
// import { format } from 'prettier';
import generateScreenTemplate from './generateScreenTemplate.util.js';
import generateNavigatorTemplate from './generateNavigatorTemplate.util.js';
import generateAppTemplate from './generateAppTemplate.util.js';
import generateSwitchTemplate from './generateSwitchTemplate.util.js'
import { getAllScreenTitles } from './helperFunctions.util.js'

const exportFilesUtil = (treeData, path) => {
  const screenTitles = getAllScreenTitles(treeData);
  const rootSwitch = treeData[0].subtitle === 'Switch' ? treeData[0] : null;
  const promises = [];

  const screenPromises = () => {
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
            if (err) return reject(err);
            return resolve(title);
          });
      });  
      promises.push(newPromise);
    });
  } 

  const appPromise = () => {
    promises.push(new Promise((resolve, reject) => {
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
    }));
  }

  const switchPromise = () => {
    if (rootSwitch) {
      promises.push(new Promise((resolve, reject) => {
        fs.writeFile(`${path}/${rootSwitch.title}.js`, 
          generateSwitchTemplate(rootSwitch.title, rootSwitch.children), {
            singleQuote: true,
            trailingComma: 'es5',
            bracketSpacing: true,
            jsxBracketSameLine: true,
            parser: 'babylon'
          },
          (err) => {
            if (err) return reject(err);
            return resolve(rootSwitch);
          });
      }))
    }
  }

  const navPromise = () => {
    return new Promise((resolve, reject) => {
      const navigatorTemplate = generateNavigatorTemplate(treeData);
      if  (navigatorTemplate === null) {
        return reject(new Error("Error in exporting files: All navigator components MUST have children"))
      }
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
    })
  }

  return navPromise().then(() => {
    appPromise();
    switchPromise();
    screenPromises();
    return Promise.all(promises);
  })
};

export default exportFilesUtil;