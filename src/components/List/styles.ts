import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const FlatListContainer = styled.View`
    flex: 1;
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
`;