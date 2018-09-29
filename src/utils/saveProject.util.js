import { db, Project } from '../models/db.js';

const saveProject = (treeData) => {
  db
  .sync()
  .then(() => {
    console.log('Connection successfully made.');
  })
  .catch(err => {
    console.error('Error connecting to database', err);
  }).then(() => {
    return Project.create({
      json: treeData
    })
  }).catch(err => {
    console.log("ERROR THO")
  })
}

export default saveProject;