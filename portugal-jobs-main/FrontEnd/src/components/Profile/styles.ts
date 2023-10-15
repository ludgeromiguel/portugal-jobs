import { StyleSheet } from 'react-native'
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
    },
    user:{
        flexDirection: 'row',
    },
    greeting:{
        fontFamily: fonts.heading,
        fontSize: 20,
        color: '#2E7245',
        marginRight: 6,
    },
    username:{
        fontFamily: fonts.heading,
        fontSize: 22,
        color: '#2E7245'
    },
    message: {
        fontFamily: fonts.text,
        color: '#2E7245',
    }
});