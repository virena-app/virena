const Sequelize = require("sequelize");
export const db = new Sequelize('postgres://master:password@visualize-react-native.cdl88obocnjd.us-east-2.rds.amazonaws.com:5432/visualize_react_native', {dialect: 'postgres'});

export const Project = db.define('projects', {
  json: Sequelize.JSONB
})