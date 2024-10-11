import styled, { css } from "styled-components";

interface IPhoto {
    $selectedImg: boolean;
}

const PhotoBoardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.625rem;
    padding: 0.625rem;
    box-sizing: border-box;
`;

const Photo = styled.img<IPhoto>`
    &:hover {
        border: 0.125rem solid rgb(157, 97, 203);
        cursor: pointer;
    }
    ${({ $selectedImg }) =>
        $selectedImg &&
        css`
            border: 0.2rem solid rgb(157, 97, 203);
        `}
`;

export { PhotoBoardContainer, Photo };
