import React, { useState, useEffect, useContext } from "react";
import { View, Image, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';

import { styles } from "./style";

//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';

//imports para a api
import api from '../../utils/api';
import encodeQueryData from '../../utils/encodeQueryData';

import { Profile } from '../../components/Profile';
import { ButtonLeave } from "../../components/ButtonLeave";
import { CategorySelect } from "../../components/CategorySelect";

import { CandidacyInfoDataContext } from '../../contexts/CandidacyInfoProvider';

export function HomePage() {
  const [category, setCategory] = useState('');

  const navigation = useNavigation();

  const [page, setPage] = useState(1)
  const [ammountPerPage, setAmmountPerPage] = useState(10)
  const [maxPages, setMaxPages] = useState(1);
  const [nCandidaturas, setNCandidaturas] = useState(0);

  const { candidacyData, setCandidacyData } = useContext(CandidacyInfoDataContext);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function RemoveCand(candidaturaID: string) {
    Alert.alert('Menu', 'Selecione a opção pretendida.', [
      { text: 'Cancelar' },
      { text: 'Remover', onPress: () => { RemoveAPI(candidaturaID) } }
    ])
  }

  useEffect(() => {
    SeeCandsAPI()
  }, [page]) //Sempre que o page é atualizado ele chama a função


  async function SeeCandsAPI() {
    const data = {
      pageSize: ammountPerPage,
      pageIndex: page,
    }

    try {
      const customParams = encodeQueryData(data as any)

      const response = await api.get(`/@me/candidaturas${customParams && customParams !== '' ? customParams : ''}`);
      if (response.data) {
        setCandidacyData(response.data.candidaturas)
        setMaxPages(response.data.paginas)
        setNCandidaturas(response.data.nRegistos)
      } else {
        setCandidacyData([])
        Alert.alert('ERRO', 'Ocorreu um erro ao vêr candidaturas', [
          { text: 'OK' }
        ])
      }
    } catch {
      setCandidacyData([])
    }
  }

  async function RemoveAPI(candidaturaID: string) {
    try {
      const response = await api.delete(`/candidatura/${candidaturaID}`);

      if (response.data) {
        Alert.alert('Sucesso', response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
          { text: 'OK' }
        ])

        setPage(1)
        SeeCandsAPI()
      } else {
        Alert.alert('ERRO', 'Ocorreu um erro ao remover a candidatura', [
          { text: 'OK' }
        ])
      }

    } catch (e: any) {
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
        { text: 'OK' }
      ])
    }
  }

  const statusList = ["Nenhuma atualização", "Aceito", "Recusado", "Em analise"]


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Profile />
        <ButtonLeave />
      </View>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginBottom: 45 }} />

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 45, marginBottom: 39 }} />

      <View style={styles.TotalCand}>
        <Text style={{ ...styles.TextTotalCand, marginLeft: 25 }}>
          As minhas candidaturas :
        </Text>
        <Text style={{ ...styles.TextTotalCand, right: 0, marginRight: 25 }}>
          Total: {nCandidaturas}
        </Text>
      </View>

      <ScrollView style={{ height: 450}}
           showsVerticalScrollIndicator={false}
           showsHorizontalScrollIndicator={false}
      >

        {candidacyData && candidacyData.length > 0 ? (
          candidacyData.map(cand => (
            <TouchableOpacity onPress={() => RemoveCand(cand.id)} disabled={cand.status !== 0} key={cand.id}>
              <View key={cand.id} style={{ ...styles.candidacyBox, backgroundColor: cand.status === 0 ? '#F1F1F1' : cand.status === 1 ? '#DCFCDD' : cand.status === 2 ? '#FCE4DC' : '#FBFCDC' }} >
                <Text style={{ ...styles.candidacyText, marginLeft: 16 }}>
                  Empresa: {cand.nomeCompanhia}
                </Text>

                <Text style={{ ...styles.candidacyText, marginLeft: 16 }}>
                  Cargo: {cand.nomeAnuncio}
                </Text>

                <Text style={{ ...styles.candidacyText, marginLeft: 16 }}>
                  Estado: {statusList[cand.status] || "não encontrado"}
                </Text>

              </View>
            </TouchableOpacity>
          ))
        ) : (

          <Image
            style={styles.NoResults}
            source={require('../../assetss/noresfound.png')}
          />

        )}

      </ScrollView>

      <View style={{ flexDirection: 'row', marginTop:25, marginBottom: 25 }}>
        <TouchableOpacity style={{ ...styles.buttonPages, marginRight: 10, width: 50 }} activeOpacity={0.7} onPress={() => setPage(page - 1)} disabled={page === 1}>
          <Text style={styles.buttonText}>
            {"<"}
          </Text>
        </TouchableOpacity>

        <Text style={{marginTop: 10}}>
          {page}/{maxPages}
        </Text>

        <TouchableOpacity style={{ ...styles.buttonPages, marginLeft: 10, width: 50 }} activeOpacity={0.7} onPress={() => setPage(page + 1)} disabled={page >= maxPages}>
          <Text style={styles.buttonText}>
            {">"}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );


}