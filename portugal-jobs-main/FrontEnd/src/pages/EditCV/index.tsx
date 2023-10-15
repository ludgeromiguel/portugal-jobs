import React, { useState } from 'react';
//imports do react native
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
  Platform
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import FormData from 'form-data';

//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';
// import style
import { styles } from './style';
//imports para a api
import api from '../../utils/api';

export function EditCV() {
  const navigation = useNavigation();

  // criação de useStates para buscar o valor dos dados da app
  const [curriculum, setCurriculo] = useState<DocumentPicker.DocumentResult | undefined>(undefined)

  function ReturnToHomePage() {
    navigation.navigate('HomePage' as never)
  }

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true })

      if (!response) return Alert.alert('Erro', 'Tens de escolher um e apenas um arquivo para o teu currículo.', [
        { text: 'OK' }
      ])

      setCurriculo(response);
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu algum erro, tente novamente mais tarde', [
        { text: 'OK' }
      ])
      console.log(err);
    }
  };

  //Função para criar conta na api 
  //Validação com If's para ver se os campos estão preenchidos
  //Sendo que a constante data é os dados que vou passar no body do request
  async function ChangeCurriculumAPI() {

    if (!curriculum || curriculum.type !== 'success') return Alert.alert('Erro', 'Tens um e apenas um arquivo para o teu currículo.', [
      { text: 'OK' }
    ])

    const data = new FormData();
    data.append('', {
      uri: curriculum.uri,
      type: 'application/octet-stream',
      name: curriculum.name,
      size: curriculum.size
    })

    try {
      const response = await api.put("/@me/change/curriculum", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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
      console.log(e)
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
        { text: 'OK' }
      ])
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.TitleText}>
        Editar Currículo
      </Text>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 12, marginBottom: 50 }} />

      <View style={{ ...styles.ContentText, marginBottom: 9 }} >
        <TouchableOpacity style={{ ...styles.buttonCV, marginRight: 25, height: 90 }} activeOpacity={0.7} onPress={handleDocumentSelection}>
          <Text style={{ ...styles.buttonText, marginLeft: 5 }}>
            Selecionar 
          </Text>
        </TouchableOpacity>
      </View>


      {/*Traço de Baixo*/}
      <View style={{ ...styles.Line, marginTop: 40, marginBottom: 29 }} />



      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 25 }} activeOpacity={0.7} onPress={ReturnToHomePage}>
          <Text style={{ ...styles.buttonText, marginLeft: 40 }}>
            Voltar          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={ChangeCurriculumAPI}>
          <Text style={{ ...styles.buttonText, marginLeft: 13 }}>
            Enviar
          </Text>
        </TouchableOpacity>
      </View>



    </SafeAreaView>
  )
}