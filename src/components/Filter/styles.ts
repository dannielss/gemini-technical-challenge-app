import styled from "styled-components/native";

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

export const ButtonText = styled.Text`
    color: #fff;
    text-align: center;
`;