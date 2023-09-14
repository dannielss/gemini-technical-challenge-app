import { StatusBar } from 'expo-status-bar';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import * as S from './styles';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userStore } from '../store/user';
import { ActivityIndicator, Text } from 'react-native';

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
  const [signIn, { data, loading, error, reset  }] = useMutation(SIGNIN, { errorPolicy: "all" });
  const [form, setForm] = useState({ email: 'daniel22@hotmail.com', password: '123' });
  const { setUser } = userStore();

  const handleSubmit = async () => {
    const response = await signIn({ variables: {email: form.email, password: form.password }})
    
    if(response.data && response.data.signIn.token) {
      await AsyncStorage.setItem('token', response.data.signIn.token);
      setUser(response.data.signIn.user);
      router.replace('/(tabs)/home');
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });

    reset();
  }

  return (
    <S.Container>
      <StatusBar style="auto" />
      <S.TextInput placeholder='E-mail' value={form.email} onChangeText={(text) => handleChange('email', text)} />
      <S.TextInput placeholder='Password' secureTextEntry={true} border='8px' value={form.password} onChangeText={(text) => handleChange('password', text)} />
      <S.Button disabled={loading} onPress={handleSubmit}>
        {loading ? <ActivityIndicator size={25} color="#FFF" /> : <S.ButtonText>Log In</S.ButtonText>}
      </S.Button>
      {error?.graphQLErrors[0].extensions.originalError.message && <Text style={{ color: '#fa2626', marginVertical: 8 }}>{error?.message}</Text>}
      <Link href="/register">
        <S.LinkText>Don't have an account? Sign up</S.LinkText>
      </Link>
    </S.Container>
  );
}