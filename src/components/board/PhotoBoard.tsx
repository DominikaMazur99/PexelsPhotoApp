import React from "react";
import { IPhoto } from "../../interfaces/interfaces";
import { Photo, PhotoBoardContainer } from "./PhotoBoard.style.tsx";

interface IPhotoBoard {
    photos: IPhoto[];
    setSelectedPhoto: (element: IPhoto) => void;
    selectedPhoto: IPhoto | null;
}

const PhotoBoard = ({
    photos,
    setSelectedPhoto,
    selectedPhoto,
}: IPhotoBoard) => {
    return (
        <PhotoBoardContainer>
            {photos.map((photo: IPhoto) => (
                <Photo
                    key={photo.id}
                    src={photo.src.small}
                    alt={photo.alt}
                    onClick={() => setSelectedPhoto(photo)}
                    $selectedImg={photo.id === selectedPhoto?.id}
                />
            ))}
        </PhotoBoardContainer>
    );
};

export default PhotoBoard;
