import styled from "styled-components/native";

export const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
`;

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Header = styled.View`
    margin-top: 64px;
    align-items: center;
`;

export const Form = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin: 8px 16px 16px 16px;
`;

export const TextInput = styled.TextInput`
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 50px;
    padding: 0 8px;
    width: 80%;
`;

export const Button = styled.TouchableOpacity`
    background-color: #1976D2;
    border-radius: 4px;
    height: 50px;
    justify-content: center;
    width: 20%;
    margin-left: 8px;
`;

export const ButtonText = styled.Text`
    color: #fff;
    text-align: center;
`;

export const ActivityIndicatorContainer = styled.View`
    flex: 1;
`;