import axiosInstance from "@/utils/axiosInstance";
import { ApiResponse } from "@/utils/types/api.Response";

export type TCategory = {
  _id: string;
  name: string;
  description?: string;
};

export const getAllCategoriesApi = async (): Promise<
  ApiResponse<{ categories: TCategory[] }>
> => {
  const { data } = await axiosInstance.get<ApiResponse<{ categories: TCategory[] }>>(
    "/v1/category/getAllCategories"
  );
  return data;
};
