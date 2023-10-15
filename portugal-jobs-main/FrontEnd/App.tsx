import React from 'react';
import Routes from './src/routes';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import { UserInfoContextProvider } from './src/contexts/UserInfoProvider';
import { AnnounceInfoContextProvider } from './src/contexts/AnnounceInfoProvider';
import { CandidacyInfoContextProvider } from './src/contexts/CandidacyInfoProvider';
import { SpecificAnnounceInfoProvider } from './src/contexts/SpecificAnnounceInfoProvider';
import { SeeAnnounceCandsInfoProvider } from './src/contexts/SeeAnnounceCandsInfoProvider';

export default function App() {
  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_600SemiBold });

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <UserInfoContextProvider>
      <AnnounceInfoContextProvider>
        <SpecificAnnounceInfoProvider>
          <CandidacyInfoContextProvider>
            <SeeAnnounceCandsInfoProvider>
              <Routes />
            </SeeAnnounceCandsInfoProvider>
          </CandidacyInfoContextProvider>
        </SpecificAnnounceInfoProvider>
      </AnnounceInfoContextProvider>
    </UserInfoContextProvider>
  );
}

