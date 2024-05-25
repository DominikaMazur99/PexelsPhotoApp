import React, { useState } from "react";
import ReusableInputComponent from "../inputs/ReusableInputComponent";
import SelectToColorsComponent from "../inputs/SelectToColorsComponents";
import { options } from "../../helpers/options";
import { fetchData } from "../../helpers/api";
import "./PhotosConfigurationForm.scss";

const PEXELS_API_URL = "https://api.pexels.com/v1/search";

function PhotosConfigurationForm({ setPhotos, setSelectedPhoto, setQuery }) {
    const [formData, setFormData] = useState({
        topic: "",
        dominateColor: "",
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const fetchPhotos = async (topic, color, page) => {
        const url = `${PEXELS_API_URL}?query=${encodeURIComponent(
            topic
        )}&color=${encodeURIComponent(color || "")}&page=${page}`;
        const headers = { Authorization: process.env.REACT_APP_PEXELS_API_KEY };

        const responseData = await fetchData(url, "GET", {}, headers);
        return responseData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchPhotos(
                formData.topic,
                formData.dominateColor,
                1
            );
            setPhotos(response.photos);
            setSelectedPhoto(response.photos[0] || null);
            setQuery({ topic: formData.topic, color: formData.dominateColor });
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <ReusableInputComponent
                    placeholder="Wyszukaj..."
                    value={formData.topic}
                    onChange={(e) => handleChange("topic", e.target.value)}
                />
                <SelectToColorsComponent
                    placeholder="Dominujący kolor"
                    value={formData.dominateColor}
                    options={options}
                    onChange={(color) => handleChange("dominateColor", color)}
                />
                <div className="form-container__btn-box">
                    <button
                        className="form-container__btn-box__btn"
                        type="submit"
                    >
                        szukaj
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PhotosConfigurationForm;
