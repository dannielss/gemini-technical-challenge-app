import { Dimensions } from "react-native";
import { Image } from 'expo-image';
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    padding: 0 16px;
    justify-content: flex-end;
`;

export const Content = styled.View`
    background: #5291f0;
    height: ${Dimensions.get('screen').height / 3}px;
    position: relative;
`;

export const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
    color: #fff;
    margin-top: 64px;
`;

export const Card = styled.View`
    background: #fff;
    height: 200px;
    position: absolute;
    top: 150px;
    left: 0;
    width: ${Dimensions.get('screen').width - 32}px;
    margin: 16px;
    border-radius: 16px;
    elevation: 20;
    padding: 16px;
    display: flex;
    align-items: center;
`;

export const CustomImage = styled(Image)`
    width: 100px;
    height: 100px;
    padding: 0;
    content-fit: contain;
    margin-bottom: 8px;
`;

export const InfoText = styled.Text<{ fontSize?: string, fontWeight?: string }>`
    color: #666;
    font-size: ${props => props.fontSize || '16px'};
    font-weight: ${props => props.fontWeight || 'normal'};
`;
export const Button = styled.TouchableOpacity`
    background-color: #ff0000d4;
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
