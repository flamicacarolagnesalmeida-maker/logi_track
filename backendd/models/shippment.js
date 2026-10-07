//the shipment structure but javascrpt description 

const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Shipment = sequelize.define("Shipment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    customer_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    origin: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    destination: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    status: {
        type: DataTypes.STRING(50),
        defaultValue: "Pending"
    }
}, {
    tableName: "shipments",
    timestamps: false
});

module.exports = Shipment;