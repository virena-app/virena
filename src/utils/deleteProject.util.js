import { db, Project } from '../models/db.js';

export default const deleteProjectUtil = (projectName, uid) => {
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