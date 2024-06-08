import React, { useEffect, useContext } from 'react';
import {
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Alert
} from 'react-native';
import splashImg from '../../assetss/Logo.png';
import { useNavigation } from '@react-navigation/core';
// import style
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../../utils/setAuthToken';
import api from '../../utils/api';
import { UserInfoDataContext } from '../../contexts/UserInfoProvider';

export function TelaInicial() {
    const { setUserData } = useContext(UserInfoDataContext);

    const navigation = useNavigation();

    // Função para entrar na Página do Login
    function PageLogin() {
        navigation.navigate('Login' as never)
    }

    // Função para entrar na Página do Create Account
    function PageCriarConta() {
        navigation.navigate('CreateAccount' as never)
    }

    function PageVerifcarConta() {
        navigation.navigate('TelaVerificacaoConta' as never)
    }

    async function verifyUserToken() {
        try {
            const userToken = await AsyncStorage.getItem('@PortugalJobs:userToken')

            if (!userToken) return;

            setAuthToken(userToken);

            const userData = await api.get('/@me');

            if (!userData || !userData.data || !userData.data.user) return;

            if (!userData.data.user.isVerified) {
                return Alert.alert('Info', 'Verifique a sua conta.', [
                    { text: 'OK', onPress: () => { PageVerifcarConta() } }
                ])
            }

            setUserData(userData.data.user);

            navigation.navigate('HomePage' as never)
        } catch (e: any) {
            if (e.response && e.response.status) {
                switch (e.response.status) {
                    case 401:
                        Alert.alert('Info', 'Sessão expirada, faça login novamente.', [
                            { text: 'OK', onPress: () => { PageLogin() } }
                        ])
                        await AsyncStorage.removeItem('@PortugalJobs:userToken');
                        break;
                    case 406:
                        Alert.alert('Info', 'Verifique a sua conta.', [
                            { text: 'OK', onPress: () => { PageVerifcarConta() } }
                        ])
                        break;
                    default:
                        console.log(e);
                        break;
                }
            }

            console.log(e)
        }
    }

    useEffect(() => {
        verifyUserToken();
    }, [])

    return (

        <SafeAreaView style={styles.container}>
            <Image
                source={splashImg}
                style={{ ...styles.image, marginBottom: 45 }}
                resizeMode="contain"
            />

            <TouchableOpacity style={{ ...styles.button, marginBottom: 41 }} activeOpacity={0.7} onPress={PageLogin}>

                <Text style={styles.buttonText}>
                    LOGIN
                </Text>

            </TouchableOpacity>

            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={PageCriarConta}>

                <Text style={styles.buttonText}>
                    REGISTER
                </Text>

            </TouchableOpacity>

        </SafeAreaView>
    )
}


