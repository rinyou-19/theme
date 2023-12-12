import axios from 'axios';

import { useToDo } from './useToDo';

// Todoを取得するカスタムフック
export const useSelectToDos = () => {
  const { setToDos } = useToDo();

  const getToDos = (selectedOption: string) => {
    axios
      .get('api/TodoItems', { params: { selectedOption: selectedOption } })
      .then((res) => {
        // 取得したデータをセット
        setToDos(res.data);
      });
  };

  return { getToDos };
};
