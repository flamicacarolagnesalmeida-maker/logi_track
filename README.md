# logi_track

# LogiTrack — Logistics Management System

LogiTrack is a beginner-friendly full-stack logistics management system designed to manage essential logistics operations in one place.

The application allows users to manage **shipments, vehicles, and inventory** through a simple CRUD-based interface.

## Features

- Manage shipments
  - Add shipments
  - View shipments
  - Update shipment details
  - Delete shipments

- Manage vehicles
  - Add vehicles
  - View vehicles
  - Update vehicle details
  - Delete vehicles

- Manage inventory
  - Add inventory items
  - View inventory
  - Update quantities and product details
  - Delete inventory items

- Success and error messages for CRUD operations
- REST API integration between frontend and backend
- MySQL database integration

## Tech Stack

### Frontend
- React.js
- Vite
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Sequelize ORM
- REST API

### Database
- MySQL
- phpMyAdmin

### API Testing
- Postman

## Project Structure

```text
logitrack/
│
├── Backend/
│   ├── models/
│   │   ├── shipment.js
│   │   ├── vehicle.js
│   │   └── inventory.js
│   │
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── Shipments.jsx
    │   ├── Vehicles.jsx
    │   ├── Inventory.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    │
    ├── package.json
    └── ...
