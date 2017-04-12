import Router from 'next/router';
import axios from 'axios';

let API = axios.create({
    baseURL: 'http://' + process.env.API_URL,
    withCredentials: true,
    timeout: 5000,
});

export const signup = form => {
    return dispatch => {
        return API.post('/signup', {
            data: {
                ...form,
            },
        })
            .then(res => {
                console.log(res);

                if (res.data && res.data.error) {
                    return {
                        error: res.data.error,
                    };
                }
                return {
                    status: res.status,
                };
            })
            .catch(err => {
                console.log('error in signup action');
                console.log(err);
                throw err;
            });
    };
};
