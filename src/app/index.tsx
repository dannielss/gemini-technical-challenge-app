import { StatusBar } from 'expo-status-bar';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import * as S from './styles';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userStore } from '../store/user';
import { ActivityIndicator, Text } from 'react-native';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const validationSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })

type ValidationSchema = z.infer<typeof validationSchema>;

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
  const [signIn, { loading, error, reset }] = useMutation(SIGNIN, { errorPolicy: "all" });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
  })
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser } = userStore();

  const onSubmit = async (data: { email: string, password: string }) => {
    const response = await signIn({ variables: {email: data.email, password: data.password }})
    
    if(response.data && response.data.signIn.token) {
      await AsyncStorage.setItem('token', response.data.signIn.token);
      setUser(response.data.signIn.user);
      router.replace('/(tabs)/home');
    }
  };

  return (
    <S.Container>
      <StatusBar style="auto" />
      <S.CustomImage source={require('../images/log_todo.png')} />
      <S.Form>
        <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <S.TextInput
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={(text) => {
                    onChange(text)
                    reset()
                }}
                value={value}
            />
            )}
            name="email"
        />
        {errors.email && <Text style={{ color: '#fa2626', marginBottom: 16 }}>{errors.email.message}</Text>}
        <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <S.TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={(text) => {
                    onChange(text)
                    reset()
                }}
                value={value}
                secureTextEntry={true}
            />
            )}
            name="password"
        />
        {errors.password && <Text style={{ color: '#fa2626', marginBottom: 16 }}>{errors.password.message}</Text>}
      </S.Form>
      <S.Button disabled={loading} onPress={handleSubmit(onSubmit)}>
        {loading ? <ActivityIndicator size={25} color="#FFF" /> : <S.ButtonText>Log In</S.ButtonText>}
      </S.Button>
      {error && error?.graphQLErrors[0]?.extensions?.originalError?.message && <Text style={{ color: '#fa2626', marginVertical: 8 }}>{error?.message}</Text>}
      <Link href="/register">
        <S.LinkText>Don't have an account? Sign up</S.LinkText>
      </Link>
    </S.Container>
  );
}