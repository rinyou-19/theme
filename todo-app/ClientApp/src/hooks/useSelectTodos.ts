import axios from 'axios';

import { useTodo } from './useTodo';

// Todoを取得するカスタムフック
export const useSelectTodos = () => {
  const { setToDos } = useTodo();

  const getToDos = (selectedOption: string) => {
    axios
      .get('api/todoitems', { params: { selectedOption: selectedOption } })
      .then((res) => {
        // 取得したデータをセット
        setToDos(res.data);
      });
  };

  return { getToDos };
};
