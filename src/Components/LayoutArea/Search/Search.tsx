import React, { useState } from "react";
import "./Search.css";

interface SearchProps {
    onSearch: (city: string) => void;
}

export function Search({ onSearch }: SearchProps): JSX.Element {

    const [city, setCity] = useState('');

    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        if(city.trim()){
            onSearch(city.trim());
        }
    } 

    return (
        <div className="Search">
            <form onSubmit={handleSubmit}  className="input-location">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    aria-label="City name"
                />
                <button type="submit">🔍</button>
            </form>
        </div>
    );
}
