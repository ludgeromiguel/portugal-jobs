import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface UserInfoProviderProps {
    children: ReactNode
}

export interface IUserInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    number: number;
    isVerified: boolean;
}

interface UserInfoDataContext {
    userData: IUserInfo | undefined;
    setUserData: Dispatch<SetStateAction<IUserInfo | undefined>>;
}

export const UserInfoDataContext = createContext({} as UserInfoDataContext)

export function UserInfoContextProvider({ children }: UserInfoProviderProps) {
    const [userData, setUserData] = useState<IUserInfo | undefined>(undefined);

    return (
        <UserInfoDataContext.Provider
            value={{
                userData,
                setUserData
            }}
        >
            {children}
        </UserInfoDataContext.Provider>
    )
}