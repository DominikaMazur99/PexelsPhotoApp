import React from "react";
import "./ButtonTagComponent.scss";

function ButtonTagComponent({
    name,
    label,
    value,
    activeCategory,
    setActiveCategory,
    handleChange,
}) {
    const handleClick = () => {
        handleChange(name, value);
        setActiveCategory(value); // Ustawienie aktywnej kategorii na wartość przycisku
    };

    return (
        <button
            className={`btn-tag ${
                activeCategory === value ? "btn-tag--active" : ""
            }`}
            onClick={handleClick}
        >
            {label}
        </button>
    );
}

export default ButtonTagComponent;
