import { useState } from "react";
import Icon from "@mdi/react";
import { mdiCancel } from "@mdi/js";
import "./ReusableInputsStyles.scss";

function SelectToColorsComponent({
    placeholder = "",
    value,
    onChange,
    options = [],
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
                    <span className={isOpen ? `arrow-up` : `arrow-down`}></span>
                </button>
                {isOpen && (
                    <div className="select-container__options">
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="option-tile"
                                style={{
                                    backgroundColor: option.value,
                                    border: "0.5px solid gray",
                                }}
                                onClick={() => handleSelect(option.value)}
                            ></div>
                        ))}
                        <div
                            className="option-tile"
                            onClick={() => handleSelect("")}
                        >
                            <Icon path={mdiCancel} size={2} color="grey" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectToColorsComponent;
