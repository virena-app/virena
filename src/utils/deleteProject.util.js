import { db, Project } from '../models/db.js';

const deleteProjectUtil = (projectName, uid) => {
  return db
  .sync()
  .then(() => {
    Project.destroy({
      where: {
        projectName,
        uid
      }
    })
  })
}

export default deleteProjectUtil;