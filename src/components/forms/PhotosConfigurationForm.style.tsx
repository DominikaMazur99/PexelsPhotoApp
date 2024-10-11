import styled, { css } from "styled-components";

interface IBasicButton {
    $backgroundColor?: string;
    $isActive?: boolean;
}

const PhotoConfigurationForm = styled.form``;

const FormContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
    justify-content: center;
    align-items: center;
`;

const FormContainerTags = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const FormContainerForm = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
    justify-content: center;
    align-items: center;
`;

const BasicButton = styled.button<IBasicButton>`
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 0.025rem solid #ccc;
    min-width: 10rem;
    color: #cccccc;
    font-weight: bold;
    padding: 0.5rem;
    background-color: ${({ $backgroundColor }) =>
        $backgroundColor ? $backgroundColor : "#ffffff"};
    text-wrap: nowrap;

    ${({ $isActive }) =>
        $isActive &&
        css`
            background-color: rgba(143, 151, 237, 0.947);
            color: white;
        `}

    &:hover {
        cursor: pointer;
    }
`;

const FormContainerFilters = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const FormContainerButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
`;

export {
    PhotoConfigurationForm,
    FormContainer,
    FormContainerTags,
    FormContainerForm,
    BasicButton,
    FormContainerFilters,
    FormContainerButtons,
};
