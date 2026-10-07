import { useEffect, useState } from "react";

function Shipments() {
    const [shipments, setShipments] = useState([]);

    const [formData, setFormData] = useState({
        customer_name: "",
        origin: "",
        destination: "",
        status: "Pending"
    });

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000/shipments";

    // Get all shipments
    const fetchShipments = async () => {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch shipments");
            }

            const data = await response.json();

            setShipments(data);
        } catch (error) {
            console.log(error);
            setError("Could not load shipments.");
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    // Handle input changes
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Add or Update shipment
    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        try {
            // UPDATE
            if (editingId !== null) {
                const response = await fetch(
                    `${API_URL}/${editingId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                );

                const updatedShipment = await response.json();

                if (!response.ok) {
                    throw new Error(
                        updatedShipment.message ||
                        "Failed to update shipment"
                    );
                }

                setShipments((currentShipments) =>
                    currentShipments.map((shipment) =>
                        shipment.id === editingId
                            ? updatedShipment
                            : shipment
                    )
                );

                setMessage("Shipment updated successfully!");
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

                const newShipment = await response.json();

                if (!response.ok) {
                    throw new Error(
                        newShipment.message ||
                        "Failed to add shipment"
                    );
                }

                setShipments((currentShipments) => [
                    ...currentShipments,
                    newShipment
                ]);

                setMessage("Shipment added successfully!");
            }

            // Clear form
            setFormData({
                customer_name: "",
                origin: "",
                destination: "",
                status: "Pending"
            });

            setEditingId(null);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    // Delete shipment
    const deleteShipment = async (id) => {
        setMessage("");
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete shipment"
                );
            }

            setShipments((currentShipments) =>
                currentShipments.filter(
                    (shipment) => shipment.id !== id
                )
            );

            setMessage("Shipment deleted successfully!");

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    // Edit shipment
    const editShipment = (shipment) => {
        setEditingId(shipment.id);

        setFormData({
            customer_name: shipment.customer_name,
            origin: shipment.origin,
            destination: shipment.destination,
            status: shipment.status
        });

        setMessage("");
        setError("");
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);

        setFormData({
            customer_name: "",
            origin: "",
            destination: "",
            status: "Pending"
        });

        setMessage("");
        setError("");
    };

    return (
        <div>
            <h2>Shipments</h2>

            {message && (
                <p className="success-message">
                    ✅ {message}
                </p>
            )}

            {error && (
                <p className="error-message">
                    ❌ {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="customer_name"
                    placeholder="Customer Name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="origin"
                    placeholder="Origin"
                    value={formData.origin}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Pending">
                        Pending
                    </option>

                    <option value="In Transit">
                        In Transit
                    </option>

                    <option value="Delivered">
                        Delivered
                    </option>
                </select>

                <button type="submit">
                    {editingId !== null
                        ? "Update Shipment"
                        : "Add Shipment"}
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

            {shipments.length === 0 ? (
                <p>No shipments found.</p>
            ) : (
                shipments.map((shipment) => (
                    <div
                        className="card"
                        key={shipment.id}
                    >

                        <h3>
                            Shipment #{shipment.id}
                        </h3>

                        <p>
                            <strong>Customer:</strong>{" "}
                            {shipment.customer_name}
                        </p>

                        <p>
                            <strong>From:</strong>{" "}
                            {shipment.origin}
                        </p>

                        <p>
                            <strong>To:</strong>{" "}
                            {shipment.destination}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {shipment.status}
                        </p>

                        <button
                            onClick={() =>
                                editShipment(shipment)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteShipment(shipment.id)
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

export default Shipments;