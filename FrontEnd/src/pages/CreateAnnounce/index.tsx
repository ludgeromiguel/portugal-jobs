import React, { useState } from 'react';
//imports do react native
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  TextInput,
  Alert,
  ScrollView,
  Switch
} from 'react-native';

import { SelectList } from 'react-native-dropdown-select-list'

//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';
// import style
import { styles } from './style';
//imports para a api
import api from '../../utils/api';
import { TYPE_CONTRATO_ARRAY, TYPE_DESLOCACAO_ARRAY } from '../../global/constants/variablesChoices';

export function CreateAnnounce() {

  const navigation = useNavigation();

  function HomePage() {
    navigation.navigate('HomePage' as never)
  }

  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [role, setRole] = useState('');
  const [deslocation, setDeslocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [contractType, setContractType] = useState('');

  const toggleSwitch = () => setNegotiable(previousState => !previousState);

  async function CreateAnnounceAPI() {
    if (!companyName) {
      return Alert.alert('ERRO', 'Preencher o campo Nome da Empresa', [
        { text: 'OK' }
      ])
    }
    if (!location) {
      return Alert.alert('ERRO', 'Preencher o campo localização', [
        { text: 'OK' }
      ])
    }
    if (!salary) {
      return Alert.alert('ERRO', 'Preencher o campo salario', [
        { text: 'OK' }
      ])
    }
    if (!role) {
      return Alert.alert('ERRO', 'Preencher o campo cargo', [
        { text: 'OK' }
      ])
    }
    if (!deslocation) {
      return Alert.alert('ERRO', 'Preencher o campo deslocação', [
        { text: 'OK' }
      ])
    }
    if (!description) {
      return Alert.alert('ERRO', 'Preencher o campo descrição', [
        { text: 'OK' }
      ])
    }
    if (!contractType) {
      return Alert.alert('ERRO', 'Preencher o campo tipo de contrato', [
        { text: 'OK' }
      ])
    }
    if(!TYPE_DESLOCACAO_ARRAY.includes(deslocation.toLowerCase())) {
      return Alert.alert('ERRO', 'Preencher o campo delocação corretamente', [
        { text: 'OK' }
      ])
    }
    if(!TYPE_CONTRATO_ARRAY.includes(contractType.toLowerCase())) {
      return Alert.alert('ERRO', 'Preencher o campo Tipo de contrato corretamente', [
        { text: 'OK' }
      ])
    }

    const data = {
      companyName: companyName,
      local: location,
      salary: salary,
      isNegotiable: negotiable,
      role: role,
      typeJob: deslocation,
      description: description,
      requirements: requirements,
      contractType: contractType
    }

    try {
      const response = await api.post("/anuncios", data);
      if (response.data) {
        Alert.alert('Sucesso', response.data.message, [
          { text: 'OK', onPress: () => { HomePage() } }
        ])
      } else {
        Alert.alert('ERRO', 'Ocorreu um erro na criação do seu anuncio', [
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
        CRIAR ANUNCIO
      </Text>


      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 12, marginBottom: 39 }} />

      <ScrollView style={{
        width: 310,
      }}>
        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Nome Da Empresa:
        </Text>

        <TextInput
          style={{ ...styles.input, marginBottom: 29 }}
          placeholder={"Inserir Aqui..."}
          onChangeText={text => setCompanyName(text)}
          value={companyName}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Localidade:
        </Text>

        <TextInput
          style={{ ...styles.input, marginBottom: 29 }}
          placeholder={"Inserir Aqui..."}
          onChangeText={text => setLocation(text)}
          value={location}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Salário:
        </Text>

        <TextInput
          style={{ ...styles.input, marginBottom: 29 }}
          placeholder="Inserir Aqui..."
          keyboardType={'numeric'}
          onChangeText={text => setSalary(text)}
          value={salary}
        />

        <View style={{ flexDirection: "row", marginBottom: 29 }}>
          <Text style={{ ...styles.ContentText }}>
            Negociável:
          </Text>

          <Switch
            trackColor={{ false: "#767577", true: "#E9FFA3" }}
            thumbColor={negotiable ? "#D4F5E3" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={negotiable}

          />
        </View>

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Cargo:
        </Text>

        <TextInput
          style={{ ...styles.input, marginBottom: 29 }}
          placeholder="Inserir Aqui..."
          onChangeText={text => setRole(text)}
          value={role}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Deslocação:
        </Text>

        <SelectList
          setSelected={(val: string) => setDeslocation(val)}
          data={TYPE_DESLOCACAO_ARRAY}
          save="value"
          boxStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29, marginLeft:20, width: 246 }}
          dropdownStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29, marginLeft:20, width: 246  }}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Descrição:
        </Text>

        <TextInput secureTextEntry={true}
          multiline={true}
          style={{ ...styles.inputDesc, marginBottom: 29, }}
          placeholder="Inserir Aqui..."
          onChangeText={text => setDescription(text)}
          value={description}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Requirimentos:
        </Text>

        <TextInput
          multiline={true}
          style={{ ...styles.inputDesc, marginBottom: 29 }}
          placeholder="Inserir Aqui..."
          onChangeText={text => setRequirements(text)}
          value={requirements}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Tipo de contrato:
        </Text>

        <SelectList
          setSelected={(val: string) => setContractType(val)}
          data={TYPE_CONTRATO_ARRAY}
          save="value"
          boxStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29, marginLeft:20, width: 246 }}
          dropdownStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginLeft:20, width: 246 }}
        />
      </ScrollView>

      {/*Traço de Baixo*/}
      <View style={{ ...styles.Line, marginTop: 53, marginBottom: 29 }} />



      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 25 }} activeOpacity={0.7} onPress={HomePage}>
          <Text style={styles.buttonText}>
            VOLTAR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={CreateAnnounceAPI}>
          <Text style={styles.buttonText}>
            CRIAR
          </Text>
        </TouchableOpacity>
      </View>



    </SafeAreaView>

  )
}