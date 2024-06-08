import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateAccount } from '../pages/CreateAccount';
import { TelaInicial } from '../pages/InitialPage';
import { Login } from '../pages/LoginPage';
import { TelaVerificacaoConta } from '../pages/VerificationAccountScreen';
import { CreateAnnounce } from '../pages/CreateAnnounce';
import { HomePage } from '../pages/HomePage';
import { ChangeData } from '../pages/ChangeData';
import colors from '../styles/colors';
import { EditCV } from '../pages/EditCV';
import { SeeAd } from '../pages/SeeAd';
import { SpecificAnnounce } from '../pages/SpecificAnnounce';
import { SeeMyAnnounce } from '../pages/SeeMyAnnounces';
import { SeeCands } from '../pages/SeeCands';
import { EditAnnounce } from '../pages/EditAnnounce';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        screenOptions={{
            //Ocultar o cabeçalho
            headerShown: false,
            cardStyle: {
                // Cor da App ser branca
                backgroundColor: colors.white
            },
        }}
    >

        {/* Defenir a navegação, qual as telas para ir */}
        <StackRoutes.Screen
            name="TelaInicial"
            component={TelaInicial} />

        <StackRoutes.Screen
            name="Login"
            component={Login} />

        <StackRoutes.Screen
            name="CreateAccount"
            component={CreateAccount} />

        <StackRoutes.Screen
            name="TelaVerificacaoConta"
            component={TelaVerificacaoConta} />

        <StackRoutes.Screen
            name="HomePage"
            component={HomePage} />

        <StackRoutes.Screen
            name="ChangeData"
            component={ChangeData} />

        <StackRoutes.Screen
            name="EditCV"
            component={EditCV} />

        <StackRoutes.Screen
            name="CreateAnnounce"
            component={CreateAnnounce} />

        <StackRoutes.Screen
            name="SeeAd"
            component={SeeAd} />

        <StackRoutes.Screen
            name="SeeSpecificAdd"
            component={SpecificAnnounce} />

        <StackRoutes.Screen
            name="SeeMyAnnounce"
            component={SeeMyAnnounce} />

        <StackRoutes.Screen
            name="SeeCand"
            component={SeeCands} />

        <StackRoutes.Screen
            name="EditAnnounce"
            component={EditAnnounce} />
    </StackRoutes.Navigator>
)

export default AppRoutes;
