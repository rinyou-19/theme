import { createContext , Dispatch , SetStateAction, ReactNode, useState } from "react";

import { Todo } from "../types/Todo";

export type TodoContextType = {
    id : number;
    toDos : Todo[] | null;
    selectedTodo : Todo | null;
    updateFlag : boolean;
    todoStatus : number;
    setSelectedToDo : Dispatch<SetStateAction<Todo | null>>;
    setToDos : Dispatch<SetStateAction<Todo[] | null>>;
    setUpdateFlag : Dispatch<SetStateAction<boolean>>;
    setId : Dispatch<SetStateAction<number>>;
    setTodoStatus : Dispatch<SetStateAction<number>>;
}

export const TodoContext = createContext<TodoContextType>({} as TodoContextType);

export const TodoProvider = (props : {children : ReactNode}) => {

  const { children } = props;
  // Todo一覧のデータ
  const [toDos, setToDos] = useState<Todo[] | null>(null);
  // 選択したTodo
  const [selectedTodo, setSelectedToDo] = useState<Todo | null>(null);
  // Todo登録・更新のフラグ
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  // Todo登録・更新のID
  const [id, setId] = useState<number>(0);
  // Todo検索条件
  const [todoStatus, setTodoStatus] = useState<number>(0);

  return (
    <TodoContext.Provider value={{ toDos, setToDos
                                 , updateFlag, setUpdateFlag
                                 , id, setId
                                 , todoStatus, setTodoStatus
                                 , selectedTodo, setSelectedToDo }}>
      {children}
    </TodoContext.Provider>
  )
}