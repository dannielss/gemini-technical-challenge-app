import styled from "styled-components/native";

export const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
`;

export const Container = styled.View`
    margin-top: 64px;
    flex: 1;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 16px;
`;

export const TextInput = styled.TextInput`
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 50px;
    padding: 0 8px;
    width: 100%;
    margin-bottom: 16px;
`;

export const Button = styled.TouchableOpacity`
    background-color: #1976D2;
    border-radius: 4px;
    height: 40px;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ButtonText = styled.Text`
    color: #fff;
`;

export const Form = styled.View`
    width: 100%;
    flex: 1;
`;