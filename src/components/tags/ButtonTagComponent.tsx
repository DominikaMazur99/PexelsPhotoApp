import React from "react";
import { BasicButton } from "../forms/PhotosConfigurationForm.style.tsx";

interface IButtonTagComponent {
    name: string;
    label: string;
    value: string;
    activeCategory: string;
    setActiveCategory: (element: string) => void;
    handleChange: (name: string, value: string) => void;
}

const ButtonTagComponent = ({
    name,
    label,
    value,
    activeCategory,
    setActiveCategory,
    handleChange,
}: IButtonTagComponent) => {
    const handleClick = () => {
        handleChange(name, value);
        setActiveCategory(value);
    };
    console.log(label);
    return (
        <BasicButton
            $isActive={activeCategory === value}
            $backgroundColor="#ffffff"
            onClick={handleClick}
        >
            {label}
        </BasicButton>
    );
};

export default ButtonTagComponent;
