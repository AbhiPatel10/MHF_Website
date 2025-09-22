import axiosInstance from "@/utils/axiosInstance";

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface GalleryImage {
    _id: string
    image: Image
    altText: string
    imageDescription: string
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Image {
    _id: string
    url: string
}

// Get all gallery images with pagination
export const getAllGalleryImagesApi = async (
    offset: number = 0,
    limit: number = 10
): Promise<ApiResponse<{ galleryImages: GalleryImage[]; totalCount: number }>> => {
    const { data } = await axiosInstance.get<
        ApiResponse<{ galleryImages: GalleryImage[]; totalCount: number }>
    >("/v1/gallery/getGalleryImages", {
        params: { offset, limit },
    });
    return data;
};
