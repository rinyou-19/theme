import { useCallback, useState } from 'react';

import { ToDo } from '../types/ToDo';

type Props = {
  id: number;
  toDos: Array<ToDo> | null;
};

// Todoを選択するカスタムフック
export const useSelectedToDo = () => {
  const [selectedToDo, setSelectedToDo] = useState<ToDo | null>(null);

  const onSelectToDo = useCallback((props: Props) => {
    const { id, toDos } = props;
    if (toDos === null) return;
    const tageetToDo = toDos.find((toDo) => toDo.id === id);
    if (tageetToDo === undefined) return;
    setSelectedToDo(tageetToDo);
  }, []);

  return { selectedToDo, onSelectToDo };
};
