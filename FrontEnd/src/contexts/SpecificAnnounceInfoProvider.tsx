import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface SpecificAnnounceProviderProps {
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

interface SpecificAnnounceDataContext {
    announceID: string | undefined;
    setAnnounceID: Dispatch<SetStateAction<string | undefined>>;
    announceData: IAnnounceInfo | undefined;
    setAnnounceData: Dispatch<SetStateAction<IAnnounceInfo | undefined>>;
}

export const SpecificAnnounceDataContext = createContext({} as SpecificAnnounceDataContext)

export function SpecificAnnounceInfoProvider({ children }: SpecificAnnounceProviderProps
) {
    const [announceID, setAnnounceID] = useState<string | undefined>(undefined);
    const [announceData, setAnnounceData] = useState<IAnnounceInfo | undefined>(undefined);

    return (
        <SpecificAnnounceDataContext.Provider
            value={{
                announceID,
                setAnnounceID,
                announceData,
                setAnnounceData
            }}
        >
            {children}
        </SpecificAnnounceDataContext.Provider>
    )
}