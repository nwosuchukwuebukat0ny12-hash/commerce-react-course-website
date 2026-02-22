/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) { 
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("currentUser")) || null;
        } catch {
            return null;
        }
    });

    function signUp(email, password) {
        // Simulate API call
        try {
            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = existingUsers.some(u => u.email === email);
            
            if (userExists) {
                return { success: false, error: "User already exists" };
            }
            
            const newUser = { email, password };
            existingUsers.push(newUser);
            localStorage.setItem("users", JSON.stringify(existingUsers));
            setUser(newUser);
            try {
                localStorage.setItem("currentUser", JSON.stringify(newUser));
            } catch (error) {
                console.warn("Failed to persist currentUser", error);
            }
            return { success: true };
        } catch (error) {
            console.warn("Sign up error", error);
            return { success: false, error: "Sign up failed" };
        }
    }

    function login(email, password) {
        // Simulate API call
        try {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const foundUser = users.find(u => u.email === email && u.password === password);
            
            if (!foundUser) {
                return { success: false, error: "Invalid email or password" };
            }
            
            setUser(foundUser);
            try {
                localStorage.setItem("currentUser", JSON.stringify(foundUser));
            } catch (error) {
                console.warn("Failed to persist currentUser", error);
            }
            return { success: true };
        } catch (error) {
            console.warn("Login error", error);
            return { success: false, error: "Login failed" };
        }
    }

    function logout() {
        setUser(null);
        try {
            localStorage.removeItem("currentUser");
        } catch (error) {
            console.warn("Failed to remove currentUser", error);
        }
    }

    return <AuthContext.Provider value={{ signUp, login, logout, user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

