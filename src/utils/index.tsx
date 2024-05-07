import { AxiosResponse } from 'axios';
import { APISuccessResponseInterface } from '../interface/api';

// A utility function for handling API requests with loading, success, and error handling
export const requestHandler = async (
    api: () => Promise<AxiosResponse<APISuccessResponseInterface, any>>,
    setLoading: ((state: boolean) => void )| null,
    onSuccess: (data: APISuccessResponseInterface) => void,
    onError: (error: string) => void
) => {
    // Show loading state if setLoading function is provided
    setLoading && setLoading(true);
    // loading.value = true;
    try {
        // Make the API request
        const response = await api();
        
        const { data } = response;
        console.log(response);
        
        
        if (data?.success) {
            
            // Call the onSuccess callback with the response data
            onSuccess(data);
        }
    } catch (error: any) {
        onError(error?.response?.data?.message || 'Something went wrong');
        console.log(error);
        
    } finally {
        // Hide loading state if setLoading function is provided
        setLoading && setLoading(false);
    }
};