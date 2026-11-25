export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: string;
    status?: boolean;
}

export interface IUpdateUserPayload {
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: string | null;
    status?: boolean | null;
}
