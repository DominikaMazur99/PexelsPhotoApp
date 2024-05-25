import React from "react";
import "./ReusableInputsStyles.scss";

function ReusableInputComponent({
    type = "text",
    label = "",
    placeholder = "",
    value,
    onChange,
    options = [],
}) {
    const inputElement =
        type === "select" ? (
            <select
                value={value}
                onChange={onChange}
                className="input-box__field"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input-box__field"
            />
        );

    return <div className="input-box">{inputElement}</div>;
}

export default ReusableInputComponent;
