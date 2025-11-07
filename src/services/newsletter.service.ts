import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/utils/types/api.Response";

export type TNewsletter = {
    email: string;
    isSubscribed?: boolean;
    createdAt?: string;
};

export const subscribeNewsletterApi = async (
    email: string
): Promise<ApiResponse<{ message: string }>> => {
    const { data } = await axiosInstance.post<ApiResponse<{ message: string }>>(
        "/v1/newsletter/subscribe",
        { email }
    );
    return data;
};
