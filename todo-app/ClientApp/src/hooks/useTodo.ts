import { useContext } from 'react';

import { TodoContext, TodoContextType } from '../providers/TodoProvider';

// TodoContextを使用するためのカスタムフック
export const useTodo = () : TodoContextType => useContext(TodoContext);