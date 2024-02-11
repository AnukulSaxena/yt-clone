import axios from 'axios';
import conf from '../conf/conf.js';

class VideoService {
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
            this.setAuthToken(token);
        }
    }

    setAuthToken(token) {
        if (token) {
            console.log("playlsitconfig :: setauthtoken :: token", token)
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token['accessToken']}`;
        } else {
            delete this.axiosInstance.defaults.headers.common['Authorization'];
        }
    }

    async uploadVideo(data) {
        try {
            const newData = { ...data }
            newData['videoFile'] = data.videoFile[0] || ''
            newData['thumbnail'] = data.thumbnail[0] || ''
            const response = await this.axiosInstance.post('/videos', newData, {
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

}

const videoService = new VideoService();
export default videoService;