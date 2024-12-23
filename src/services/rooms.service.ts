import api from "./api.service";

const getAll = async () => {
    try {
        const response: any = await api.get('/rooms');
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
};

const getById = async (id: string) => {
    try {
        const response: any = await api.get(`/rooms/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
};

const search = async (filter: any) => {
    try {
        const response: any = await api.get('/rooms/search', { params: filter });
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

const create = async (data: any) => {
    try {
        const response: any = await api.post('/rooms', data);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

const update = async (id: string, data: any) => {
    try {
        const response: any = await api.put(`/rooms/${id}`, data);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
    }
}

const remove = async (id: string) => {
    try {
        const response: any = await api.delete(`/rooms/${id}`);
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