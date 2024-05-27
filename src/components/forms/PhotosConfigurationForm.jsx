import { useState } from "react";
import ReusableInputComponent from "../inputs/ReusableInputComponent";
import SelectToColorsComponent from "../inputs/SelectToColorsComponents";
import { options, tags } from "../../helpers/options";
import ButtonTagComponent from "../tags/ButtonTagComponent";
import "./PhotosConfigurationForm.scss";

function PhotosConfigurationForm({
    setPhotos,
    setSelectedPhoto,
    formData,
    setFormData,
    fetchPhotos,
}) {
    const [activeCategory, setActiveCategory] = useState("");
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const clearFilters = () => {
        setFormData({
            topic: "all",
            color: "",
            size: "",
        });
        setActiveCategory("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchPhotos(
                formData.topic,
                formData.color,
                1
            );
            setPhotos(response.photos);
            setSelectedPhoto(response.photos[0] || null);
            setFormData({
                topic: formData.topic,
                color: formData.color,
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
                        <ButtonTagComponent
                            name="topic"
                            label={tag.name}
                            value={tag.value}
                            handleChange={handleChange}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    ))}
                </div>
                <div className="form-container__form">
                    <ReusableInputComponent
                        placeholder="Wyszukaj..."
                        value={formData.topic}
                        onChange={(e) => handleChange("topic", e.target.value)}
                    />

                    <SelectToColorsComponent
                        placeholder="Dominujący kolor"
                        value={formData.color}
                        options={options}
                        onChange={(color) => handleChange("color", color)}
                    />
                    <button className="form-container__form__btn" type="submit">
                        szukaj
                    </button>
                    <button
                        className="form-container__form__btn-clear"
                        onClick={clearFilters}
                    >
                        wyczyść filtry
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PhotosConfigurationForm;
