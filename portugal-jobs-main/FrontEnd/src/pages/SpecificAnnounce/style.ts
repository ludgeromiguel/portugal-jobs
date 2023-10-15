import { StyleSheet } from "react-native";
import fonts from '../../styles/fonts';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

// Style do conteudo do app 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getStatusBarHeight(),
  },
  button: {
    backgroundColor: '#BDF8CA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 1,
    width: 190,
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
    marginRight: 120,
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
    width: 320,
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
    marginTop: getStatusBarHeight() + 20, //vai buscar a barra de notificações de todos os telemoveis incluindo o iphone
    marginBottom: 12,

  },

  AnuncioText: {
    fontFamily: fonts.text,
    fontSize: 20,
    color: '#000000',
    marginBottom: 9,
    marginTop: 10,
    marginRight: 30,
    marginLeft: 9,
  },

 AnuncioBox: {
    backgroundColor: '#DCFCDD',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 1,
    width: 320,
    height: 400,
    borderColor: 'FFFFFF',
    borderRadius: 1,
    borderWidth: 1,
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

  AnnnounceContainer: {
    
  },

  SearchItemsContainer: {
    alignContent: 'center'
  },

  SubText: {
    fontFamily: fonts.text,
    fontSize: 14,
    marginLeft: -20,
    marginTop: 13,
    color: '#000000',
    fontWeight: "bold",
  }

});