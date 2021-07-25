import React from "react";
import { Link, useLocation } from "react-router-dom";

import Table from "./components/Table.jsx";

function App() {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();

    return(
        <div className="appContainer">
            <h1>High-rise buildings in cities</h1>
            <div className="links">
                <p>Select any voice below here to order the table</p>
                <h2>Order by: {query.get("orderByField") || "#"}</h2>
                <ul>
                    <li><Link to="/?orderByField=#">#</Link></li>
                    <li><Link to="/?orderByField=City">City</Link></li>
                    <li><Link to="/?orderByField=Country">Country</Link></li>
                    <li><Link to="/?orderByField=All Buildings">All Buildings</Link></li>
                    <li><Link to="/?orderByField=100m+">100m+</Link></li>
                    <li><Link to="/?orderByField=150m+">150m+</Link></li>
                    <li><Link to="/?orderByField=200m+">200m+</Link></li>
                    <li><Link to="/?orderByField=300m+">300m+</Link></li>
                    <li><Link to="/?orderByField=Telecom Towers">Telecom Towers</Link></li>
                    <li><Link to="/?orderByField=All Structures">All Structures</Link></li>
                </ul>
            </div>
            <div className="resultContainer">
                <Table field={query.get("orderByField")} />
            </div>
        </div>
    );
};

export default App;