// define the base URL for the API
const API_BASE_URL = "http://localhost:3000/api";

// token management utilities
const tokenManager = {
    // store JWT token in sessionStorage
    setToken(token) {
        sessionStorage.setItem('jwt_token', token);
    },
    
    // get JWT token from sessionStorage
    getToken() {
        return sessionStorage.getItem('jwt_token');
    },
    
    // remove JWT token from sessionStorage
    clearToken() {
        sessionStorage.removeItem('jwt_token');
    },
    
    // check if user is authenticated
    isAuthenticated() {
        return !!this.getToken();
    }
};

// function to make http requests
async function apiRequest(url, options = {}) {
    try {
        // prepare headers
        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
        };

        // add authorization header if token exists and not already provided
        const token = tokenManager.getToken();
        if (token && !headers.Authorization) {
            headers.Authorization = `Bearer ${token}`;
        }

        // make an http request to a specified endpoint with given options
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });

        // get the response data
        const data = await response.json();

        // check if the response is not ok
        if (!response.ok) {
            // handle token expiration
            if (response.status === 401 || response.status === 403) {
                tokenManager.clearToken();
                // you might want to redirect to login page here
                console.warn("Token expired or invalid. User logged out.");
            }
            
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
        const response = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify(userData),
        });
        
        // store the JWT token after successful login
        if (response.success && response.token) {
            tokenManager.setToken(response.token);
        }
        
        return response;
    },

    // logout user (clear token)
    logout() {
        tokenManager.clearToken();
        console.log("User logged out successfully");
    },

    // check if user is authenticated
    isAuthenticated() {
        return tokenManager.isAuthenticated();
    }
};

// user api
const userApi = {
    // get user profile (requires authentication)
    async getProfile() {
        return apiRequest("/user/profile", {
            method: "GET"
        });
    }
};

// health check api
const healthApi = {
    // check server health
    async check() {
        return apiRequest("/health", {
            method: "GET"
        });
    }
};

// export all APIs
window.api = {
    auth: authApi,
    user: userApi,
    health: healthApi,
    tokenManager: tokenManager
};