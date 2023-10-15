import React, { useState, useContext, useEffect } from 'react';
//imports do react native
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Alert,
  ScrollView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

//import para permitir a navegação entre telas
import { useNavigation } from '@react-navigation/core';
// import style
import { styles } from './style';
//imports para a api
import api from '../../utils/api';
import encodeQueryData from '../../utils/encodeQueryData';

import { AnnounceInfoDataContext } from '../../contexts/AnnounceInfoProvider';
import { TextInput } from 'react-native-gesture-handler';

import { SelectList } from 'react-native-dropdown-select-list'
import { SpecificAnnounceDataContext } from '../../contexts/SpecificAnnounceInfoProvider';

export function SeeAd() {
  const navigation = useNavigation();

  const [typeJob, setTypejob] = useState('')
  const [local, setLocal] = useState('')
  const [salario, setSalario] = useState('')
  const [role, setRole] = useState('')
  const [contractType, setContractType] = useState('')
  const [page, setPage] = useState(1)
  const [ammountPerPage, setAmmountPerPage] = useState(10)
  const [maxPages, setMaxPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { announceData, setAnnounceData } = useContext(AnnounceInfoDataContext);

  const { setAnnounceID } = useContext(SpecificAnnounceDataContext)

  // Função para voltar a pagina inicial
  function BackButton() {
    navigation.navigate('HomePage' as never)
  }

  function SpecificAnnounceButton(announceID: string) {
    setAnnounceID(announceID)
    navigation.navigate(`SeeSpecificAdd` as never)
  }

  useEffect(() => {
    SeeADSAPI()
  }, [page]) //Sempre que o page é atualizado ele chama a função

  const dataDeslocacao = [
    { key: '1', value: 'presencial' },
    { key: '2', value: 'híbrido' },
    { key: '3', value: 'remoto' },
  ]

  const dataTipoCont = [
    { key: '1', value: 'Efetivo' },
    { key: '2', value: 'Part-time' },
    { key: '3', value: 'Temporario' },
    { key: '4', value: 'Estagio' },
  ]

  //Função para criar conta na api 
  //Validação com If's para ver se os campos estão preenchidos
  //Sendo que a constante data é os dados que vou passar no body do request
  async function SeeADSAPI() {
    const data = {
      typeJob: typeJob,
      local: local,
      salary: salario,
      role: role,
      contractType: contractType,
      pageSize: ammountPerPage,
      pageIndex: page,
    }

    if (data.typeJob === '1') data.typeJob = '';
    if (data.contractType === '1') data.contractType = '';

    try {
      const customParams = encodeQueryData(data as any)

      //const response = await api.get(`/anuncios${customParams && customParams !== '' ? customParams : ''}`);
      const response = await api.get(`/anuncios?pageSize=50&pageIndex=1`);
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

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={{ ...styles.button, marginRight: 5, width: 70 }} activeOpacity={0.7} onPress={BackButton}>
          <Text style={styles.buttonText}>
            «
          </Text>
        </TouchableOpacity>

        <Text style={{ ...styles.TitleText, marginRight: 5 }}>
          Anuncios
        </Text>

        <TouchableOpacity style={{ marginRight: 40, marginTop: 9 }} onPress={() => setShowFilters(!showFilters)}>
          {!showFilters ? <AntDesign
            name='search1'
            size={27}
            color="black" /> :
            <AntDesign
              name='close'
              size={27}
              color="black" />}
        </TouchableOpacity>

      </View>

      {/*Traço de cima*/}
      <View style={{ ...styles.Line, marginTop: 5, marginBottom: 10 }} />

      {showFilters ? (
        <ScrollView style={styles.SearchItemsContainer}>

          <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
            Local:
          </Text>

          <TextInput
            style={{ ...styles.input, marginBottom: 29 }}
            placeholder={"Inserir Aqui..."}
            onChangeText={text => setLocal(text)}
            value={local}
          />

          <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
            Tipo de contrato:
          </Text>

          <SelectList
            setSelected={(val: string) => setContractType(val)}
            data={dataTipoCont}
            save="value"
            boxStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29 }}
            dropdownStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0 }}
          />

          <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
            Deslocação:
          </Text>

          <SelectList
            setSelected={(val: string) => setTypejob(val)}
            data={dataDeslocacao}
            save="value"
            boxStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29 }}
            dropdownStyles={{ backgroundColor: '#BDF8CA', borderWidth: 0, marginBottom: 29 }}
          />

          <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
            Salário:
          </Text>

          <TextInput
            style={{ ...styles.input, marginBottom: 29 }}
            placeholder="Inserir Aqui..."
            keyboardType="numeric"
            onChangeText={text => setSalario(text)}
            value={salario}
          />

          <Text style={{ ...styles.ContentText, marginBottom: 9 }}>
            Cargo:
          </Text>

          <TextInput
            style={{ ...styles.input, marginBottom: 29 }}
            placeholder="Inserir Aqui..."
            onChangeText={text => setRole(text)}
            value={role}
          />

          <TouchableOpacity style={{ ...styles.button, marginLeft: 40 }} onPress={() => {
            setPage(1)
            setMaxPages(1)
            SeeADSAPI()
            setShowFilters(false)
          }}>
            <Text style={styles.buttonText}>
              Pesquisar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          <ScrollView style={{
            width: 310,
          }}>

            {announceData && announceData.length > 0 ? (
              announceData.map(announce => (

                <TouchableOpacity activeOpacity={0.7} onPress={() => SpecificAnnounceButton(announce.id)} >
                  <View key={announce.id} style={styles.AnuncioBox}>

                    <Text style={{ ...styles.AnuncioText, marginLeft: 6 }}>
                      Empresa: {announce.companyName}
                    </Text>

                    <Text style={{ ...styles.AnuncioText, marginLeft: 6 }}>
                      Cargo: {announce.role}
                    </Text>

                    <Text style={{ ...styles.AnuncioText, marginLeft: 6 }}>
                      Salário: {announce.salary} €
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

          {maxPages > 1 && (
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
          )}
        </>
      )
      }
    </SafeAreaView >
  )
}