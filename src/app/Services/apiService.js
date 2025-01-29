// TODO implement proper reading of settings
/*
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || 'echo';
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 3011;
const API_BASE_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api`;
//const BACKEND_HOST = window._env_?.REACT_APP_API_URL || "http://localhost"; // Фallback на localhost
//const API_BASE_URL = `${BACKEND_HOST}${window._env_.REACT_APP_API_PERSONS?.apiPersonsPrefix || "/api/persons"}`;


const apiService = {
    //BrowsePage
    deletePerson: async (personId) => {
        console.log(personId)
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/persons/deletePerson/${personId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Deleting Error");
        }

        const data = await response.text(); 
        if (data) {
            return JSON.parse(data); 
        } else {
            return {}; 
        }
    },
    addPerson: async (data) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/persons/addPerson`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Server error: ' + response.statusText);
        }
        const jsonResponse = await response.json();
        //console.log(jsonResponse)
        return jsonResponse;
    },
    editPerson: async (personId, data) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/persons/updatePerson/${personId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${token}` },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    fetchPersons: async () => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/persons/getPersons`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        })
        return response.json();
    },
    //DashboardPage
    countPersons: async () => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/persons/countPersons` , {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });
        return response.json();
    },
    countPersonsInactiveSinceMonths: async (months) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/persons/countPersonsInactiveSinceMonths/${months}` , {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });
        return response.json();
    },
    //SettingsPage
    getUsers: async () => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/users/getUsers` , {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    },
    deleteUser: async (userId) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/users/deleteUser/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("User is not found");
            }
            throw new Error(`Deleting Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.text(); 
        if (data) {
            return JSON.parse(data); 
        } else {
            return {}; 
        }
    },
    registerUser: async (data) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/users/registerUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                if (response.status === 409) {
                    const error = new Error('User already exists');  
                    error.code = 409;
                    throw error; 
                }
                throw new Error('Server error: ' + response.statusText);
            }
            const jsonResponse = await response.json();
            return jsonResponse; 
        } catch (error) {
            console.error(error); 
            throw error; 
        }
    },
    updateUser: async (userId, data) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/users/updateUser/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(data),
        });
        return response.json();
    }, 
    loginUser: async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/loginUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json",},
                body: JSON.stringify({ "name": username, "password": password }),
            });
    
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Incorrect credentials');  
                }
                throw new Error('Server error: ' + response.statusText);  
            }
    
            const data = await response.json();
            //console.log("Response from server:", data);  
    
            // save token in localStorage
            if (data.token) {
                localStorage.setItem("authToken", data.token);
            }
            // return data with token
            return data;
        } catch (error) {
            console.error(error);
            throw error;  
        }
    }, 
    logoutUser: async (username) => {
        try {
            //console.log("api logout")
        
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/users/logoutUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                // additional params, if needs (for example, exit token)
                body: JSON.stringify({ "name": username }),
            });
    
            if (!response.ok) {
                throw new Error('Logout Error');
            }   
            localStorage.removeItem("authToken");
    
            return { success: true };
        } catch (error) {
            console.error("Logout Error", error);
            throw error;
        }
    },

    getUserFromToken: async (token) => {
        try {   
            const response = await fetch(`${API_BASE_URL}/users/getMe`, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                },
            });
    
            //console.log('Response status:', response.status); 
    
            if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.statusText}`);
            }
    
            const data = await response.json();
            //console.log('User data:', data); 
            return data;
        } catch (error) {
            console.error('Error fetching user from token:', error);
            throw error;
        }
    },

};

export default apiService;

*/