import { IQuery } from "../interfaces/interfaces";

export const fetchData = async (
    url: string,
    method = "GET",
    body = {},
    headers = {}
) => {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: method !== "GET" ? JSON.stringify(body) : null,
        });
        return await response.json();
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
};

export const headers = {
    Authorization: process.env.REACT_APP_PEXELS_API_KEY as string,
};

export const generatePexelsApiUrl = (
    baseUrl: string,
    { topic, color = "", orientation = "", size = "", page = 1 }: IQuery
): string => {
    const url = new URL(baseUrl);
    url.searchParams.append("query", encodeURIComponent(topic));
    url.searchParams.append("color", encodeURIComponent(color));
    url.searchParams.append("orientation", encodeURIComponent(orientation));
    url.searchParams.append("size", encodeURIComponent(size));
    url.searchParams.append("page", page.toString());

    return url.toString();
};
