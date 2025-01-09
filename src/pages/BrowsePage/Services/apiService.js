// TODO implement proper reading of settings
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || 'echo';
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 3011;
const API_BASE_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api/persons`;
//const BACKEND_HOST = window._env_?.REACT_APP_API_URL || "http://localhost"; // Фallback на localhost
//const API_BASE_URL = `${BACKEND_HOST}${window._env_.REACT_APP_API_PERSONS?.apiPersonsPrefix || "/api/persons"}`;


const apiService = {
    deletePerson: async (personId) => {
        console.log(personId)
        const response = await fetch(`${API_BASE_URL}/deletePerson/${personId}`, {
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
        const response = await fetch(`${API_BASE_URL}/addPerson`, {
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
        const response = await fetch(`${API_BASE_URL}/updatePerson/${personId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    fetchPersons: async () => {
        const response = await fetch(`${API_BASE_URL}/getPersons`);
        return response.json();
    },
    countPersons: async () => {
        const response = await fetch(`${API_BASE_URL}/countPersons`);
        return response.json();
    },
    countPersonsInactiveSinceMonths: async (months) => {
        const response = await fetch(`${API_BASE_URL}/countPersonsInactiveSinceMonths/${months}`);
        return response.json();
    }
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
