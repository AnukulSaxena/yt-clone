import axios from 'axios';
import conf from '../conf/conf.js';

class LikeService {
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

    async toggleVideoLike(videoId) {
        try {
            const response = await this.axiosInstance.post(`/likes/toggle/v/${videoId}`);
            console.log(response)
            return true
        } catch (error) {
            console.log('likeConfig:: toggleVideoLike :: error', error);
            return false
        }
    }

    async toggleCommentLike(commentId) {
        try {
            const response = await this.axiosInstance.post(`/likes/toggle/c/${commentId}`);
            console.log(response)
            return true
        } catch (error) {
            console.log('likeConfig:: toggleCommentLike :: error', error);
            return false
        }
    }

    async toggleTweetLike(tweetId) {
        try {
            const response = await this.axiosInstance.post(`/likes/toggle/t/${tweetId}`);
            console.log(response)
            return true
        } catch (error) {
            console.log('likeConfig:: toggleTweetLike :: error', error);
            return false
        }
    }
}

const likeService = new LikeService();
export default likeService;