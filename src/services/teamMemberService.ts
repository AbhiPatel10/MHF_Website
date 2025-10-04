import axiosInstance from "@/utils/axiosInstance";
import { TGetAllTeamMembers } from "@/utils/types/teamMember.types";

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

// Get all team members with pagination & search
export const getAllTeamMembersApi = async (
    offset: number = 0,
    limit: number = 0,
    search: string = "",
    memberType: string = ""
): Promise<ApiResponse<{ teamMembers: TGetAllTeamMembers[]; totalCount: number }>> => {
    const { data } = await axiosInstance.get<
        ApiResponse<{ teamMembers: TGetAllTeamMembers[]; totalCount: number }>
    >("/admin/team/getAllTeamMembers", {
        params: { offset, limit, search, memberType },
    });
    return data;
};