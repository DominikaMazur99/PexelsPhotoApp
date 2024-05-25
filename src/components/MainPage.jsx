import React, { useEffect, useRef, useState, useCallback } from "react";
import PhotosConfigurationForm from "./forms/PhotosConfigurationForm";
import PhotoBoard from "./board/PhotoBoard";
import { fetchData } from "../helpers/api.js";

import "./MainPage.scss";

const PEXELS_API_URL = "https://api.pexels.com/v1/search";

function MainPage() {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState({ topic: "", color: "" });

    const elementRef = useRef(null);

    const fetchPhotos = useCallback(async (topic, color, page) => {
        try {
            const url = `${PEXELS_API_URL}?query=${encodeURIComponent(
                topic
            )}&color=${encodeURIComponent(
                color || ""
            )}&page=${encodeURIComponent(page || 1)}`;
            const headers = {
                Authorization: process.env.REACT_APP_PEXELS_API_KEY,
            };

            const responseData = await fetchData(url, "GET", {}, headers);
            return responseData;
        } catch (error) {
            console.error("Error fetching photos:", error);
            throw error;
        }
    }, []);

    const fetchMoreItems = useCallback(async () => {
        if (!hasMore) return;

        try {
            const response = await fetchPhotos(query.topic, query.color, page);
            if (response.photos.length > 0) {
                setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching more photos:", error);
            setHasMore(false);
        }
    }, [query, page, hasMore, fetchPhotos]);

    const onIntersection = (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore) {
            fetchMoreItems();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [photos]);

    return (
        <div className="app-container">
            <header>
                <PhotosConfigurationForm
                    setPhotos={(newPhotos) => {
                        setPhotos(newPhotos);
                        setPage(2); // Reset page number for new search
                        setHasMore(true);
                    }}
                    setSelectedPhoto={setSelectedPhoto}
                    setQuery={setQuery}
                    fetchPhotos={fetchPhotos} // Pass fetchPhotos function to the form component
                />
            </header>
            <PhotoBoard
                selectedPhoto={selectedPhoto}
                photos={photos}
                setSelectedPhoto={setSelectedPhoto}
            />
            <div ref={elementRef} className="loading-indicator">
                {hasMore ? "Loading more photos..." : "No more photos"}
            </div>
        </div>
    );
}

export default MainPage;
