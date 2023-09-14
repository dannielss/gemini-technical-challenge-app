import { FlatList } from "react-native";
import Checkbox from "expo-checkbox";
import { MaterialIcons} from '@expo/vector-icons';
import FooterList from "../FooterList";
import { Todo } from "../../types/todo";
import * as S from './styles';

interface ListProps {
  data: Todo[];
  handleFetchMore: () => void;
  fetching: boolean;
  toggleTodo: (todo: Todo) => void;
  check: (item: Todo) => boolean;
  handleRemove: (todo: Todo) => void;
}

export default function List({ data, handleFetchMore, fetching, toggleTodo, check, handleRemove }: ListProps) {
    return (
        <S.FlatListContainer>
          <FlatList
            data={data}
            scrollEnabled={true}
            keyExtractor={(item: Todo) => item.id}
            onEndReached={handleFetchMore}
            onEndReachedThreshold={0.05}
            ListFooterComponent={<FooterList load={fetching} />}
            renderItem={({ item }: { item: Todo }) => (
              <S.TodoContainer>
                  <S.Todo>
                    <Checkbox
                      style={{ width: 36, height: 36 }}
                      onValueChange={() => toggleTodo(item)}
                      value={check(item)}	
                      color={item.checked ? '#4630EB' : undefined}
                    />
                    <S.TodoText>{item.description}</S.TodoText>
                  </S.Todo>
                  <S.IconContainer onPress={() => handleRemove(item)}>
                    <MaterialIcons name="remove-circle" size={24} />
                  </S.IconContainer>
              </S.TodoContainer>
            )}
          />
        </S.FlatListContainer>
    );
}