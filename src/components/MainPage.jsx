import React, { useEffect, useRef, useState, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PhotosConfigurationForm from './forms/PhotosConfigurationForm';
import PhotoBoard from './board/PhotoBoard';
import { fetchData } from '../helpers/api.js';

import './MainPage.scss';

const PEXELS_API_URL = 'https://api.pexels.com/v1/search';

function MainPage() {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState({
        topic: 'all',
        color: '',
        orientation: '',
        size: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const elementRef = useRef(null);

    const fetchPhotos = useCallback(
        async (topic, color, orientation, size, page) => {
            try {
                setIsLoading(true);

                const url = `${PEXELS_API_URL}?query=${encodeURIComponent(
                    topic
                )}&color=${encodeURIComponent(
                    color || ''
                )}&orientation=${encodeURIComponent(
                    orientation || ''
                )}&size=${encodeURIComponent(
                    size || ''
                )}&page=${encodeURIComponent(page || 1)}`;
                const headers = {
                    Authorization: process.env.REACT_APP_PEXELS_API_KEY,
                };

                const responseData = await fetchData(url, 'GET', {}, headers);
                return responseData;
            } catch (error) {
                console.error('Error fetching photos:', error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const fetchMoreItems = useCallback(async () => {
        if (!hasMore || page <= 1) return; // Sprawdzamy czy page jest większe niż 1

        try {
            setIsLoading(true);
            const response = await fetchPhotos(
                query.topic,
                query.color,
                query.orientation,
                query.size,
                page
            );
            if (response.photos.length > 0 && response.next_page) {
                setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching more photos:', error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
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

    useEffect(() => {
        const initializeFetch = async () => {
            try {
                setIsLoading(true);
                const initialPhotos = await fetchPhotos(
                    'all',
                    '',
                    '',
                    '',
                    1 // Ustawiamy stronę na 1 przy pierwszym ładowaniu
                );
                setPhotos(initialPhotos.photos);
                setSelectedPhoto(initialPhotos.photos[0] || null);
            } catch (error) {
                console.error('Error fetching initial photos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeFetch();
    }, [fetchPhotos]);
    console.log(query);
    return (
        <div className="app-container">
            {isLoading && (
                <div className="loading-overlay">
                    <CircularProgress />
                </div>
            )}{' '}
            <header>
                <h1>Pexels Photo App</h1>
                <PhotosConfigurationForm
                    setPhotos={(newPhotos) => {
                        setPhotos(newPhotos);
                        setPage(2);
                        setHasMore(true);
                    }}
                    setSelectedPhoto={setSelectedPhoto}
                    fetchPhotos={fetchPhotos}
                    formData={query}
                    setFormData={setQuery}
                    setIsLoading={setIsLoading}
                />
            </header>
            {selectedPhoto && (
                <div className="main-photo">
                    <img
                        src={selectedPhoto.src.large}
                        alt={selectedPhoto.alt}
                    />
                </div>
            )}
            <div className="photo-board-container">
                <PhotoBoard
                    photos={photos}
                    setSelectedPhoto={setSelectedPhoto}
                    selectedPhoto={selectedPhoto}
                />
                <div
                    ref={elementRef}
                    className="loading-indicator"
                >
                    {hasMore && <CircularProgress />}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
