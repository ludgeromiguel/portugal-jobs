import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface SeeAnnounceCands {
    children: ReactNode
}

export interface ISeeAnnounceCandsInfo {
    id: string,
    ownerID: string,
    anuncioID: string,
    status: number,
    ownerFirstName: string,
    ownerLastName: string,
    ownerUsername: string,
    createdAt: string,
    updatedAt: string
}

interface SeeAnnounceCandsDataContext {
    announceID: string | undefined;
    setAnnounceID: Dispatch<SetStateAction<string | undefined>>;
    candsData: ISeeAnnounceCandsInfo[] | undefined;
    setCandData: Dispatch<SetStateAction<ISeeAnnounceCandsInfo[] | undefined>>;
}

export const SeeAnnounceCandsDataContext = createContext({} as SeeAnnounceCandsDataContext)

export function SeeAnnounceCandsInfoProvider({ children }: SeeAnnounceCands) {
    const [announceID, setAnnounceID] = useState<string | undefined>(undefined);
    const [candsData, setCandData] = useState<ISeeAnnounceCandsInfo[] | undefined>(undefined);

    return (
        <SeeAnnounceCandsDataContext.Provider
            value={{
                announceID,
                setAnnounceID,
                candsData,
                setCandData,
            }}
        >
            {children}
        </SeeAnnounceCandsDataContext.Provider>
    )
}