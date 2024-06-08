import React, { useContext, useEffect, useState } from 'react';

import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
  ScrollView
} from 'react-native';


import { useNavigation } from '@react-navigation/core';

import { styles } from '../SeeCands/style'
import encodeQueryData from '../../utils/encodeQueryData';

import api from '../../utils/api';
import { SeeAnnounceCandsDataContext } from '../../contexts/SeeAnnounceCandsInfoProvider';

export function SeeCands() {
  const navigation = useNavigation();

  const [page, setPage] = useState(1)
  const [ammountPerPage, setAmmountPerPage] = useState(10)
  const [maxPage, setMaxPage] = useState(1);

  const { announceID, candsData, setCandData } = useContext(SeeAnnounceCandsDataContext)

  const statusList = ["Nenhuma atualização","Aceito","Recusado","Em analise"]

  // Função para voltar a pagina inicial
  function BackButton() {
    navigation.navigate('SeeMyAnnounce' as never)
  }

  //Função para criar conta na api 
  //Validação com If's para ver se os campos estão preenchidos
  //Sendo que a constante data é os dados que vou passar no body do request
  async function SeeCandsAPI() {
    const data = {
      pageSize: ammountPerPage,
      pageIndex: page,
    }

    if (!announceID || announceID === '') return BackButton();

    try {
      const customParams = encodeQueryData(data as any)

      const response = await api.get(`anuncios/${announceID}/candidaturas${customParams && customParams !== '' ? customParams : ''}`);
      if (response.data) {
        setCandData(response.data.candidaturas)
        setMaxPage(response.data.paginas)
      } else {
        setCandData([])
        Alert.alert('ERRO', 'Ocorreu um erro ao vêr as candidaturas', [
          { text: 'OK', onPress: () => BackButton() }
        ])
      }
    } catch (e: any) {
      setCandData([])
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
        { text: 'OK', onPress: () => BackButton() }
      ])
    }
  }

  useEffect(() => {
    SeeCandsAPI()
  }, [page]) //Sempre que o page é atualizado ele chama a função

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ ...styles.header, flexDirection: 'row' }}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 5, width: 70 }} activeOpacity={0.7} onPress={BackButton}>
          <Text style={styles.buttonText}>
            «
          </Text>
        </TouchableOpacity>

        <Text style={styles.TitleText}>
          Candidaturas
        </Text>

      </View>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 5, marginBottom: 25 }} />

      <ScrollView style={styles.CandContainer}>   
      {candsData && candsData.length > 0 ? (
        candsData.map(cand => (
          <View key={cand.id} style={{...styles.CandBox, backgroundColor: cand.status === 0 ? '#F1F1F1' : cand.status === 1 ? '#DCFCDD' : cand.status === 2 ? '#FCE4DC' : '#FBFCDC'}}>

              <Text style={styles.CandText}>
                Nome: {cand.ownerFirstName} {cand.ownerLastName}
              </Text>

              <Text style={styles.CandText}>
                Estado da Candidatura:  {statusList[cand.status] || "não encontrado"}
              </Text>
          </View>
        
        ))

      ) : (
        <Text>Não tem nenhuma candidatura</Text>
      )}
      </ScrollView>

      <View style={{ ...styles.Line, marginTop: 30, marginBottom: 30 }} />

      {candsData && candsData.length > 0 && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ ...styles.buttonPages, marginRight: 10, width: 50 }} activeOpacity={0.7} onPress={() => setPage(page - 1)} disabled={page === 1}>
            <Text style={styles.buttonText}>
              {"<"}
            </Text>
          </TouchableOpacity>

          <Text style={{marginTop: 10}}>
            {page}/{maxPage}
          </Text>

          <TouchableOpacity style={{ ...styles.buttonPages, marginLeft: 10, width: 50 }} activeOpacity={0.7} onPress={() => setPage(page + 1)} disabled={page >= maxPage}>
            <Text style={styles.buttonText}>
              {">"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  )
}