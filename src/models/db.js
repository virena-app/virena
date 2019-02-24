const Sequelize = require("sequelize");
export const db = new Sequelize(/*database here*/);

export const Project = db.define('projects', {
  treeData: Sequelize.JSONB,
  projectName: Sequelize.STRING,
  displayName: Sequelize.STRING,
  uid: Sequelize.STRING,
})
