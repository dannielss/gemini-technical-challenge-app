import styled from "styled-components/native";

export const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
`;

export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    text-align: center;
    margin-bottom: 16px;
`;

export const TitleContainer = styled.View`
    flex: 1;
    padding-right: 24px;
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