export interface TGetAllTeamMembers {
    _id: string
    name: string
    address: Address
    bloodGroup: string
    birthdate: string
    occupation: string
    skills: string[]
    phoneNo: string
    image: Image
    isActive: boolean,
    role: string,
    memberType: TeamMemberTypes
}

export interface Image {
    _id: string
    url: string
}

export enum TeamMemberTypes {
    ASSET = "Asset",
    KEY_MEMBER = "Key Member",
    VOLUNTEER = "Volunteer"
}

export interface Address {
    city: string
    state: string
    postalCode: string
}