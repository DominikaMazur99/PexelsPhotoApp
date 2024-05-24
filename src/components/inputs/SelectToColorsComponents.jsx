import React, { useState } from "react";
import "./ReusableInputsStyles.scss";

function SelectToColorsComponent({
    placeholder = "",
    value,
    onChange,
    options = [],
    label = "",
}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className="input-box">
            <label className="input-box__label">{label}</label>
            <div className="select-container">
                <button
                    onClick={toggleDropdown}
                    className="select-container__button"
                >
                    {selectedOption ? (
                        <>
                            <span
                                className="color-circle"
                                style={{
                                    backgroundColor: selectedOption.value,
                                }}
                            ></span>
                            {selectedOption.label}
                        </>
                    ) : (
                        placeholder
                    )}
                </button>
                {isOpen && (
                    <div className="select-container__options">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="option-tile"
                                style={{ backgroundColor: option.value }}
                                onClick={() => handleSelect(option.value)}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectToColorsComponent;
