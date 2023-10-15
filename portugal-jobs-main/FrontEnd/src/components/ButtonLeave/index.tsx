import React, {useState , useContext} from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { View, Text, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';

import api from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { UserInfoDataContext } from '../../contexts/UserInfoProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function ButtonLeave( {...rest}: RectButtonProps){

    const { setUserData } = useContext(UserInfoDataContext);

    const navigation = useNavigation();

    async function LogoutUserAPI() {
    try {
        const reqData = await api.delete('/logout');
        Alert.alert('Info', reqData.data.message, [
            { text: 'OK', onPress: () => { navigation.navigate('TelaInicial' as never) } }
        ])
        await AsyncStorage.removeItem('@PortugalJobs:userToken');
        setAuthToken(undefined);
    } catch (e: any) {
        Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
            { text: 'OK' }
        ])
        }
    }

    return (
        <RectButton
            style={styles.container}
            onPress={LogoutUserAPI}
        >
            
            <MaterialIcons
                name="logout"
                size={24}
                color="black"
            />

        </RectButton>
    )
}