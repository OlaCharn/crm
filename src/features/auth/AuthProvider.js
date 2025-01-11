import React, { createContext, useState, useContext } from 'react';
import apiService from '../../app/Services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    // Логин пользователя
    const login = async (username, password) => {
        try {
            const data = await apiService.loginUser(username, password); // Вызываем apiService
            console.log('Login successful:', data); // Логируем ответ от сервера
            if (data.token) {
                setUser(data.name);
                setRole(data.role);
                localStorage.setItem('authToken', data.token); // Сохраняем токен
                console.log('User logged in:', data.name);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    // Логаут пользователя
    const logout = async () => {
        try {
            await apiService.logoutUser(); // Вызываем apiService для логаута
            setUser(null);
            setRole(null);
            localStorage.removeItem('authToken'); // Удаляем токен
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);