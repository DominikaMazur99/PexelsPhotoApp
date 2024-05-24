import React, { useState } from "react";
import "../App.css";
import PhotosConfigurationForm from "./forms/PhotosConfigurationForm";

const PEXELS_API_URL = "https://api.pexels.com/v1/search";
function MainPage() {
    const [query, setQuery] = useState("");
    const [color, setColor] = useState("");
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    console.log(process.env.REACT_APP_PEXELS_API_KEY);
    const fetchPhotos = async () => {
        try {
            const url = `${PEXELS_API_URL}?query=${encodeURIComponent(
                query
            )}&color=${encodeURIComponent(color || "")}&per_page=15`;
            const response = await fetch(url, {
                headers: {
                    Authorization: process.env.REACT_APP_PEXELS_API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            }

            const responseData = await response.json();
            setPhotos(responseData.photos);
            setSelectedPhoto(responseData.photos[0] || null);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPhotos();
    };
    return (
        <div className="App">
            <header>
                <PhotosConfigurationForm />
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    >
                        <option value="">Any Color</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="turquoise">Turquoise</option>
                        <option value="blue">Blue</option>
                        <option value="violet">Violet</option>
                        <option value="pink">Pink</option>
                        <option value="brown">Brown</option>
                        <option value="black">Black</option>
                        <option value="gray">Gray</option>
                        <option value="white">White</option>
                    </select>
                    <button type="submit">Search</button>
                </form>
            </header>
            {selectedPhoto && (
                <div className="main-photo">
                    <img
                        src={selectedPhoto.src.large}
                        alt={selectedPhoto.alt}
                    />
                </div>
            )}
            <div className="photo-thumbnails">
                {photos.map((photo) => (
                    <img
                        key={photo.id}
                        src={photo.src.small}
                        alt={photo.alt}
                        onClick={() => setSelectedPhoto(photo)}
                        className={
                            photo.id === selectedPhoto?.id ? "selected" : ""
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default MainPage;
