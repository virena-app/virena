import { db, Project } from '../models/db.js';

const saveProjectUtil = (treeData, projectName, uid, displayName) => {
  db
  .sync()
  .then(() => {
    
    Project.findAll({
      where: {
        projectName
      }
    }).then( projects => {
      if (projects.length) {
        return Project.update(
          {treeData},
          {returning: true, where: {projectName}}
        ).then(updatedRecord => console.log("UPDATED!", updatedDoc))
      } else {
        return Project.create({
          treeData,
          projectName,
          uid,
          displayName
        }).then(newRecord => console.log("CREATED!", newRecord))
      }
    })

  }).catch(err => {
    console.log("Error saving to the database ", err)
  })
}

export default saveProjectUtil;