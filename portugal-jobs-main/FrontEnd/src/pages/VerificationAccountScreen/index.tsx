import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  TextInput,
  Alert
} from 'react-native';

//imports para a api
import api from '../../utils/api';

//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';

import { UserInfoDataContext } from '../../contexts/UserInfoProvider';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TelaVerificacaoConta() {

  const navigation = useNavigation();

  // criação de useStates para buscar o valor dos dados da app
  const [cod, setCod] = useState('')

  // Variável para armazenar se pode reenviar ou não o código de verificação
  const [canResendCode, setCanResendCode] = useState(false)

  const { setUserData } = useContext(UserInfoDataContext);

  // Função para entrar na Página do Login
  function HomePage() {
    navigation.navigate('HomePage' as never)
  }

  async function VerificationAccount() {
    if (!cod) {
      return Alert.alert('ERRO', 'Tens de preencher o código de verificação')
    }

    const data = {
      verifyCode: cod
    }

    try {
      const response = await api.put("/@me/verificateAccount", data);
      if (response.data) {
        await AsyncStorage.removeItem('@PortugalJobs:nextResendDate')
        const userData = await api.get('/@me');

            if (!userData || !userData.data || !userData.data.user) return;
            setUserData(userData.data.user);
        Alert.alert('Sucesso', response.data.message, [
          { text: 'OK', onPress: () => { HomePage() } }
        ])
      } else {
        Alert.alert('ERRO', 'Ocorreu um erro Verificação', [
          { text: 'OK' }
        ])
      }
    } catch (e: any) {
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
        { text: 'OK' }
      ])
    }

  }

  async function getCode() {
    setCanResendCode(false)

    const nextResend = await AsyncStorage.getItem('@PortugalJobs:nextResendDate')
    console.log(nextResend)
    if (nextResend) {
      const nextResendDate = new Date(nextResend)
      const now = new Date()
      if (nextResendDate > now) {
        return changeResendCode(nextResendDate)
      }
    }

    try {
      const response = await api.get("/@me/verificationCode");
      if (response.data) {
        Alert.alert('Sucesso', response.data.message)
      }

      const date = new Date(Date.now() + (30 * 60000));

      await AsyncStorage.setItem('@PortugalJobs:nextResendDate', date.toString());

      changeResendCode(date)
    } catch (e: any) {
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro a enviar o código, tente novamente mais tarde.', [
        { text: 'OK' }
      ])
      if (!e.response) setCanResendCode(true)
    }
  }

  // Função para ativar ou desativar o butão de reenviar o código
  async function changeResendCode(lastResendDate: Date) {
    const currentDate = new Date()

    if (lastResendDate < currentDate) return setCanResendCode(true)

    setTimeout(async () => {
      setCanResendCode(true)
      await AsyncStorage.removeItem('@PortugalJobs:nextResendDate');
    }, lastResendDate.getTime() - currentDate.getTime())
  }

  useEffect(() => {
    getCode()
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.TitleText}>
        CÓDIGO VERIFICAÇÃO
      </Text>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 12, marginBottom: 39 }} />

      <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
        Código:
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Inserir Aqui..."
        autoCapitalize="characters"
        onChangeText={text => setCod(text.toUpperCase())}
        value={cod}
      />

      {/*Traço de Baixo*/}
      <View style={{ ...styles.Line, marginTop: 53, marginBottom: 29 }} />

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 25 }} activeOpacity={0.7} onPress={getCode} disabled={!canResendCode}>
          <Text style={styles.buttonText}>
            REENVIAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={VerificationAccount}>
          <Text style={styles.buttonText}>
            VALIDAR
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}