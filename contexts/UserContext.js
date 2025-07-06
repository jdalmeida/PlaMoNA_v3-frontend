'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Carregar dados do usuário do localStorage na inicialização
    useEffect(() => {
        const loadUserFromStorage = () => {
            try {
                const userName = localStorage.getItem("userName");
                const userMail = localStorage.getItem("userMail");
                const userCPF = localStorage.getItem("userCPF");
                const userEndereco = localStorage.getItem("userEndereco");
                const userTelefone = localStorage.getItem("userTelefone");
                const userAlertaSms = localStorage.getItem("userAlertaSms");
                const userAlertaEmail = localStorage.getItem("userAlertaEmail");
                const userAcess = localStorage.getItem("userAcess");

                if (userName && userMail) {
                    setUser({
                        nome: userName,
                        email: userMail,
                        cpf: userCPF,
                        endereco: userEndereco,
                        telefone: userTelefone,
                        alerta_sms: userAlertaSms,
                        alerta_email: userAlertaEmail,
                        acesso: userAcess
                    });
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserFromStorage();
    }, []);

    const login = (userData) => {
        try {
            // Salvar no localStorage
            localStorage.setItem("userName", userData.nome);
            localStorage.setItem("userMail", userData.email);
            localStorage.setItem("userCPF", userData.cpf);
            localStorage.setItem("userEndereco", userData.endereco);
            localStorage.setItem("userTelefone", userData.telefone);
            localStorage.setItem("userAlertaSms", userData.alerta_sms);
            localStorage.setItem("userAlertaEmail", userData.alerta_email);
            localStorage.setItem("userAcess", userData.acesso);

            // Atualizar estado
            setUser(userData);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    };

    const logout = () => {
        try {
            // Limpar localStorage
            localStorage.removeItem("userName");
            localStorage.removeItem("userMail");
            localStorage.removeItem("userCPF");
            localStorage.removeItem("userEndereco");
            localStorage.removeItem("userTelefone");
            localStorage.removeItem("userAlertaSms");
            localStorage.removeItem("userAlertaEmail");
            localStorage.removeItem("userAcess");

            // Limpar estado
            setUser(null);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            throw error;
        }
    };

    const updateUser = (userData) => {
        try {
            // Atualizar localStorage
            localStorage.setItem("userName", userData.nome);
            localStorage.setItem("userMail", userData.email);
            localStorage.setItem("userCPF", userData.cpf);
            localStorage.setItem("userEndereco", userData.endereco);
            localStorage.setItem("userTelefone", userData.telefone);
            localStorage.setItem("userAlertaSms", userData.alerta_sms);
            localStorage.setItem("userAlertaEmail", userData.alerta_email);
            localStorage.setItem("userAcess", userData.acesso);

            // Atualizar estado
            setUser(userData);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const value = {
        user,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}; 