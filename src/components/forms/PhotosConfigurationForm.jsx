import React, { useState } from "react";
import ReusableInputComponent from "../inputs/ReusableInputComponent";
import SelectToColorsComponent from "../inputs/SelectToColorsComponents";
import "./PhotosConfigurationForm.scss";

function PhotosConfigurationForm() {
    const [formData, setFormData] = useState({
        topic: "",
        dominateColor: "",
        // Dodaj inne pola według potrzeb
    });

    const handleChange = (name, value) => {
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const options = [
        { value: "red", label: "Czerwony" },
        { value: "green", label: "Zielony" },
        { value: "pink", label: "Różowy" },
        { value: "purple", label: "Fioletowy" },
        { value: "orange", label: "Pomarańczowy" },
        { value: "cyan", label: "Błękitny" },
        { value: "magenta", label: "Purpurowy" },
        { value: "yellow", label: "Żółty" },
        { value: "blue", label: "Niebieski" },
        { value: "brown", label: "Brązowy" },
        { value: "black", label: "Czarny" },
        { value: "gray", label: "Szary" },
        { value: "silver", label: "Srebrny" },
        { value: "gold", label: "Złoty" },
        { value: "violet", label: "Fiolet" },
        { value: "maroon", label: "Kasztanowy" },
        { value: "olive", label: "Oliwkowy" },
        { value: "navy", label: "Granatowy" },
        { value: "turquoise", label: "Turkusowy" },
        { value: "white", label: "Biały" },
    ];

    return (
        <div className="form-container">
            <ReusableInputComponent
                placeholder="Wyszukaj..."
                value={formData.topic}
                onChange={(e) => handleChange("topic", e.target.value)}
            />
            <SelectToColorsComponent
                placeholder="Dominujący color"
                value={formData.dominateColor}
                options={options}
                onChange={(color) => handleChange("dominateColor", color)}
            />
            {/* Dodaj inne pola wejściowe tutaj */}
        </div>
    );
}

export default PhotosConfigurationForm;
