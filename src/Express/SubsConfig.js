import axios from 'axios';
import conf from '../conf/conf.js';

class SubscriptionService {
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

    async toggleSubscription(channelId) {
        console.log(channelId)
        try {
            const response = await this.axiosInstance.post(`/subscriptions/c/${channelId}`);
            console.log(response.data)
            return true
        } catch (error) {
            console.log('Express service :: createtoggleSub :: error', error);
            return false
        }
    }

    async getSubsCount(channelId) {
        try {
            let response = await this.axiosInstance.get(`/subscriptions/c/check/${channelId}`);
            return response.data.data
        } catch (error) {
            console.error("SubsConfig :: getSubsCheck :: error", error)
            return null
        }
    }
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;