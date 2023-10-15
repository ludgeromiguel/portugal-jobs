import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface CandidacyInfoProviderPros {
    children: ReactNode
}

export interface ICandidacyInfo {
    id: string,
    ownerID: string,
    anuncioID: string,
    status: number,
    nomeAnuncio: string,
    nomeCompanhia: string,
    createdAt: string,
    updatedAt: string
}

interface CandidacyInfoDataContext {
    candidacyData: ICandidacyInfo[] | undefined;
    setCandidacyData: Dispatch<SetStateAction<ICandidacyInfo[] | undefined>>;
}

export const CandidacyInfoDataContext = createContext({} as CandidacyInfoDataContext)

export function CandidacyInfoContextProvider({ children }: CandidacyInfoProviderPros) {
    const [candidacyData, setCandidacyData] = useState<ICandidacyInfo[] | undefined>([]);
    const [candidaturasID, setcandidaturasID] = useState<string | undefined>(undefined);

    return (
        <CandidacyInfoDataContext.Provider
            value={{
                candidacyData,
                setCandidacyData
            }}
        >
            {children}
        </CandidacyInfoDataContext.Provider>
    )
}