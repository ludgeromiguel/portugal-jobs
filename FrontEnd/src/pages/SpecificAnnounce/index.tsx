import React, { useContext, useEffect, useState } from 'react';
//imports do react native
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
  ScrollView
} from 'react-native';

//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';
// import style
import { styles } from '../SpecificAnnounce/style';
//imports para a api
import api from '../../utils/api';
import { SpecificAnnounceDataContext } from '../../contexts/SpecificAnnounceInfoProvider';

export function SpecificAnnounce() {
  const navigation = useNavigation();

  const { announceID, announceData, setAnnounceData } = useContext(SpecificAnnounceDataContext)

  const [showAllDescription, setShowAllDescription] = useState(false);
  const [showAllRequirements, setShowAllRequirements] = useState(false);
  const [IsCandidato, setCandidatado] = useState(false);

  // Função para voltar a pagina inicial
  function BackButton() {
    navigation.navigate('SeeAd' as never)
  }

  //Função para criar conta na api 
  //Validação com If's para ver se os campos estão preenchidos
  //Sendo que a constante data é os dados que vou passar no body do request
  async function SpecificAnnounceAPI() {
    if (!announceID || announceID === '') return BackButton();

    try {
      const response = await api.get(`/anuncios/${announceID}`);
      if (response.data) {
        setAnnounceData(response.data.anuncio)
        if(response.data.IsCandidatado === true) setCandidatado(true)
        else setCandidatado(false)
      } else {
        setAnnounceData(undefined)
        Alert.alert('ERRO', 'Ocorreu um erro ao vêr anúncio', [
          { text: 'OK' }
        ])
      }
    } catch (e: any) {
      setAnnounceData(undefined)
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
        { text: 'OK', onPress: () => BackButton() }
      ])
    }
  }

  async function CandidatarAnuncio(){
    try {
      const response = await api.post(`/anuncios/${announceID}/candidatar`);
      if (response.data) {
        Alert.alert('Sucesso', response.data.message, [
          { text: 'OK', onPress: () => SpecificAnnounceAPI() }
        ])
      } else {
        Alert.alert('ERRO', 'Ocorreu um erro a fazer a candidatura', [
          { text: 'OK' }
        ])
      }
    } catch (e: any) {
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
        { text: 'OK' }
      ])
    }
  }

  useEffect(() => {
    SpecificAnnounceAPI()
  }, [])

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ ...styles.header, flexDirection: 'row' }}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 5, width: 70 }} activeOpacity={0.7} onPress={BackButton}>
          <Text style={styles.buttonText}>
            «
          </Text>
        </TouchableOpacity>

        <Text style={styles.TitleText}>
          Anuncio
        </Text>

      </View>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 5, marginBottom: 25 }} />

      {announceData ? (
        <View key={announceData.id} style={styles.AnuncioBox}>

          <ScrollView style={styles.AnnnounceContainer} 
           showsVerticalScrollIndicator={false}
           showsHorizontalScrollIndicator={false}
          >

            <Text style={styles.AnuncioText}>
              Empresa: {announceData.companyName}
            </Text>

            <Text style={styles.AnuncioText}>
              Cargo: {announceData.role}
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.AnuncioText}>
                Salário: {announceData.salary} €
              </Text>

              <Text style={styles.SubText}>
                {announceData.isNegotiable && '(negociável)'}
              </Text>
            </View>
            <Text style={styles.AnuncioText}>
              Local: {announceData.local}
            </Text>

            <Text style={styles.AnuncioText}>
              Deslocação: {announceData.typeJob}
            </Text>

            <View style={!showAllDescription ? { flexDirection: 'row', alignItems: 'baseline' } : null}>
              <Text style={{ ...styles.AnuncioText, alignItems: 'baseline' }}>
                Descrição: {showAllDescription ? announceData.description : announceData.description.slice(0, 25)}
              </Text>
              {!showAllDescription && announceData.description.length >= 25 && (
                <TouchableOpacity activeOpacity={0.7} onPress={() => setShowAllDescription(!showAllDescription)}>
                  <Text style={{ ...styles.SubText, marginTop: 15, alignItems: 'baseline' }}>
                    ...mais
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={!showAllRequirements ? { flexDirection: 'row', alignItems: 'baseline' } : null}>
              {announceData.requirements && (
                <Text style={{ ...styles.AnuncioText, alignItems: 'baseline' }}>
                  Requerimentos: {showAllRequirements ? announceData.requirements : announceData.requirements.slice(0, 25)}
                </Text>
            )}

            {announceData.requirements && !showAllRequirements  && announceData.requirements.length >= 25 && (
                <TouchableOpacity activeOpacity={0.7} onPress={() => setShowAllRequirements(!showAllRequirements)}>
                  <Text style={{ ...styles.SubText, marginTop: 15, alignItems: 'baseline' }}>
                    ...mais
                  </Text>
                </TouchableOpacity>
              )}


            </View>

            <Text style={styles.AnuncioText}>
              Tipo de Contrato: {announceData.contractType}
            </Text>
          </ScrollView>

          
        </View>
        
        


      ) : (
        <Text>O anúncio não foi encontrado</Text>
      )}

      {/*Traço de Baixo*/}
      <View style={{ ...styles.Line, marginTop: 20, marginBottom: 0 }} />
      
      { !IsCandidato ? (
        <View style={{ flexDirection: "row", marginTop: 30}}>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={CandidatarAnuncio}>
          <Text style={styles.buttonText}>
            CANDIDATAR
          </Text>
        </TouchableOpacity>
      </View>
      ) : (
        <Text style={{...styles.AnuncioText, color: '#2E7245', marginLeft: 30}}>Já estás candidatado a este anúncio.</Text>
      )}
      

    </SafeAreaView>
  )
}