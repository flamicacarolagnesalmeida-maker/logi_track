const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Create inventory model

const Inventory = sequelize.define("Inventory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    product_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    tableName: "inventory",
    timestamps: false
});

module.exports = Inventory;
