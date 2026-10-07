import { useEffect, useState } from "react";

function Inventory() {
    const [inventory, setInventory] = useState([]);

    const [formData, setFormData] = useState({
        product_name: "",
        quantity: ""
    });

    const [editingId, setEditingId] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3000/inventory";

    // Get all inventory
    const fetchInventory = async () => {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch inventory");
            }

            const data = await response.json();

            setInventory(data);
        } catch (error) {
            console.log(error);
            setError("Could not load inventory.");
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    // Handle input changes
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Add or Update inventory
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

                const updatedItem = await response.json();

                if (!response.ok) {
                    throw new Error(
                        updatedItem.message ||
                        "Failed to update inventory"
                    );
                }

                setInventory((currentInventory) =>
                    currentInventory.map((item) =>
                        item.id === editingId
                            ? updatedItem
                            : item
                    )
                );

                setMessage("Inventory updated successfully!");
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

                const newItem = await response.json();

                if (!response.ok) {
                    throw new Error(
                        newItem.message ||
                        "Failed to add inventory"
                    );
                }

                setInventory((currentInventory) => [
                    ...currentInventory,
                    newItem
                ]);

                setMessage("Inventory added successfully!");
            }

            // Clear form
            setFormData({
                product_name: "",
                quantity: ""
            });

            setEditingId(null);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    // Delete inventory
    const deleteInventory = async (id) => {
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
                    "Failed to delete inventory"
                );
            }

            setInventory((currentInventory) =>
                currentInventory.filter(
                    (item) => item.id !== id
                )
            );

            setMessage("Inventory deleted successfully!");

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    // Edit inventory
    const editInventory = (item) => {
        setEditingId(item.id);

        setFormData({
            product_name: item.product_name,
            quantity: item.quantity
        });

        setMessage("");
        setError("");
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingId(null);

        setFormData({
            product_name: "",
            quantity: ""
        });

        setMessage("");
        setError("");
    };

    return (
        <div>
            <h2>Inventory</h2>

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
                    name="product_name"
                    placeholder="Product Name"
                    value={formData.product_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="0"
                />

                <button type="submit">
                    {editingId !== null
                        ? "Update Inventory"
                        : "Add Inventory"}
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

            {inventory.length === 0 ? (
                <p>No inventory found.</p>
            ) : (
                inventory.map((item) => (
                    <div
                        className="card"
                        key={item.id}
                    >

                        <h3>
                            Inventory #{item.id}
                        </h3>

                        <p>
                            <strong>Product:</strong>{" "}
                            {item.product_name}
                        </p>

                        <p>
                            <strong>Quantity:</strong>{" "}
                            {item.quantity}
                        </p>

                        <button
                            onClick={() =>
                                editInventory(item)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteInventory(item.id)
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

export default Inventory;