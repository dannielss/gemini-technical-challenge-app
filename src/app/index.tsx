import { StatusBar } from 'expo-status-bar';
import * as S from './styles';
import { router } from 'expo-router';

export default function Login() {
  
  const handleSubmit = () => {
    router.replace('/(tabs)/home');
  };
  
  return (
    <S.Container>
      <StatusBar style="auto" />
      <S.TextInput placeholder='E-mail'/>
      <S.TextInput placeholder='Password' secureTextEntry={true} border='8px'/>
      <S.Button>
        <S.ButtonText onPress={handleSubmit}>Log In</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}