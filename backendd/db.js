const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "logitrack_db",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql"
    }
);

module.exports = sequelize;