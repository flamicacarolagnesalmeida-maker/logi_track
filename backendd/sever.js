const express = require("express");
const cors = require("cors");
const sequelize = require("./db");

const Shipment = require("./models/shippment");
const Vehicle = require("./models/vehicle");
const Inventory = require("./models/inventory");

const app = express();

app.use(cors());
app.use(express.json());







app.get("/", (req, res) => {
    res.send("LogiTrack Backend is running!");
});



// SHIPMENTS - CRUD

// GET all shipments
app.get("/shipments", async (req, res) => {
    try {
        const shipments = await Shipment.findAll();

        res.json(shipments);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch shipments"
        });
    }
});


// GET shipment by ID
app.get("/shipments/:id", async (req, res) => {
    try {
        const shipment = await Shipment.findByPk(req.params.id);

        if (!shipment) {
            return res.status(404).json({
                message: "Shipment does not exist"
            });
        }

        res.json(shipment);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch shipment"
        });
    }
});


// POST - create a new shipment
app.post("/shipments", async (req, res) => {
    try {
        const shipment = await Shipment.create(req.body);

        res.status(201).json(shipment);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create shipment"
        });
    }
});


// PUT - update shipment
app.put("/shipments/:id", async (req, res) => {
    try {
        const shipment = await Shipment.findByPk(req.params.id);

        if (!shipment) {
            return res.status(404).json({
                message: "Shipment does not exist"
            });
        }

        await shipment.update(req.body);

        res.json(shipment);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update shipment"
        });
    }
});


// DELETE - delete shipment
app.delete("/shipments/:id", async (req, res) => {
    try {
        const shipment = await Shipment.findByPk(req.params.id);

        if (!shipment) {
            return res.status(404).json({
                message: "Shipment does not exist"
            });
        }

        await shipment.destroy();

        res.json({
            message: "Shipment deleted successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to delete shipment"
        });
    }
});



// VEHICLES - CRUD


// GET all vehicles
app.get("/vehicles", async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();

        res.json(vehicles);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch vehicles"
        });
    }
});


// GET vehicle by ID
app.get("/vehicles/:id", async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle does not exist"
            });
        }

        res.json(vehicle);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch vehicle"
        });
    }
});


// POST - create a new vehicle
app.post("/vehicles", async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);

        res.status(201).json(vehicle);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create vehicle"
        });
    }
});


// PUT - update vehicle
app.put("/vehicles/:id", async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle does not exist"
            });
        }

        await vehicle.update(req.body);

        res.json(vehicle);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update vehicle"
        });
    }
});


// DELETE - delete vehicle
app.delete("/vehicles/:id", async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle does not exist"
            });
        }

        await vehicle.destroy();

        res.json({
            message: "Vehicle deleted successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to delete vehicle"
        });
    }
});



// INVENTORY - CRUD


// GET all inventory
app.get("/inventory", async (req, res) => {
    try {
        const inventory = await Inventory.findAll();

        res.json(inventory);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch inventory"
        });
    }
});


// GET inventory by ID
app.get("/inventory/:id", async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);

        if (!inventory) {
            return res.status(404).json({
                message: "Inventory item does not exist"
            });
        }

        res.json(inventory);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch inventory item"
        });
    }
});


// POST - create a new inventory item
app.post("/inventory", async (req, res) => {
    try {
        const inventory = await Inventory.create(req.body);

        res.status(201).json(inventory);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create inventory item"
        });
    }
});


// PUT - update inventory item
app.put("/inventory/:id", async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);

        if (!inventory) {
            return res.status(404).json({
                message: "Inventory item does not exist"
            });
        }

        await inventory.update(req.body);

        res.json(inventory);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update inventory item"
        });
    }
});


// DELETE - delete inventory item
app.delete("/inventory/:id", async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);

        if (!inventory) {
            return res.status(404).json({
                message: "Inventory item does not exist"
            });
        }

        await inventory.destroy();

        res.json({
            message: "Inventory item deleted successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to delete inventory item"
        });
    }
});


sequelize.authenticate()
    .then(() => {

        console.log("Database connected!");

        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });

    })
    .catch((error) => {

        console.log("Database connection failed:", error);

    });