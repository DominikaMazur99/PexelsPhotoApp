import './ReusableInputsStyles.scss';

function ReusableInputComponent({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    options = [],
}) {
    const handleSelectChange = (e) => {
        onChange(e.target.value);
    };

    const mapValueToLabel = (value) => {
        switch (value) {
            case 'beauty':
                return 'uroda';
            case 'fashion':
                return 'moda';
            case 'food':
                return 'jedzenie';
            case 'travel':
                return 'podróże';
            case 'sport':
                return 'sport';
            case 'yoga':
                return 'joga';
            case 'dog':
                return 'psy';
            case 'nature':
                return 'natura';
            case 'home':
                return 'dom';
            case 'technology':
                return 'technologia';
            case 'christmas':
                return 'święta';
            default:
                return value === 'all' ? 'Wyszukaj...' : value;
        }
    };

    const inputElement =
        type === 'select' ? (
            <select
                value={value}
                onChange={handleSelectChange}
                className={`input-box__field ${
                    value !== '' ? 'input-box__field--selected' : ''
                }`}
            >
                <option
                    value=""
                    disabled
                >
                    {placeholder}
                </option>
                {options.map((option, index) => (
                    <option
                        key={index}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                value={mapValueToLabel(value)}
                onChange={onChange}
                className={`input-box__field ${
                    value !== 'all' ? 'input-box__field--selected' : ''
                }`}
            />
        );

    return <div className="input-box">{inputElement}</div>;
}

export default ReusableInputComponent;
