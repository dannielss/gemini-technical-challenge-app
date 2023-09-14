import * as S from './styles';

interface FilterProps {
    filter: string;
    handleFilter: (filter: string) => void;
}

export default function Filter({ filter, handleFilter }: FilterProps) {
    return (
        <S.FilterContainer>
            <S.FilterButton background={filter == 'todo' ? "#1976D2" : '#464343b5'} onPress={() => handleFilter('todo')}>
                <S.ButtonText>TO DO</S.ButtonText>
            </S.FilterButton>
            <S.FilterButton marginLeft="8px" background={filter == 'done' ? "#1976D2" : '#464343b5'} onPress={() => handleFilter('done')}>
                <S.ButtonText>DONE</S.ButtonText>
            </S.FilterButton>
        </S.FilterContainer>
    );
}