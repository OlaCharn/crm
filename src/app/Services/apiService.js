// TODO implement proper reading of settings
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || 'echo';
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 3011;
const API_BASE_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api`;
//const BACKEND_HOST = window._env_?.REACT_APP_API_URL || "http://localhost"; // Фallback на localhost
//const API_BASE_URL = `${BACKEND_HOST}${window._env_.REACT_APP_API_PERSONS?.apiPersonsPrefix || "/api/persons"}`;


const apiService = {
    //для BrowsePage
    deletePerson: async (personId) => {
        console.log(personId)
        const response = await fetch(`${API_BASE_URL}/persons/deletePerson/${personId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Ошибка удаления записи");
        }

        // Проверяем, возвращает ли ответ что-то
        const data = await response.text(); // получаем текстовый ответ
        if (data) {
            return JSON.parse(data); // или используем json(), если ответ действительно JSON
        } else {
            return {}; // В случае пустого ответа возвращаем пустой объект
        }
    },
    addPerson: async (data) => {
        const response = await fetch(`${API_BASE_URL}/persons/addPerson`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        const response = await fetch(`${API_BASE_URL}/persons/updatePerson/${personId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    fetchPersons: async () => {
        const response = await fetch(`${API_BASE_URL}/persons/getPersons`);
        return response.json();
    },
    //для DashboardPage
    countPersons: async () => {
        const response = await fetch(`${API_BASE_URL}/persons/countPersons`);
        return response.json();
    },
    countPersonsInactiveSinceMonths: async (months) => {
        const response = await fetch(`${API_BASE_URL}/persons/countPersonsInactiveSinceMonths/${months}`);
        return response.json();
    },
    //для SettingsPage
    getUsers: async () => {
        const response = await fetch(`${API_BASE_URL}/users/getUsers`);
        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`);
        }
        return response.json();
    },
    deleteUser: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/users/deleteUser/${userId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Пользователь не найден");
            }
            throw new Error(`Ошибка удаления пользователя: ${response.status} ${response.statusText}`);
        }
        const data = await response.text(); // получаем текстовый ответ
        if (data) {
            return JSON.parse(data); // или используем json(), если ответ действительно JSON
        } else {
            return {}; 
        }
    },
    registerUser: async (data) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/registerUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                if (response.status === 409) {
                    const error = new Error('User already exists');  // Возвращаем ошибку с кодом 409, если пользователь уже существует
                    error.code = 409;
                    throw error; // Выбрасываем ошибку
                }
                throw new Error('Server error: ' + response.statusText);
            }
            const jsonResponse = await response.json();
            return jsonResponse; // Возвращаем данные в случае успеха
        } catch (error) {
            console.error(error); // Логируем ошибку
            throw error; // Пробрасываем ошибку наверх
        }
    },
    updateUser: async (userId, data) => {
        const response = await fetch(`${API_BASE_URL}/users/updateUser/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    }, 
    loginUser: async (username, password) => {
            try {
            console.log("!!!!!!")
            const response = await fetch(`${API_BASE_URL}/users/loginUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "name": username, "password": password }),
            });
    
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Incorrect credentials');  // Ошибка, если неверный логин/пароль
                }
                throw new Error('Server error: ' + response.statusText);  // Ошибка сервера
            }
    
            // Если запрос успешен, получаем токен
            const data = await response.json();
            console.log("Response from server:", data);  // Логирование полученного ответа от сервера
    
            // Сохраняем токен в localStorage
            if (data.token) {
                localStorage.setItem("authToken", data.token);
            }
    
            // Возвращаем данные с токеном
            return data;
        } catch (error) {
            console.error(error);
            throw error;  // Пробрасываем ошибку наверх
        }
    }, 
    logoutUser: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/logoutUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Дополнительные параметры, если требуется (например, токен для выхода)
                body: JSON.stringify({
                    token: localStorage.getItem("authToken") // Отправляем токен на сервер
                }),
            });
    
            if (!response.ok) {
                throw new Error('Ошибка при логауте');
            }
    
            // Если логаут успешен, очищаем токен из localStorage
            localStorage.removeItem("authToken");
    
            // Возвращаем успешный ответ
            return { success: true };
        } catch (error) {
            console.error("Ошибка логаута", error);
            throw error;
        }
    },

};

export default apiService;

/*

для теста с ошибками

editPerson: async (personId, data) => {
    try {
        console.log("Отправляемые данные:", JSON.stringify(data, null, 2));
        console.log(`URL запроса: ${API_BASE_URL}/updatePerson/${personId}`);

        const response = await fetch(`${API_BASE_URL}/updatePerson/${personId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        console.log("HTTP статус ответа:", response.status);
        console.log("Заголовки ответа:", response.headers);

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const jsonResponse = await response.json();
            console.log("Ответ в формате JSON:", JSON.stringify(jsonResponse, null, 2));
            return jsonResponse;
        } else {
            const textResponse = await response.text();
            console.error("Ответ не является JSON:", textResponse);
            throw new Error("Ответ от сервера не JSON");
        }
    } catch (err) {
        console.error("Ошибка в editPerson:", err);
        throw err; // Передаем ошибку для обработки вызывающим кодом
    }
},
*/
