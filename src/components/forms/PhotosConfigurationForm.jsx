import React from "react";
import ReusableInputComponent from "../inputs/ReusableInputComponent";
import SelectToColorsComponent from "../inputs/SelectToColorsComponents";
import { options, sizes, tags } from "../../helpers/options";
import { fetchData } from "../../helpers/api";
import "./PhotosConfigurationForm.scss";
import ButtonTagComponent from "../tags/ButtonTagComponent";

const PEXELS_API_URL = "https://api.pexels.com/v1/search";

function PhotosConfigurationForm({
    setPhotos,
    setSelectedPhoto,
    setQuery,
    formData,
    setFormData,
}) {
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const fetchPhotos = async (topic, color, size, page) => {
        const url = `${PEXELS_API_URL}?query=${encodeURIComponent(
            topic
        )}&color=${encodeURIComponent(color || "")}&size=${size}&page=${page}`;
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
                formData.size,
                1
            );
            setPhotos(response.photos);
            setSelectedPhoto(response.photos[0] || null);
            setQuery({
                topic: formData.topic,
                color: formData.dominateColor,
                size: formData.size,
            });
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="form-container__tags">
                    {tags.map((tag) => (
                        <ButtonTagComponent key={tag.name} name={tag.name} />
                    ))}
                </div>
                <div className="form-container__form">
                    <ReusableInputComponent
                        placeholder="Wyszukaj..."
                        value={formData.topic}
                        onChange={(e) => handleChange("topic", e.target.value)}
                    />
                    <ReusableInputComponent
                        type="select"
                        options={sizes}
                        placeholder="rozmiar"
                        value={formData.size}
                        onChange={(e) => handleChange("size", e.target.value)}
                    />
                    <SelectToColorsComponent
                        placeholder="Dominujący kolor"
                        value={formData.dominateColor}
                        options={options}
                        onChange={(color) =>
                            handleChange("dominateColor", color)
                        }
                    />
                    <button className="form-container__form__btn" type="submit">
                        szukaj
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PhotosConfigurationForm;
