import React from "react";
import { View, Text, TouchableOpacityProps, TouchableOpacity, Image } from 'react-native';
import {  LinearGradient  } from 'expo-linear-gradient';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from 'react-native-svg';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    icon: React.FC<SvgProps>;
    checked?: boolean;
}

export function Category({
    title,
    icon: Icon,
    checked = false,
    ...rest
}: Props){

    return (
        <TouchableOpacity {...rest}>
            <LinearGradient 
                style={styles.container}
                colors={['#38D700', '#30B900']}
            >
                <View style={[styles.content, { opacity: checked ? 1 : 0.4}]}>
                    <View style={checked ? styles.checked : styles.check}/>

                    <Icon
                        />
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}