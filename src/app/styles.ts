import { Image } from "expo-image";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
`;

export const TextInput = styled.TextInput`
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
`;

export const Button = styled.TouchableOpacity`
    background-color: #1976D2;
    height: 40px;
    justify-content: center;
    border-radius: 4px;
    width: 100%;
    margin-top: 8px;
    margin-bottom: 16px;
`;

export const ButtonText = styled.Text`
    color: #fff;
    text-align: center;
`;

export const LinkText = styled.Text`
    color: #666;
`;

export const CustomImage = styled(Image)`
    width: 100px;
    height: 100px;
    padding: 0;
    content-fit: contain;
    margin-bottom: 20px;
`;

export const Form = styled.View`
    width: 100%;
`;