import { useContext } from 'react';

import { ToDoContext, ToDoContextType } from '../providers/ToDoProvider';

// TodoContextを使用するためのカスタムフック
export const useToDo = (): ToDoContextType => useContext(ToDoContext);
