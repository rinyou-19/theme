import axios from 'axios';

import { useTodo } from './useTodo';

// Todoを取得するカスタムフック
export const useSelectTodos  = () => {

  const { setToDos } = useTodo();

  const getAllTodos = (a: any) => {
    axios.get('api/todoitems', {params: {a:a}}).then((res) => {
      // 取得したデータをセット
      setToDos(res.data);
    });
  }

  return { getAllTodos };
}