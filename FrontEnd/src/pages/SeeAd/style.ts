import { StyleSheet } from "react-native";
import fonts from '../../styles/fonts';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

// Style do conteudo do app 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getStatusBarHeight() + 20,
  },
  button: {
    backgroundColor: '#BDF8CA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 1,
    width: 172,
    height: 40,
  },
  buttonText: {
    color: '#2F6D25',
    fontSize: 23,
    fontFamily: fonts.text,
    letterSpacing: 3,
  },
  TitleText: {
    color: '#2E7245',
    fontSize: 28,
    fontFamily: fonts.text,
    marginRight: 80,
  },
  image: {
    width: 310,
    height: 80,
  },
  ContentText: {
    fontSize: 23,
    color: '#000',
    fontFamily: fonts.text,
  },
  Line: {
    width: 310,
    height: 0,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
  input: {
    width: 246,
    height: 35,
    borderWidth: 0,
    borderRadius: 7,
    padding: 10,
    backgroundColor: '#D4F5E3',
  },

  header: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getStatusBarHeight() , //vai buscar a barra de notificações de todos os telemoveis incluindo o iphone
    marginBottom: 12,

  },

  AnuncioText: {
    fontFamily: fonts.text,
    fontSize: 15,
    color: '#000000'
  },

  AnuncioBox: {
    backgroundColor: '#DCFCDD',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 12,
    width: 240,
    height: 120,
    borderColor: 'FFFFFF',
    borderRadius: 1,
    borderWidth: 1,
    marginLeft: 30,
  },

  buttonPages: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 1,
    width: 172,
    height: 40,
  },

  SearchItemsContainer: {
    alignContent: 'center'
  },


});