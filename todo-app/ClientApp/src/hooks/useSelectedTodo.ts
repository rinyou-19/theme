import { useCallback, useState } from "react";

import { Todo } from "../types/Todo";
import { useTodo } from './useTodo';

type Props = {
  id: number;
  toDos: Array<Todo> | null;
  //todos: Todo;
}

// Todoを選択するカスタムフック
export const useSelectedTodo = () => {

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    
  const onSelectTodo = useCallback((props: Props) => {
    const { id, toDos } = props;
    if (toDos === null) return;
    const tageetTodo = toDos.find((todo) => todo.id === id);
    console.log("tageetTodo")
    console.log(tageetTodo)
    // !の使い方は要件等
    setSelectedTodo(tageetTodo!);
  }, []);
    
    return { selectedTodo, onSelectTodo };
}