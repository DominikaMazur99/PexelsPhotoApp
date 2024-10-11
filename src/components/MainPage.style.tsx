import styled from "styled-components";

const MainContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden; /* This hides overflow, change it if needed */
    background-color: #ffffff;
    position: fixed;
    box-sizing: border-box;
`;

const MainBox = styled.div`
    display: grid;
    padding: 10px;
    height: 100%;
    width: 100%;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: center;
    overflow-y: scroll; /* Ensure this is correct */
    overflow-x: hidden;
    @media (max-width: 768px) {
        grid-template-rows: 1fr;
    }
`;

const ConfigurationContainer = styled.div`
    display: grid;
    grid-tempate-columns: 1fr 1fr;
    gap: 20px;
    box-sizing: border-box;
    padding: 0 20px;
`;

const AppTitle = styled.h1`
    color: #cccccc;
    text-align: center;
`;

const MainPhotoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;

    img {
        max-width: 100%;
        max-height: 40vh;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const MainPhoto = styled.img``;

const PhotoBoardContainer = styled.div`
    width: 100%;
    max-width: 75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 19rem);
    overflow-y: auto;
    box-sizing: border-box; /* Włącz box-sizing */
`;

const LoadingIndicator = styled.div`
    margin: 1.25rem 0;
`;

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

export {
    MainContainer,
    MainBox,
    ConfigurationContainer,
    AppTitle,
    MainPhotoContainer,
    MainPhoto,
    PhotoBoardContainer,
    LoadingIndicator,
    LoadingOverlay,
};
