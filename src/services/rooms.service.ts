import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + 'rooms'
});

const getAll = async () => {
    try {
        const response: any = await api.get('/');
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
};

const getById = async (id: string) => {
    try {
        const response: any = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
};

const search = async (filter: any) => {
    try {
        const response: any = await api.get('/search', { params: filter });
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

const create = async (data: any) => {
    try {
        const response: any = await api.post('/', data);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

const update = async (id: string, data: any) => {
    try {
        const response: any = await api.put(`/${id}`, data);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

const remove = async (id: string) => {
    try {
        const response: any = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

export const RoomService = {
    getAll,
    getById,
    search,
    create,
    update,
    remove
}