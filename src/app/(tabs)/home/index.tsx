import { gql, useMutation, useQuery } from '@apollo/client';
import { ActivityIndicator, FlatList, Keyboard, RefreshControl, Text, View } from 'react-native';
import { userStore } from '../../../store/user';
import { useState } from 'react';
import * as S from './styles';
import { Filter, List } from '../../../components';
import { Todo } from '../../../types/todo';
import Toast from 'react-native-root-toast';

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
  const { data, loading, refetch, fetchMore } = useQuery(GET_TODOS, { variables: { userId: id, page: 1, checked: false }});
  const [createTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);
  const [todo, setTodo] = useState('');
  const [fetching, setFetching] = useState(false);
  const [checked, setChecked] = useState('');

  const handlePress = async () => {
    setPage(1);
    await createTodo({ variables: {
      createTodoInput: {
        description: todo,
        checked: false,
        userId: id
      }
    }});

    Toast.show('Todo created successfully', {
      duration: Toast.durations.SHORT,
    });

    Keyboard.dismiss();
    setTodo('');
    refetch({ userId: id, page: 1, checked: !(filter === 'todo')});
  }

  const toggleTodo = async (todo: Todo) => {
    setChecked(todo.id);
    await updateTodo({ variables: {
      id: todo.id,
      updateTodoInput: {
        description: todo.description,
        checked: !todo.checked,
        userId: id
      }
    }});

    setChecked('');
    refetch({ userId: id, page: 1, checked: !(filter === 'todo')});
  }

  const handleRemove = async (todo: Todo) => {
    setPage(1);
    await removeTodo({ variables: {
      id: todo.id
    }});

    Toast.show('Todo removed successfully', {
      duration: Toast.durations.SHORT,
    });

    refetch({ userId: id, page: 1, checked: !(filter === 'todo')});
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

  const check = (item: Todo): boolean => {
    if(checked === item.id && filter === 'todo') {
      return true;
    }

    if(checked === item.id && filter !== 'todo') {
      return false;
    }

    return item.checked;
  }

  const handleFetchMore = async () => {
    if(page + 1 > data.todos.pagination.totalPages) return;
    setFetching(true);
    setPage((prev) => prev + 1);
    await fetchMore({
      variables: { userId: id, page: page + 1, checked: !(filter === 'todo') },
      updateQuery
    })
    setFetching(false);
  }

  const handleChange = (text: string) => {
    if(text.length > 30) {
      return;
    }

    setTodo(text);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>To Do List</S.Title>
        <S.Form>
          <S.TextInput placeholder='Create a new to do' value={todo} onChangeText={(text) => handleChange(text)} />
          <S.Button onPress={handlePress}>
            <S.ButtonText>ADD</S.ButtonText>
          </S.Button>
        </S.Form>
      </S.Header>

      <Filter filter={filter} handleFilter={handleFilter} />
      
      {!loading ? (
        <List 
          data={data.todos.list}
          check={check} 
          fetching={fetching} 
          handleFetchMore={handleFetchMore} 
          handleRemove={handleRemove} 
          toggleTodo={toggleTodo} 
        /> 
      ) : (
        <S.ActivityIndicatorContainer>
          <ActivityIndicator size={25} color="#121212"/>
        </S.ActivityIndicatorContainer>
      )}
       
    </S.Container>
  );
}