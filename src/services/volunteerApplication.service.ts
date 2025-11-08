import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/utils/types/api.Response";

// ------------------- Types -------------------

export interface VolunteerApplication {
    _id?: string;
    fullName: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    bloodGroup?: string;
    reason?: string;
    isActive?: boolean;
    isDelete?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// ------------------- Volunteer Application APIs -------------------

// Apply as Volunteer
export const applyAsVolunteerApi = async (
    payload: Omit<VolunteerApplication, "_id" | "isActive" | "isDelete" | "createdAt" | "updatedAt">
): Promise<ApiResponse<VolunteerApplication>> => {
    const { data } = await axiosInstance.post<ApiResponse<VolunteerApplication>>(
        "/v1/volunteerApplication/applyAsVolunteers",
        payload
    );
    return data;
};
