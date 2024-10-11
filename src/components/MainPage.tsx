import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PhotosConfigurationForm from "./forms/PhotosConfigurationForm.tsx";
import PhotoBoard from "./board/PhotoBoard.tsx";
import { fetchData, generatePexelsApiUrl, headers } from "../helpers/api.ts";

import {
    AppTitle,
    ConfigurationContainer,
    LoadingIndicator,
    LoadingOverlay,
    MainBox,
    MainContainer,
    MainPhoto,
    MainPhotoContainer,
    PhotoBoardContainer,
} from "./MainPage.style.tsx";
import { IPhoto, IPhotoResponse, IQuery } from "../interfaces/interfaces";

const MainPage: FC = () => {
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<IQuery>({
        topic: "all",
        color: "",
        orientation: "",
        size: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const elementRef = useRef<HTMLDivElement | null>(null);

    const fetchPhotos = useCallback(
        async (
            topic: string,
            color: string,
            orientation: string,
            size: string,
            page: number
        ): Promise<any> => {
            try {
                setIsLoading(true);

                const url = generatePexelsApiUrl(
                    process.env.REACT_APP_PEXELS_API_URL as string,
                    {
                        topic: "all",
                        color: "blue",
                        orientation: "landscape",
                        size: "medium",
                        page: 1,
                    }
                );

                const responseData: IPhotoResponse = await fetchData(
                    url,
                    "GET",
                    {},
                    headers
                );
                return responseData;
            } catch (error) {
                console.error("Error fetching photos:", error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const fetchMoreItems = useCallback(async () => {
        if (!hasMore || page <= 1) return;

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
            console.error("Error fetching more photos:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [query, page, hasMore, fetchPhotos]);

    useEffect(() => {
        const onIntersection = (entries: IntersectionObserverEntry[]) => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting && hasMore) {
                fetchMoreItems();
            }
        };

        const observer = new IntersectionObserver(onIntersection);
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [photos, fetchMoreItems, hasMore]);

    useEffect(() => {
        const initializeFetch = async () => {
            try {
                setIsLoading(true);
                const initialPhotos = await fetchPhotos("all", "", "", "", 1);
                setPhotos(initialPhotos.photos);
                setSelectedPhoto(initialPhotos.photos[0] || null);
            } catch (error) {
                console.error("Error fetching initial photos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeFetch();
    }, [fetchPhotos]);

    return (
        <MainContainer>
            <MainBox>
                {isLoading && (
                    <LoadingOverlay>
                        <CircularProgress />
                    </LoadingOverlay>
                )}
                <ConfigurationContainer>
                    <AppTitle>Pexels Photo App</AppTitle>
                    <PhotosConfigurationForm
                        setPhotos={(newPhotos: IPhoto[]) => {
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
                </ConfigurationContainer>
                {selectedPhoto && (
                    <MainPhotoContainer>
                        <MainPhoto
                            src={selectedPhoto?.src.large}
                            alt={selectedPhoto?.alt}
                        />
                    </MainPhotoContainer>
                )}
                <PhotoBoardContainer>
                    <PhotoBoard
                        photos={photos}
                        setSelectedPhoto={setSelectedPhoto}
                        selectedPhoto={selectedPhoto}
                    />
                    <LoadingIndicator
                        ref={elementRef}
                        className="loading-indicator"
                    />
                </PhotoBoardContainer>
            </MainBox>
        </MainContainer>
    );
};

export default MainPage;
