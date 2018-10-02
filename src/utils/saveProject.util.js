import { db, Project } from '../models/db.js';

const saveProjectUtil = (treeData, projectName, uid, displayName) => {
  db
  .sync()
  .then(() => {
    
    Project.findAll({
      where: {
        projectName,
        uid
      }
    }).then( projects => {
      if (projects.length) {
        return Project.update(
          {treeData},
          {returning: true, where: {projectName, uid}}
        ).then(updatedRecord => console.log(updatedRecord[1][0].dataValues))
      } else {
        return Project.create({
          treeData,
          projectName,
          uid,
          displayName
        }).then(newRecord => console.log("CREATED!", newRecord.dataValues))
      }
    })

  }).catch(err => {
    console.log("Error saving to the database ", err)
  })
}

export default saveProjectUtil;