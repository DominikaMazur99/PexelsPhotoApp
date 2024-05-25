import React from "react";
import "./PhotoBoard.scss";

function PhotoBoard({ selectedPhoto, photos, setSelectedPhoto }) {
    return (
        <>
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
        </>
    );
}

export default PhotoBoard;
