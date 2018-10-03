import { db, Project } from '../models/db.js';

const saveProjectUtil = (treeData, projectName, uid, displayName) => {
  
  return db
  .sync()
  .then(() => {
    
    return Project.findAll({
      where: {
        projectName,
        uid
      }
    }).then(projects => {
      if (projects.length) {
        return Project.update(
          {treeData},
          {returning: true, where: {projectName, uid}}
        ).catch(err => {
          console.log('err in updating db', err);
          return err
        })
      } else {
        return Project.create({
          treeData,
          projectName,
          uid,
          displayName
        }).catch(err => {
          console.log('err in creating entry', err)
          return err
        })
      }
    }).catch(err => {
      console.log("Error saving to the database ", err)
      return err;
    })
  })

}

export default saveProjectUtil;