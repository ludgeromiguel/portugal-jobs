import AsyncStorage from "@react-native-async-storage/async-storage";
import api from './api';

// condição que dá set ao token
const setAuthToken = async (token?: string) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await AsyncStorage.setItem('@PortugalJobs:userToken', token);
    } else {
        delete api.defaults.headers.common['Authorization'];
        await AsyncStorage.removeItem('@PortugalJobs:userToken');
    }
};

export default setAuthToken;