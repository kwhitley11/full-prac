import React, { useEffect, useState } from "react";
import { getItems } from "../services/api";

function ItemsList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getItems()
            .then(data => setItems(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

if(loading) return <div>Loading...</div>
if(error) return <div>Error: {error}</div>

return (
    <ul>
        {items.map(item => (
            <li key={item._id}>
                <strong>{item.name}</strong> ({item.category} - {item.price} - {item.in_stock ? "In Stock" : "Out of Stock"})
                <p>{item.description}</p>
            </li>
        ))}
    </ul>
    );
}

export default ItemsList;