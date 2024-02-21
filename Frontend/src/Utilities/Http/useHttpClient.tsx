import React, { useCallback, useContext, useState } from 'react';
import AxiosInstance from "./axiosInstance"
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import UserAssistant from '../User/UserAssistant';
import { UserContext } from '../../Contexts/UserContext';
import { Http } from '../../Model/Enums/Http';


interface Response<T> {
    response: T | null;
    errorMessage: string | null;
    statusCode: string
}

export interface UseHttpClientResponse<T> {
    isLoading: boolean;
    send: (requests: RequestObject) => Promise<Response<T>>;

}

type RequestObject = AxiosRequestConfig & { url: string; method?: AxiosRequestConfig['method']; data?: any };




export default function useHttpClient<T>(): UseHttpClientResponse<T> {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    var { user, setUser } = useContext(UserContext);
    const send = async (
        request: RequestObject
    ) => {
        setIsLoading(true);

        try {

            if (request.method?.toLowerCase() === 'get' && request.data) {
                // Convert data to query params
                request.params = request.data;
                // Remove the data property
                delete request.data;
            }
            var res = await AxiosInstance.request<T>(request);
            setIsLoading(false);
            return { response: res.data, errorMessage: null, statusCode: '200' };
        } catch (error: any) {
            setIsLoading(false);
            let errorMessage: string = '';


            if (error?.response?.data && error?.response?.data?.isSuccess === false) {
                var _error = error?.response?.data;
                if ((typeof _error?.message) === 'string') {
                    errorMessage = _error?.message
                } else {
                    errorMessage = 'An unknown error occurred';
                }

            } else if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    errorMessage = 'UnAuthorized';
                    UserAssistant().LogOut();
                    setUser(null)
                    // window.location.href = '/signin'; // Redirect to login page
                } else {
                    if (error.response?.data) {
                        const errorData = error.response?.data;


                        if (errorData?.isError === true &&
                            errorData?.result?.exceptionMessage?.error?.details?.validationErrors &&
                            (errorData?.result?.exceptionMessage?.error?.details?.validationErrors as any[]).length > 0) {


                            var errorArray = (errorData?.result?.exceptionMessage?.error?.details?.validationErrors as any[])

                            errorMessage = errorArray.map((item: any) => item.message).join('\n')
                        }


                        else


                            if (errorData?.isError === true && errorData?.result?.exceptionMessage?.error?.details) {
                                errorMessage = errorData?.result?.exceptionMessage?.error?.details;
                            }


                            else if (errorData?.isError === true && errorData?.result?.exceptionMessage?.error?.message) {
                                errorMessage = errorData?.result?.exceptionMessage?.error?.message;
                            } else if (!errorData) {
                                errorMessage = 'An unknown error occurred';
                            } else if (typeof errorData == "string") {
                                errorMessage = errorData;
                            } else if (errorData.errors) {
                                errorMessage = Object.entries(errorData.errors)
                                    .map(([_, errors]) => `${(errors as string[]).join(', ')}`)
                                    .join('; ');
                            } else if (errorData.title) {
                                errorMessage = errorData.title;
                            } else {
                                errorMessage = 'An unknown error occurred';
                            }
                    } else if (error.response?.status) {
                        errorMessage = `Request failed with status code ${error.response.status}`;
                    }
                }
            } else if (error instanceof Error && error.message === 'Network Error') {
                errorMessage = 'A network error occurred. Please try again later.';
            } else {
                errorMessage = 'An unknown error occurred';
            }
            return { response: null, errorMessage, statusCode: error.response?.status };
        }
    }

    return {
        isLoading,
        send,
    };
}


