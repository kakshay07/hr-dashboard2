// Import necessary modules and utilities
import axios from 'axios';
import { jobData } from '../interface/jobOpenings';

// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 120000,
});

apiClient.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// API functions for different actions

export const loginUser = (data: { username: string; password: string }) => {
    return apiClient.post('/user/login', data);
};

export const getAllJobOpenings = () => {
    return apiClient.get('/get/jobs');
};

export const addJobOpening = (data : jobData) => {
    return apiClient.post('/Add/jobs' , data);
};

export const editJobOpening = (data : jobData) => {
    // console.log(data);
    return apiClient.put(`/update/${data.id}` , data);
};

export const deleteJobOpening = (data : {jobId : string}) => {
    return apiClient.post('/job' , data);
};

export const getAllJobApplicants = () => {
    return apiClient.get('/get/applicants');
};