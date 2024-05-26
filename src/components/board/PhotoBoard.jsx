import React from "react";
import "./PhotoBoard.scss";

function PhotoBoard({ photos, setSelectedPhoto, selectedPhoto }) {
    return (
        <div className="photo-thumbnails">
            {photos.map((photo) => (
                <img
                    key={photo.id}
                    src={photo.src.small}
                    alt={photo.alt}
                    onClick={() => setSelectedPhoto(photo)}
                    className={photo.id === selectedPhoto?.id ? "selected" : ""}
                />
            ))}
        </div>
    );
}

export default PhotoBoard;
