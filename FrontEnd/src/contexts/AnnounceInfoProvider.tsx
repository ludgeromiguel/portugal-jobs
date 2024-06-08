import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface AnnounceInfoProviderProps {
    children: ReactNode
}

export interface IAnnounceInfo {
    id: string,
    ownerID: string,
    companyName: string,
    local: string,
    salary: number,
    isNegotiable: boolean,
    role: string,
    typeJob: string,
    description: string,
    requirements?: string,
    contractType: string,
    createdAt: string,
    updatedAt: string
}

interface AnnounceInfoDataContext {
    announceID: string | undefined;
    setAnnounceID: Dispatch<SetStateAction<string | undefined>>;
    announceData: IAnnounceInfo[] | undefined;
    setAnnounceData: Dispatch<SetStateAction<IAnnounceInfo[] | undefined>>;
}

export const AnnounceInfoDataContext = createContext({} as AnnounceInfoDataContext)

export function AnnounceInfoContextProvider({ children }: AnnounceInfoProviderProps) {
    const [announceData, setAnnounceData] = useState<IAnnounceInfo[] | undefined>([]);
    const [announceID, setAnnounceID] = useState<string | undefined>(undefined);

    return (
        <AnnounceInfoDataContext.Provider
            value={{
                announceID,
                setAnnounceID,
                announceData,
                setAnnounceData
                
            }}
        >
            {children}
        </AnnounceInfoDataContext.Provider>
    )
}