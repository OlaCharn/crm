// actionConfig.js
import apiService from './apiService';

const actionConfig = {
    person: {
        add: {
            action: async (data, setData, openModal) => {
                try {
                    const newPerson = await apiService.addPerson(data);
                    setData(prevData => [...prevData, newPerson]);
                    openModal('add'); // Открыть модальное окно для добавления
                } catch (error) {
                    console.error('Adding person failed', error);
                }
            },
            modalContent: 'add', // Тип модального окна для действия 'add'
        },
        delete: {
            action: async (id, setData, openModal) => {
                
                try {
                    
                    await apiService.deletePerson(id);
                    setData(prevData => prevData.filter(person => person.id !== id));
                    openModal('delete'); // Открыть модальное окно для удаления
                } catch (error) {
                    console.error('Deleting person failed', error);
                }
            },
            modalContent: {
                confirmDelete: {
                    title: 'Are you sure?',
                    message: 'Do you want to delete this person?',
                    buttonText: 'Delete',
                },
            },
        },
        edit: {
            action: async (id, data, setData, openModal) => {
                try {
                    const updatedPerson = await apiService.editPerson(id, data);
                    setData(prevData => prevData.map(person => person.id === id ? updatedPerson : person));
                    openModal('edit'); // Открыть модальное окно для редактирования
                } catch (error) {
                    console.error('Editing person failed', error);
                }
            },
            modalContent: 'edit', // Тип модального окна для действия 'edit'
        }
    }
};

export default actionConfig;
