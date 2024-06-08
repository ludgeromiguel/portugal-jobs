import React, { useRef, useState } from 'react';
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
import { useNavigation } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { styles } from './style';
import api from '../../utils/api';
import { TYPE_CONTRATO_ARRAY, TYPE_DESLOCACAO_ARRAY } from '../../global/constants/variablesChoices';
import { RootStackParamList } from '../../global/types/tipos';
import { useEffect } from 'react';

type OtherPageRouteProp = RouteProp<RootStackParamList, 'OtherPage'>;

export function EditAnnounce({route} : { route: OtherPageRouteProp}) {

  const { anuncioID } = route.params;
  const navigation = useNavigation();

  function HomePage() {
    navigation.navigate('HomePage' as never)
  }

  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [role, setRole] = useState('');
  const [deslocation, setDeslocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [contractType, setContractType] = useState('');

  const toggleSwitch = () => setNegotiable(previousState => !previousState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/anuncios/${anuncioID}`);
        if (response.data) {
          setLocation(response.data.anuncio.local);
          setSalary(response.data.anuncio.salary.toString());
          setNegotiable(response.data.anuncio.isNegotiable);
          setRole(response.data.anuncio.role);
          setDeslocation(response.data.anuncio.typeJob);
          setDescription(response.data.anuncio.description);
          setRequirements(response.data.anuncio.requirements);
          setContractType(response.data.anuncio.contractType);
        } else {
          Alert.alert('ERRO', 'Anúncio fornecido sem dados', [
            { text: 'OK', onPress: () => { HomePage() } }
          ])
        }
      }
        catch(e: any) {
          Alert.alert('ERRO', e.response.data.message, [
            { text: 'OK', onPress: () => { HomePage() } }
          ])
        }
    };
    fetchData();
  }, []);

  async function EditAnnounceAPI() {
    
    if(contractType && !TYPE_CONTRATO_ARRAY.includes(contractType.toLowerCase())) {
      return Alert.alert('ERRO', 'O contrato tem que ser um dos quatro', [
        { text: 'OK' }
      ])
    }

    if(deslocation && !TYPE_DESLOCACAO_ARRAY.includes(deslocation.toLowerCase())) {
      return Alert.alert('ERRO', 'A deslocação tem que ser um dos três', [
        { text: 'OK' }
      ])
    }

    const data = {
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
      const response = await api.put(`/anuncios/${anuncioID}`, data);
      if (response.data) {
        Alert.alert('Sucesso', response.data.message, [
          { text: 'OK', onPress: () => { HomePage() } }
        ])
      } else {
        Alert.alert('ERRO', 'Ocorreu um erro na edição do seu anuncio', [
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
        EDITAR ANUNCIO
      </Text>


      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 12, marginBottom: 39 }} />

      <ScrollView 
           showsVerticalScrollIndicator={false}
           showsHorizontalScrollIndicator={false}>

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
        data={TYPE_DESLOCACAO_ARRAY}
        setSelected = {(val: string) => setDeslocation(val)}
        save="value"
        defaultOption = {{key:10, value: deslocation}}
        boxStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29 }}
        dropdownStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29 }}
        />

        <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
          Descrição:
        </Text>

        <TextInput secureTextEntry={true}
          multiline={true}
          style={{ ...styles.inputDesc, marginBottom: 29 }}
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
          data={TYPE_CONTRATO_ARRAY}
          setSelected = {(val: string) => setContractType(val)}
          save="value"
          defaultOption = {{key:10, value: contractType}}
          boxStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29 }}
          dropdownStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29 }}
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

        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={EditAnnounceAPI}>
          <Text style={styles.buttonText}>
            EDITAR
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>

  )
}