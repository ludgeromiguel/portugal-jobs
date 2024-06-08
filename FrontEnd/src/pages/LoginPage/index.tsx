import React, { useState, useContext } from 'react';
//imports do react native
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  TextInput,
  Alert
} from 'react-native';

//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';
// import style
import { styles } from './style';
//imports para a api
import api from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { UserInfoDataContext } from '../../contexts/UserInfoProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login() {
  const { setUserData } = useContext(UserInfoDataContext);

  const navigation = useNavigation();

  // criação de useStates para buscar o valor dos dados da app
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Função para voltar a pagina inicial
  function BackButton() {
    navigation.navigate('TelaInicial' as never)
  }

  async function RedirectUSerToCorrectPage() {
    try {
      const userData = await api.get('/@me');

      if (!userData || !userData.data || !userData.data.user) return;

      if (!userData.data.user.isVerified) {
          return Alert.alert('Info', 'Verifique a sua conta.', [
              { text: 'OK', onPress: () => { navigation.navigate('TelaVerificacaoConta' as never) } }
          ])
      }

      setUserData(userData.data.user);

      navigation.navigate('HomePage' as never)
  } catch (e: any) {
      if (e.response && e.response.status) {
          switch (e.response.status) {
              case 401:
                  Alert.alert('Info', 'Sessão expirada, faça login novamente.', [
                      { text: 'OK', onPress: () => { navigation.navigate('Login' as never) } }
                  ])
                  await AsyncStorage.removeItem('@PortugalJobs:userToken');
                  break;
              case 406:
                  Alert.alert('Info', 'Verifique a sua conta.', [
                      { text: 'OK', onPress: () => { navigation.navigate('TelaVerificacaoConta' as never) } }
                  ])
                  break;
              default:
                  console.log(e);
                  break;
          }
      }
  }
  }

  //Validação com If's para ver se os campos estão preenchidos
  //Sendo que a constante data é os dados que vou passar no body do request
  async function LoginAccountAPI() {
    if (!username) {
      return Alert.alert('ERRO', 'Preencher o campo username', [
        { text: 'OK' }
      ])
    }

    if (!password) {
      return Alert.alert('ERRO', 'Preencher o campo Password', [
        { text: 'OK' }
      ])
    }

    const data = {
      username: username,
      password: password
    }

    try {
      const response = await api.post("/login", data);
      if (response.data) {
        await setAuthToken(response.data.token);
        Alert.alert('Sucesso', response.data.message, [
          { text: 'OK', onPress: () => { RedirectUSerToCorrectPage() } }
        ])
      } else {
        Alert.alert('ERRO', 'Ocorreu um erro no Login da sua conta', [
          { text: 'OK' }
        ])
      }
    } catch (e: any) {
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
        { text: 'OK' }
      ])
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.TitleText}>
        Login
      </Text>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 12, marginBottom: 39 }} />


      <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
        Username:
      </Text>

      <TextInput
        style={{ ...styles.input, marginBottom: 29 }}
        placeholder="Inserir Aqui..."
        onChangeText={text => setUsername(text)}
        value={username}
      />

      <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
        Password:
      </Text>

      <TextInput secureTextEntry={true}
        style={{ ...styles.input, marginBottom: 29 }}
        placeholder="Inserir Aqui..."
        onChangeText={text => setPassword(text)}
        value={password}
      />

      {/*Traço de Baixo*/}
      <View style={{ ...styles.Line, marginTop: 53, marginBottom: 29 }} />

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 25 }} activeOpacity={0.7} onPress={BackButton}>
          <Text style={styles.buttonText}>
            VOLTAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={LoginAccountAPI}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}