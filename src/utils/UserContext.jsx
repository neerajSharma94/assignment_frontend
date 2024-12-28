import React, { createContext, useReducer } from "react";

// Create the User Context
export const UserContext = createContext();

// Define initial state
const initialState = {
    token: null,
    role: null,
    isAuthenticated: false,
    username: null,
};

// Define reducer to handle actions
const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                token: action.payload.token,
                role: action.payload.role,
                username: action.payload.username,
                isAuthenticated: true,
            };
        case "LOGOUT":
            return {
                ...state,
                token: null,
                role: null,
                username: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

// Create the Provider Component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
