import { useState } from "react";
import Shipments from "./Shipments";
import Vehicles from "./Vehicles";
import Inventory from "./Inventory";
import "./App.css";

function App() {
    const [page, setPage] = useState("shipments");

    return (
        <div className="app">

            <header>
                <h1>LogiTrack</h1>
                <p>Logistics Management System</p>
            </header>

            <nav>
                <button onClick={() => setPage("shipments")}>
                    Shipments
                </button>

                <button onClick={() => setPage("vehicles")}>
                    Vehicles
                </button>

                <button onClick={() => setPage("inventory")}>
                    Inventory
                </button>
            </nav>

            <main>
                {page === "shipments" && <Shipments />}
                {page === "vehicles" && <Vehicles />}
                {page === "inventory" && <Inventory />}
            </main>

        </div>
    );
}

export default App;