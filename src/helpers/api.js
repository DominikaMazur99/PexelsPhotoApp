// helpers/api.js

export const fetchData = async (
    url,
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
