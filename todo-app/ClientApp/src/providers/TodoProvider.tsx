import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
} from 'react';

import { ToDo } from '../types/ToDo';

export type ToDoContextType = {
  id: number;
  toDos: ToDo[] | null;
  selectedToDo: ToDo | null;
  updateFlag: boolean;
  toDoStatus: number;
  setSelectedToDo: Dispatch<SetStateAction<ToDo | null>>;
  setToDos: Dispatch<SetStateAction<ToDo[] | null>>;
  setUpdateFlag: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<number>>;
  setToDoStatus: Dispatch<SetStateAction<number>>;
};

export const ToDoContext = createContext<ToDoContextType>(
  {} as ToDoContextType
);

export const ToDoProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  // ToDo一覧のデータ
  const [toDos, setToDos] = useState<ToDo[] | null>(null);
  // 選択したToDo
  const [selectedToDo, setSelectedToDo] = useState<ToDo | null>(null);
  // ToDo登録・更新のフラグ
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  // ToDo登録・更新のID
  const [id, setId] = useState<number>(0);
  // Todo検索条件
  const [toDoStatus, setToDoStatus] = useState<number>(0);

  return (
    <ToDoContext.Provider
      value={{
        toDos,
        setToDos,
        updateFlag,
        setUpdateFlag,
        id,
        setId,
        toDoStatus,
        setToDoStatus,
        selectedToDo,
        setSelectedToDo,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
