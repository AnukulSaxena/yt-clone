import axios from 'axios';
import conf from '../conf/conf.js';

class AuthService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.expressUrl,
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true,
        });
        this.setAuthTokenFromLocalStorage();
    }
    setAuthTokenFromLocalStorage() {
        const token = localStorage.getItem('yt-clone-token');
        if (token) {
            console.log(token);
            this.setAuthToken(token);
        }
    }

    setAuthToken(token) {
        if (token) {
            console.log(typeof (token))
            console.log("playlsitconfig :: setauthtoken :: token", token)
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token['accessToken']}`;
        } else {
            delete this.axiosInstance.defaults.headers.common['Authorization'];
        }
    }

    async createAccount(data) {
        try {
            const newData = { ...data }
            newData['avatar'] = data.avatar[0] || ''
            newData['coverImage'] = data.coverImage[0] || ''
            const response = await this.axiosInstance.post('/users/register', newData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log('Express service :: createAccount :: error', error);
            throw error?.response?.data;
        }
    }


    async loginAccount(data) {
        try {
            const response = await this.axiosInstance.post('/users/login', data);
            const tokenObject = {
                accessToken: response.data.data.accessToken,
                refreshToken: response.data.data.refreshToken
            };

            localStorage.setItem("yt-clone-token", JSON.stringify(tokenObject));
            return response.data;
        } catch (error) {
            console.log('Appwrite service :: login :: error', error);
            throw error?.response?.data;

        }
    }

    async getCurrentUser() {
        try {
            return await this.axiosInstance.get('/users/current-user')
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            return null
        }
    }

    async logoutAccount() {
        try {
            console.log("Logout clicked");
            localStorage.removeItem("token");
            this.setAuthToken(null);
            return await this.axiosInstance.post('/users/logout')

        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            throw error
        }
    }
}

const authService = new AuthService();
export default authService;