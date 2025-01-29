import React, { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../../app/Services/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    // restore session
    useEffect(() => {
        const restoreSession = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const data = await apiService.getUserFromToken(token);
                    setUser(data.name);
                    setRole(data.role);
                } catch (error) {
                    console.error('Failed to restore session:', error);
                    localStorage.removeItem('authToken');
                    // alert('Session expired. Please log in again.');
                }
            } else {
                //console.log('No token found');
            }
        };
    
        restoreSession();
    }, []);

    // login for user
    const login = async (username, password) => {
        try {
            const data = await apiService.loginUser(username, password); // call apiService
            //console.log('Login successful:', data); 
            if (data.token) {
                setUser(data.name);
                setRole(data.role);
                localStorage.setItem('authToken', data.token); // save token
                //console.log('User logged in:', data.name, data.token, data.role);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            //console.error('Login failed', error);
            alert('Login failed', error);
        }
    };

    // logout
    const logout = async () => {
        try {
            await apiService.logoutUser(user); // call apiService for logout
            setUser(null);
            setRole(null);
            localStorage.removeItem("authToken");
        } catch (error) {
            console.error('Logout failed', error);
            alert('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

