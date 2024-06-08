import React, { useState, useContext, useEffect } from 'react';
//imports do react native
import {
  Modal,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
  ScrollView,
  Pressable
} from 'react-native';

//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';
// import style
import { styles } from './style';
//imports para a api
import api from '../../utils/api';
import encodeQueryData from '../../utils/encodeQueryData';

import { AnnounceInfoDataContext } from '../../contexts/AnnounceInfoProvider';
import { SeeAnnounceCandsDataContext } from '../../contexts/SeeAnnounceCandsInfoProvider';

export function SeeMyAnnounce() {
  const navigation = useNavigation();

  const [page, setPage] = useState(1)
  const [ammountPerPage, setAmmountPerPage] = useState(10)
  const [maxPages, setMaxPages] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const { announceData, setAnnounceData, setAnnounceID } = useContext(AnnounceInfoDataContext);
  const { setAnnounceID: setSeeCandsAnnounceID, announceID } = useContext(SeeAnnounceCandsDataContext)

  // Função para voltar a pagina inicial
  function BackButton() {
    navigation.navigate('HomePage' as never)
  }

  function HandleAnnounceOnPress(announceID: string) {
    setAnnounceID(announceID);
    setSeeCandsAnnounceID(announceID);
    setModalVisible(true);
  }


  useEffect(() => {
    SeeADSAPI()
  }, [page]) //Sempre que o page é atualizado ele chama a função

  //Função para criar conta na api 
  //Validação com If's para ver se os campos estão preenchidos
  //Sendo que a constante data é os dados que vou passar no body do request
  async function SeeADSAPI() {
    const data = {
      pageSize: ammountPerPage,
      pageIndex: page,
    }

    try {
      const customParams = encodeQueryData(data as any)

      const response = await api.get(`/@me/anuncios${customParams && customParams !== '' ? customParams : ''}`);
      if (response.data) {
        setAnnounceData(response.data.anuncios)
        setMaxPages(response.data.paginas)
      } else {
        setAnnounceData([])
        Alert.alert('ERRO', 'Ocorreu um erro ao vêr anúncio', [
          { text: 'OK' }
        ])
      }
    } catch (e: any) {
      setAnnounceData([])
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
        { text: 'OK' }
      ])
    }
  }

  async function RemoveAPI(){
    try{
      const response = await api.delete(`/anuncios/${announceID}`);

      if (response.data) {
        Alert.alert('Sucesso', response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
          { text: 'OK' }
        ])

        setPage(1)
        SeeADSAPI()

      }else{
        Alert.alert('ERRO', 'Ocorreu um erro ao remover o anuncio', [
          { text: 'OK' }
        ])
      }

    }catch (e: any) {
      Alert.alert('ERRO', e.response.data.message || 'Ocorreu algum erro, tente novamente mais tarde.', [
        { text: 'OK' }
      ])
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 5, width: 70 }} activeOpacity={0.7} onPress={BackButton}>
          <Text style={styles.buttonText}>
            «
          </Text>
        </TouchableOpacity>

        <Text style={{ ...styles.TitleText }}>
          Anuncios
        </Text>

      </View>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 5, marginBottom: 10 }} />

      <ScrollView style={{
            width: 310,
          }}>

        {announceData && announceData.length > 0 ? (
          announceData.map(announce => (

            <TouchableOpacity key={announce.id} onPress={() => HandleAnnounceOnPress(announce.id)}>
              <View key={announce.id} style={styles.AnuncioBox}>

                <Text style={{ ...styles.AnuncioText, marginLeft: 6 }}>
                  Empresa: {announce.companyName}
                </Text>

                <Text style={{ ...styles.AnuncioText, marginLeft: 6 }}>
                  Cargo: {announce.role}
                </Text>

                <Text style={{ ...styles.AnuncioText, marginLeft: 6 }}>
                  Salário: {announce.salary}
                </Text>

                <Text style={{ ...styles.AnuncioText, marginLeft: 6 }}>
                  Local: {announce.local}
                </Text>

              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Não foram encontrados anúncios</Text>
        )}


      </ScrollView>

      <View style={{ flexDirection: 'row' }}>
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

      {modalVisible && (
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Selecione a opção pretendida</Text>
              <Pressable
                style={{ ...styles.button, marginBottom: 10}}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  navigation.navigate('SeeCand' as never)
                }}>
                <Text style={styles.textStyle}>Candidaturas</Text>
              </Pressable>
              <Pressable
                style={{...styles.button, marginBottom: 10}}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  navigation.navigate('EditAnnounce' as never, { anuncioID: announceID } as never)
                }}>
                <Text style={styles.textStyle}>Editar</Text>
              </Pressable>
              <Pressable
                style={{ ...styles.button, marginBottom: 10}}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  RemoveAPI()
                }}>
                <Text style={styles.textStyle}>Remover</Text>
              </Pressable>
              <Pressable
                style={{ ...styles.button}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      )}

    </SafeAreaView>
  )
}