import axios from 'axios';

export const authService = {
    login: async (email, password) => {
        const { data } = await axios.post('/auth/login', { email, password });
        
        if (data) {
            const user = { ...data, id: data._id };
            return { token: data.token, user };
        }
        throw new Error("Login failed. Please check your credentials.");
    },

    register: async (name, email, password) => {
        const { data } = await axios.post('/auth/register', { name, email, password });
        
        if (data) {
            const user = { ...data, id: data._id };
            return { token: data.token, user };
        }
        throw new Error("Registration failed. Please try again.");
    },

    forgotPassword: async (email) => {
        const { data } = await axios.post('/auth/forgotpassword', { email });
        return data;
    },

    resetPassword: async (token, password) => {
        const { data } = await axios.put(`/auth/resetpassword/${token}`, { password });
        if (data) {
            const user = { ...data, id: data._id };
            return { token: data.token, user };
        }
        throw new Error("Password reset failed.");
    }
};