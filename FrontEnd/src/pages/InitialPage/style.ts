import { StyleSheet } from "react-native";
import fonts from '../../styles/fonts';

// Tipos de estilos 
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
        width: 228,
        height: 61,
    },
    buttonText: {
        color: '#2F6D25',
        fontSize: 23,
        fontFamily: fonts.text,
        letterSpacing: 3,

    },
    image: {
        width: 341,
        height: 80,
    },
});