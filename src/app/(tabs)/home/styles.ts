import { Dimensions } from "react-native";
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

export const TextInput = styled.TextInput<{ border?: string }>`
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

export const TodoContainer = styled.View`
    border: 1px;
    width: ${Dimensions.get('window').width - 24}px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    border-radius: 4px;
    padding: 8px 16px;
`;

export const FilterContainer = styled.View`
    display: flex;
    flex-direction: row;
    margin: 32px 0;
`;

export const FilterButton = styled.TouchableOpacity<{ marginLeft?: string, background: string }>`
    border: none;
    background: ${props => props.background};
    border-radius: 4px;
    padding: 8px;
    font-weight: bold;
    margin-left: ${props => props.marginLeft || '0px'};
`;

export const Todo = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const TodoText = styled.Text`
    margin-left: 16px;
    font-size: 16px;
`;

export const IconContainer = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
`;