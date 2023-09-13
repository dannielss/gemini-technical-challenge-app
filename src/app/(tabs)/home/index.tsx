import { gql, useMutation, useQuery } from '@apollo/client';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { userStore } from '../../../store/user';
import { useState } from 'react';
import { MaterialIcons} from '@expo/vector-icons';
import * as S from './styles';

const GET_TODOS = gql`
  query todos($userId: String!, $page: Int!, $checked: Boolean!) {
    todos(userId: $userId, page: $page, checked: $checked) {
      list {
        id
        description
        checked
      }
      pagination {
        total
        page
        totalPages
      }
    }
  }
`;

const CREATE_TODO = gql`
  mutation createTodo($createTodoInput: TodoInput! ) {
    createTodo(createTodoInput: $createTodoInput) {
      id
      description
      checked
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($id: String!, $updateTodoInput: TodoInput! ) {
      updateTodo(id: $id, updateTodoInput: $updateTodoInput) {
        affected
      }
  }
`;

const REMOVE_TODO = gql`
  mutation removeTodo($id: String!) {
    removeTodo(id: $id) {
      affected
    }
  }
`;

export default function Home() {
  const { id } = userStore();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('todo');
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_TODOS, { variables: { userId: id, page: 1, checked: false }});
  const [createTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);
  const [todo, setTodo] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  if(loading) return <Text>Loading...</Text>

  const handlePress = async () => {
    await createTodo({ variables: {
      createTodoInput: {
        description: todo,
        checked: false,
        userId: id
      }
    }});

    refetch({ userId: id, page, checked: !(filter === 'todo')});
  }

  const toggleTodo = async (todo: any) => {
    await updateTodo({ variables: {
      id: todo.id,
      updateTodoInput: {
        description: todo.description,
        checked: !todo.checked,
        userId: id
      }
    }});

    refetch({ userId: id, page: 1, checked: !(filter === 'todo')});
  }

  const handleRemove = async (todo: any) => {
    await removeTodo({ variables: {
      id: todo.id
    }});

    refetch({ userId: id, page, checked: !(filter === 'todo')});
  }

  const handleFilter = (newFilter: string) => {
    setPage(1);
    setFilter(newFilter)

    refetch({ userId: id, page: 1, checked: !(newFilter === 'todo') });
  }

  const updateQuery = (prev: any, { fetchMoreResult }: any) => {
    fetchMoreResult.todos.list = [...prev.todos.list, ...fetchMoreResult.todos.list];
    return fetchMoreResult;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>To Do List</S.Title>
        <S.Form>
          <S.TextInput placeholder='Create a new to do' value={todo} onChangeText={(text) => setTodo(text)} />
          <S.Button onPress={handlePress}>
            <S.ButtonText>ADD</S.ButtonText>
          </S.Button>
        </S.Form>
      </S.Header>

      <S.FilterContainer>
        <S.FilterButton background={filter == 'todo' ? "#1976D2" : '#464343b5'} onPress={() => handleFilter('todo')}>
          <S.ButtonText>TO DO</S.ButtonText>
        </S.FilterButton>
        <S.FilterButton marginLeft="8px" background={filter == 'done' ? "#1976D2" : '#464343b5'} onPress={() => handleFilter('done')}>
          <S.ButtonText>DONE</S.ButtonText>
        </S.FilterButton>
      </S.FilterContainer>
      
      <View style={{ flex: 1}}>
        <FlatList
        style={{ marginTop: 35}}
          data={data.todos.list}
          scrollEnabled={true}
          keyExtractor={(item: any) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => {
              setRefreshing(true);
              refetch({ userId: id, page, checked: !(filter === 'todo') });
              setRefreshing(false);
            }} />
          }
          onEndReached={() => {
            if(page + 1 > data.todos.pagination.totalPages) return;
            setPage((prev) => prev + 1);
            fetchMore({
              variables: { userId: id, page: page + 1, checked: !(filter === 'todo') },
              updateQuery
            })
          }}
          onEndReachedThreshold={0.1}
          renderItem={({ item }: any) => (
            <S.TodoContainer>
                <S.Todo>
                  <S.IconContainer onPress={() => toggleTodo(item)}>
                    <Checkbox
                    style={{ zIndex: -1 }}
                      value={item.checked}
                      color={item.checked ? '#4630EB' : undefined}
                    />
                  </S.IconContainer>
                  <S.TodoText>{item.description}</S.TodoText>
                </S.Todo>
                <S.IconContainer onPress={() => handleRemove(item)}>
                  <MaterialIcons name="remove-circle" size={24} />
                </S.IconContainer>
            </S.TodoContainer>
          )}
        />
      </View>
    </S.Container>
  );
}