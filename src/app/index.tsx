import { StatusBar } from 'expo-status-bar';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import * as S from './styles';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userStore } from '../store/user';

const SIGNIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
      id
      name
      email
    }
    token
    }
  }
`;

export default function Login() {
  const [signIn, { data, loading, error }] = useMutation<any, { email: string, password: string }>(SIGNIN);
  const [form, setForm] = useState({ email: 'daniel22@hotmail.com', password: '123' });
  const { setUser } = userStore();

  const handleSubmit = async () => {
    const response = await signIn({ variables: {email: form.email, password: form.password }})
    
    if(response.data.signIn.token) {
      await AsyncStorage.setItem('token', response.data.signIn.token);
      setUser(response.data.signIn.user);
      router.replace('/(tabs)/home');
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  }

  return (
    <S.Container>
      <StatusBar style="auto" />
      <S.TextInput placeholder='E-mail' value={form.email} onChangeText={(text) => handleChange('email', text)} />
      <S.TextInput placeholder='Password' secureTextEntry={true} border='8px' value={form.password} onChangeText={(text) => handleChange('password', text)} />
      <S.Button>
        <S.ButtonText onPress={handleSubmit} disabled={loading}>{loading ? 'waiting...' : 'Log In'}</S.ButtonText>
      </S.Button>
    </S.Container>
  );
}