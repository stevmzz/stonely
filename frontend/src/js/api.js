// define the base URL for the API
const API_BASE_URL = "http://localhost:3000/api";

// function to make http requests
async function apiRequest(url, options = {}) {
    try {
        // make an http request to a specified endpoint with given options
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            }
        });

        // get the response data
        const data = await response.json();

        // check if the response is not ok
        if (!response.ok) {
            throw new Error(`[http error] status: ${response.status}, message: ${data.message || "no message provided"}`);
        }
        return data;
    }

    // handle any errors that occur during the request
    catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
}

// authentication api
const authApi = {
    // register a new user
    async register(userData) {
        return apiRequest("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    },

    // login a user
    async login(userData) {
        return apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    }
}

// user api
const userApi = {
    // get user profile
    async getProfile() {
        return apiRequest("/user/profile");
    }
}

// health check api
const healthApi = {
    // check server health
    async check() {
        return apiRequest("/health");
    }
}

// export all APIs
window.api = {
    auth: authApi,
    user: userApi,
    health: healthApi,
};