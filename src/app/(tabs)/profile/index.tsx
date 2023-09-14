import AsyncStorage from '@react-native-async-storage/async-storage';
import { userStore } from '../../../store/user';
import * as S from './styles';
import { router } from 'expo-router';

export default function Profile() {
    const { name, email } = userStore();

    const handlePress = async () => {
        await AsyncStorage.clear();
        router.replace('/');
    }
    return (
    <>
        <S.Content>
            <S.Title>Profile</S.Title>
            <S.Card>
                <S.CustomImage source={require('../../../images/user.png')} />
                <S.InfoText fontSize={"18px"} fontWeight="bold">{name}</S.InfoText>
                <S.InfoText>{email}</S.InfoText>
            </S.Card>
        </S.Content>
        <S.Container>
            <S.Button onPress={handlePress}>
                <S.ButtonText>Logout</S.ButtonText>
            </S.Button>
        </S.Container>
    </>
    );
}