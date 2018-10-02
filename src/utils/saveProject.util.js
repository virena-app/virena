import { db, Project } from '../models/db.js';

const saveProject = (treeData, displayName, uid) => {
  console.log('saving Project:', displayName, uid);
  db
  .sync()
  .then(() => {
    console.log('Connection successfully made.');
  })
  .catch(err => {
    console.error('Error connecting to database', err);
  }).then(() => {
    return Project.create({
      json: treeData,
      displayName,
      uid,
    })
  }).catch(err => {
    console.log("Error saving to the database ", err)
  })
}

export default saveProject;