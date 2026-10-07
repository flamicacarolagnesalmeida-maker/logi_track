import { useEffect, useState } from "react";

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);

    const [formData, setFormData] = useState({
        vehicle_number: "",
        vehicle_type: "",
        status: "Available"
    });

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000/vehicles";

    // Get all vehicles
    const fetchVehicles = async () => {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch vehicles");
            }

            const data = await response.json();

            setVehicles(data);
        } catch (error) {
            console.log(error);
            setError("Could not load vehicles.");
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    // Handle input changes
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Add or Update vehicle
    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        try {
            // UPDATE
            if (editingId !== null) {
                const response = await fetch(`${API_URL}/${editingId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const updatedVehicle = await response.json();

                if (!response.ok) {
                    throw new Error(
                        updatedVehicle.message || "Failed to update vehicle"
                    );
                }

                // Update vehicle on screen immediately
                setVehicles((currentVehicles) =>
                    currentVehicles.map((vehicle) =>
                        vehicle.id === editingId
                            ? updatedVehicle
                            : vehicle
                    )
                );

                setMessage("Vehicle updated successfully!");
            }

            // ADD
            else {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const newVehicle = await response.json();

                if (!response.ok) {
                    throw new Error(
                        newVehicle.message || "Failed to add vehicle"
                    );
                }

                // Add the vehicle returned by the backend
                // directly to the screen
                setVehicles((currentVehicles) => [
                    ...currentVehicles,
                    newVehicle
                ]);

                setMessage("Vehicle added successfully!");
            }

            // Clear form
            setFormData({
                vehicle_number: "",
                vehicle_type: "",
                status: "Available"
            });

            setEditingId(null);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    // Delete vehicle
    const deleteVehicle = async (id) => {
        setMessage("");
        setError("");

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete vehicle"
                );
            }

            // Remove vehicle from screen immediately
            setVehicles((currentVehicles) =>
                currentVehicles.filter((vehicle) => vehicle.id !== id)
            );

            setMessage("Vehicle deleted successfully!");

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    // Put vehicle data into form for editing
    const editVehicle = (vehicle) => {
        setEditingId(vehicle.id);

        setFormData({
            vehicle_number: vehicle.vehicle_number,
            vehicle_type: vehicle.vehicle_type,
            status: vehicle.status
        });

        setMessage("");
        setError("");
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);

        setFormData({
            vehicle_number: "",
            vehicle_type: "",
            status: "Available"
        });

        setMessage("");
        setError("");
    };

    return (
        <div>
            <h2>Vehicles</h2>

            {/* Success message */}
            {message && (
                <p className="success-message">
                    ✅ {message}
                </p>
            )}

            {/* Error message */}
            {error && (
                <p className="error-message">
                    ❌ {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="vehicle_number"
                    placeholder="Vehicle Number"
                    value={formData.vehicle_number}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="vehicle_type"
                    placeholder="Vehicle Type"
                    value={formData.vehicle_type}
                    onChange={handleChange}
                    required
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Available">Available</option>
                    <option value="In Use">In Use</option>
                    <option value="Maintenance">Maintenance</option>
                </select>

                <button type="submit">
                    {editingId !== null
                        ? "Update Vehicle"
                        : "Add Vehicle"}
                </button>

                {editingId !== null && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                )}
            </form>

            <hr />

            {/* Display vehicles */}
            {vehicles.length === 0 ? (
                <p>No vehicles found.</p>
            ) : (
                vehicles.map((vehicle) => (
                    <div className="card" key={vehicle.id}>

                        <h3>
                            Vehicle #{vehicle.id}
                        </h3>

                        <p>
                            <strong>Vehicle Number:</strong>{" "}
                            {vehicle.vehicle_number}
                        </p>

                        <p>
                            <strong>Type:</strong>{" "}
                            {vehicle.vehicle_type}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {vehicle.status}
                        </p>

                        <button
                            onClick={() => editVehicle(vehicle)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteVehicle(vehicle.id)
                            }
                        >
                            Delete
                        </button>

                    </div>
                ))
            )}
        </div>
    );
}

export default Vehicles;