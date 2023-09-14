import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
`;

export const TextInput = styled.TextInput<{ border?: string }>`
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    margin-top: ${({ border }) => border};
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