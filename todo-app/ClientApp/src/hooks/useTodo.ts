import { useContext } from 'react';

import { TodoContext, TodoContextType } from '../providers/TodoProvider';

export const useTodo = () : TodoContextType => useContext(TodoContext);