export interface IUserAdminInfo {
    pagination: IPagination;
    data: IEmployee[];
}

export interface IPagination {
    total: number;
    pages: number;
    page: number;
    limit: number;
}

export interface IEmployee {
    id: number;
    name: string;
    surname: string;
    dateOfBirth: string;
    position: string;
    phoneNumber: string;
}
