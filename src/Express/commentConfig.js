import axios from 'axios';
import conf from '../conf/conf.js';

class CommentService {
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
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token['accessToken']}`;
        } else {
            delete this.axiosInstance.defaults.headers.common['Authorization'];
        }
    }

    async createComment(content, videoId) {
        console.log(content)
        try {
            const response = await this.axiosInstance.post(`/comments/${videoId}`, { content });
            return response.data.data
        } catch (error) {
            console.log('Express service :: createAccount :: error', error);
            return null
        }
    }

    async getCommets(videoId) {
        try {
            let response = await this.axiosInstance.get(`/comments/${videoId}`);
            console.log("commentConfig :: getcomments:: response", response.data.data)
            return response.data.data
        } catch (error) {
            console.error("VideoConfig :: getallVideos :: error", error)
            return []
        }
    }

}

const commentService = new CommentService();
export default commentService;