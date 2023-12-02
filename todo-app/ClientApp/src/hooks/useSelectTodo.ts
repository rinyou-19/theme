import { useCallback, useState } from "react";

import { Todo } from "../types/Todo";

type Props = {
  id: number;
  todos: Array<Todo>;
}

export const useSelectTodo = () => {

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    
  const onSelectTodo = useCallback((props: Props) => {
    const { id, todos } = props;
    const selectedTodo = todos.find((todo) => todo.id === id);
    // !の使い方は要件等
    setSelectedTodo(selectedTodo!);
  }, []);
    
    return { selectedTodo, onSelectTodo };
}