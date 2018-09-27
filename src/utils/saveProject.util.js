import db from '../models/db.js';

const saveProject = (treeData) => {
  const json = treeData;
  db.none('INSERT INTO project(name, json) VALUES($1, $2)', ["project name", json]);
}

export default saveProject;