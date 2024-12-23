import api from "./api.service";

const login = async (data: any) => {
    const response = await api.post('/auth/login', data);

    if (response) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userInformation', JSON.stringify(response.data.userInformation));
    }

    return response;
}

const register = async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response;
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInformation');
}

export const AuthService = {
    login,
    register,
    logout
};