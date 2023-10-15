import React, { useState } from 'react';
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

export function ChangeData() {
  const navigation = useNavigation();

  // criação de useStates para buscar o valor dos dados da app
  const [password, Newpassword] = useState('')
  const [number, Newnumber] = useState('')

  function ReturnToHomePage() {
    navigation.navigate('HomePage' as never)
  }

  //Função para criar conta na api 
  //Validação com If's para ver se os campos estão preenchidos
  //Sendo que a constante data é os dados que vou passar no body do request
  async function ChangeAccountDataAPI() {

    if (!number && !password) return Alert.alert('Erro', 'Tens de preencher pelo menos a password ou o número', [
      { text: 'OK' }
    ])

    const data: { number?: string, password?: string } = {}

    if (number) data.number = number
    if (password) data.password = password

    try {
      const response = await api.put("/@me/update/data", data);
      if (response.data) {
        Alert.alert('Sucesso', response.data.message, [
          { text: 'OK', onPress: () => { ReturnToHomePage() } }
        ])
      } else {
        Alert.alert('ERRO', 'Dados do request inválidos', [
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
        Editar Dados
      </Text>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 12, marginBottom: 39 }} />

      <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
        Password:
      </Text>

      <TextInput
        style={{ ...styles.input, marginBottom: 29 }}
        placeholder={"Inserir Aqui..."}
        onChangeText={text => Newpassword(text)}
        value={password}
      />

      <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
        Número:
      </Text>

      <TextInput
        style={{ ...styles.input, marginBottom: 29 }}
        placeholder="Inserir Aqui..."
        onChangeText={text => Newnumber(text)}
        value={number}
        keyboardType={'numeric'}
      />


      {/*Traço de Baixo*/}
      <View style={{ ...styles.Line, marginTop: 53, marginBottom: 29 }} />



      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 25 }} activeOpacity={0.7} onPress={ReturnToHomePage}>
          <Text style={{ ...styles.buttonText, marginLeft: 40}}>
            VOLTAR        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={ChangeAccountDataAPI}>
          <Text style={{ ...styles.buttonText, marginLeft: 5}}>
            EDITAR
          </Text>
        </TouchableOpacity>
      </View>



    </SafeAreaView>
  )
}