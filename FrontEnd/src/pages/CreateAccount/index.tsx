import React, { useState } from 'react';
//imports do react native
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';

//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';
// import style
import { styles } from './style';
//imports para a api
import api from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';

export function CreateAccount() {
  const navigation = useNavigation();

  // criação de useStates para buscar o valor dos dados da app
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  // Função para voltar a pagina inicial
  function RegisterButton() {
    navigation.navigate('TelaInicial' as never)
  }

  function TelaVerificacaoConta() {
    navigation.navigate('TelaVerificacaoConta' as never)
  }

  //Função para criar conta na api 
  //Validação com If's para ver se os campos estão preenchidos
  //Sendo que a constante data é os dados que vou passar no body do request
  async function CreateAccountAPI() {
    if (!name) {
      return Alert.alert('ERRO', 'Preencher o campo nome', [
        { text: 'OK' }
      ])
    }
    if (!surname) {
      return Alert.alert('ERRO', 'Preencher o campo sobrenome', [
        { text: 'OK' }
      ])
    }
    if (!email) {
      return Alert.alert('ERRO', 'Preencher o campo email', [
        { text: 'OK' }
      ])
    }
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
    if (!phone) {
      return Alert.alert('ERRO', 'Preencher o campo phone', [
        { text: 'OK' }
      ])
    }

    const data = {
      email: email,
      username: username,
      password: password,
      firstName: name,
      lastName: surname,
      number: phone
    }

    try {
      const response = await api.post("/register", data);
      if (response.data) {
        await setAuthToken(response.data.token);
        Alert.alert('Sucesso', response.data.message, [
          { text: 'OK', onPress: () => { TelaVerificacaoConta() } }
        ])
      } else {
        Alert.alert('ERRO', 'Ocorreu um erro na criação da sua conta', [
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
        CRIAR CONTA
      </Text>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 12, marginBottom: 39 }} />

    <ScrollView style={{
     width: 310,
    }}>

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Nome:
        </Text>

        <TextInput
          style={{ ...styles.input, marginBottom: 29 }}
          placeholder={"Inserir Aqui..."}
          onChangeText={text => setName(text)}
          value={name}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Sobrenome:
        </Text>

        <TextInput
          style={{ ...styles.input, marginBottom: 29 }}
          placeholder="Inserir Aqui..."
          onChangeText={text => setSurname(text)}
          value={surname}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Email:
        </Text>

        <TextInput
          style={{ ...styles.input, marginBottom: 29 }}
          placeholder="Inserir Aqui..."
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
          value={email}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Username:
        </Text>

        <TextInput
          style={{ ...styles.input, marginBottom: 29 }}
          placeholder="Inserir Aqui..."
          autoCapitalize="none"
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

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Numero Telefone:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Inserir Aqui..."
          onChangeText={text => setPhone(text)}
          value={phone}
          keyboardType={'numeric'}
        />

      </ScrollView>

      {/*Traço de Baixo*/}
      <View style={{ ...styles.Line, marginTop: 53, marginBottom: 29 }} />



      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 25 }} activeOpacity={0.7} onPress={RegisterButton}>
          <Text style={styles.buttonText}>
            VOLTAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={CreateAccountAPI}>
          <Text style={styles.buttonText}>
            CRIAR
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}