import { ActivityIndicator, Text } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router } from "expo-router";
import { MaterialIcons} from '@expo/vector-icons';
import Toast from "react-native-root-toast";
import * as S from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const validationSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput) {
    createUser(createUserInput: $createUserInput) {
       id
       name
       email
    }
  }
`;

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(validationSchema),
  })

  const [createUser, { loading, error, reset }] = useMutation(CREATE_USER, { errorPolicy: "all" });

  const onSubmit = async (data: any) => {
    const response = await createUser({ variables: {
        createUserInput: {
            name: data.name,
            email: data.email,
            password: data.password
        }
        }});

    if(response.data && response.data.createUser.id) {
        Toast.show('Successfully registered', {
            duration: Toast.durations.SHORT,
        });
    
        router.push('/');
    }
  }

  return (
    <S.Container>
        <S.Form>
            <S.Header>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={24} />
                </TouchableOpacity>
                <S.TitleContainer> 
                    <S.Title>Register</S.Title>
                </S.TitleContainer>
            </S.Header>
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <S.TextInput
                    placeholder="name"
                    onBlur={onBlur}
                    onChangeText={(text) => {
                        onChange(text)
                        reset()
                    }}
                    value={value}
                />
                )}
                name="name"
            />
            {errors.name && <Text style={{ color: '#fa2626', marginBottom: 16 }}>{errors.name.message}</Text>}

            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <S.TextInput
                    placeholder="email"
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
                    placeholder="password"
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

            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <S.TextInput
                    placeholder="confirmPassword"
                    onBlur={onBlur}
                     onChangeText={(text) => {
                        onChange(text)
                        reset()
                    }}
                    value={value}
                    secureTextEntry={true}
                />
                )}
                name="confirmPassword"
            />
            {errors.confirmPassword && <Text style={{ color: '#fa2626' }}>{errors.confirmPassword.message}</Text>}
        </S.Form>

      <S.Button onPress={handleSubmit(onSubmit)} disabled={loading}>
      {loading ? <ActivityIndicator size={25} color="#FFF" /> : <S.ButtonText>Register</S.ButtonText>}
      </S.Button>
      {error && error?.graphQLErrors[0]?.extensions?.originalError?.message && <Toast duration={Toast.durations.SHORT} style={{ backgroundColor: '#fa2626' }} visible={true} position={Toast.positions.BOTTOM} shadow={false} animation={true} hideOnPress={true}>{error?.graphQLErrors[0]?.extensions?.originalError?.message}</Toast>}
    </S.Container>
  )
}