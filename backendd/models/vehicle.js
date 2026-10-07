const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Vehicle = sequelize.define("Vehicle", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    vehicle_number: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    vehicle_type: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    status: {
        type: DataTypes.STRING(50),
        defaultValue: "Available"
    }
}, {
    tableName: "vehicles",
    timestamps: false
});

module.exports = Vehicle;