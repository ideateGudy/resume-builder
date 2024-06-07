const config = require('../config/database');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
  
  async function syncDatabase() {
    try {
      await sequelize.sync({ alter: true });
      console.log("Database has been synced successfully.");
    } catch (error) {
      console.error("Unable to sync the database:", error);
    }
  }
  
  testConnection();
  syncDatabase();
  module.exports = { sequelize, DataTypes };