import React, {useContext, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { UserInfoDataContext } from '../../contexts/UserInfoProvider';
import { Avatar } from '../Avatar';
import { styles } from './styles';

export function Profile(){

    const [greet, setGreet] = useState('');

    const findGreet = () => {
        const hrs = new Date().getHours()
        if (hrs < 12) {
            return setGreet('Bom Dia,')
          } else if (hrs < 18) {
            return setGreet('Boa Tarde,')
          } else {
            return setGreet('Boa Noite,')
          }
    }

    const { userData } = useContext(UserInfoDataContext);

    useEffect(() => {
        findGreet();
    }, []);

    return (
        <View style ={styles.container}>
            
            <Avatar urlImage="https://cdn-icons-png.flaticon.com/512/149/149071.png"/>

            <View>

                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        {`${greet}`}
                    </Text>

                    <Text style={styles.username}>
                        {userData ? userData.firstName : "" }
                    </Text>
                </View>
                
                <Text style={styles.message}>
                    O seu futuro está aqui!
                </Text>
            </View>
        </View>
    )
}