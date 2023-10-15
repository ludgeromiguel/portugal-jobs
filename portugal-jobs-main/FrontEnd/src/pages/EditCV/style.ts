import { StyleSheet } from "react-native";
import fonts from '../../styles/fonts';

// Style do conteudo do app 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#BDF8CA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 10,
    width: 172,
    height: 55,
  },
  buttonCV: {
    backgroundColor: '#BDF8CA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 10,
    width: 180,
    height: 55,
  },
  buttonText: {
    color: '#2F6D25',
    fontSize: 23,
    fontFamily: fonts.text,
    letterSpacing: 3,
    marginLeft: 40,
  },
  TitleText: {
    color: '#2E7245',
    fontSize: 28,
    fontFamily: fonts.text,
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
    textColor: '#0000007a',

  },

});