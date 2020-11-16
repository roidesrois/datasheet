import HttpError from '../../core/HttpError';
import { TOKEN } from '../../consts';

export const fetchUsers = dt => async () => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/public-api/users?page=${dt.page}&id=${dt.id}&first_name=${dt.first_name}&status=${dt.status}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );

    const jsonData = await response.json();

    if (!response.ok) {
        throw new HttpError(jsonData.error, response.status);
    }

    return jsonData;
};

export const deleteUser = async id => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/public-api/users/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });

    const jsonData = await response.json();
    if (!response.ok) {
        throw new HttpError(jsonData.error, response.status);
    }
};

export const addNewUser = async data => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/public-api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify(data)
    });

    const jsonData = await response.json();
    if (!response.ok) {
        throw new HttpError(jsonData.error, response.status);
    }
};

export const editUser = async (id, data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/public-api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify(data)
    });

    const jsonData = await response.json();
    if (!response.ok) {
        throw new HttpError(jsonData.error, response.status);
    }
};
