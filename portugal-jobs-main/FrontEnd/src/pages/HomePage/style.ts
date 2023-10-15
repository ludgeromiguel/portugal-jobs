import { StyleSheet } from 'react-native';
import {  getStatusBarHeight  } from 'react-native-iphone-x-helper';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header:{
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getStatusBarHeight() + 26, //vai buscar a barra de notificações de todos os telemoveis incluindo o iphone
        marginBottom: 42
    },
    Line: {
        width: 340,
        height: 0,
        borderWidth: 1,
        justifyContent: "center",
        borderColor: '#38D700',
      },
    NoResults: {
        justifyContent: "center",
        marginTop: 70,
        alignContent: "center",
    },
    TotalCand: {
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 42,
        position: 'relative'
    },
    TextTotalCand: {
        fontFamily: fonts.heading,
        fontSize: 17,
        color: '#2E7245',
        position: 'absolute',
    },
    candidacyBox: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 12,
        width: 240,
        height: 120,
        borderRadius: 10,
        borderWidth: 0.5,
    },
    candidacyText: {
        fontFamily: fonts.text,
        fontSize: 15,
        color: '#000000',
        marginBottom: 5
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
    buttonText: {
        color: '#2F6D25',
        fontSize: 23,
        fontFamily: fonts.text,
        letterSpacing: 3,
    }
    
    
});