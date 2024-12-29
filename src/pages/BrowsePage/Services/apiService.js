const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;
const API_BASE_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api/persons`;

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
        return response.json();
    },
    editPerson: async (personId, data) => {
        const response = await fetch(`${API_BASE_URL}/updatePerson/${personId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    fetchPersons: async () => {
        const response = await fetch(`${API_BASE_URL}/getPersons`);
        return response.json();
    },
};

export default apiService;
