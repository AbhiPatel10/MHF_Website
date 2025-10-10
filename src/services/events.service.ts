import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/utils/types/api.Response";

// ------------------- Types -------------------

export interface TEvent {
    _id: string
    name: string
    category: string
    date: string
    location: string
    image: Image
    description: Description
    isActive: boolean
    isDelete: boolean
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Image {
    _id: string
    url: string
    publicId: string
    altText: string
    mimeType: string
    createdOn: string
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Description {
    time: number
    blocks: Block[]
    version: string
}

export interface Block {
    id: string
    type: string
    data: Data
}

export interface Data {
    text: string
}


// ------------------- Event APIs -------------------

// Get all Events (with pagination + optional search)
export const getAllEventsApi = async ({ limit, offset, search }: {
    offset: number,
    limit: number,
    search: string
}): Promise<ApiResponse<{ events: TEvent[]; totalCount: number }>> => {
    const { data } = await axiosInstance.get<
        ApiResponse<{ events: TEvent[]; totalCount: number }>
    >("/v1/event/getAllEvents", {
        params: { offset, limit, search },
    });
    return data;
};

// Get single Event by ID
export const getEventByIdApi = async (
    eventId: string
): Promise<ApiResponse<TEvent>> => {
    const { data } = await axiosInstance.get<ApiResponse<TEvent>>(
        `/v1/event/getEventDetails/${eventId}`
    );
    return data;
};
