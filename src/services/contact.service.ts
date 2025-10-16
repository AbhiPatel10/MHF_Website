// src/services/contact.service.ts

import axiosInstance from "@/utils/axiosInstance";

export interface TCreateContactPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

export const createContact = async (
    payload: TCreateContactPayload
): Promise<ApiResponse<any>> => {
    const { data } = await axiosInstance.post<ApiResponse<any>>(
        `/v1/contact/createContact`,
        payload
    );
    return data;
};
