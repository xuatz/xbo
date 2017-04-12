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
            ...form,
        })
            .then(res => {
                console.log('11111111');
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
                console.log('222222');
                console.log(err);
                throw err;
            });
    };
};
