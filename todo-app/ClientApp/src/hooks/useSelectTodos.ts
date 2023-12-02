import { useCallback, useState } from 'react';
import axios from 'axios';

import { useTodo } from './useTodo';

export const useSelectTodos  = () => {

  const { setToDos } = useTodo();

  // const getTodos = useCallback(() => {
  //   axios.get('api/todoitems').then((res) => {
  //     // 取得したデータをセット
  //     setToDos(res.data);
  //   });
  // }, [setToDos])
  const getAllTodos = () => {
    axios.get('api/todoitems').then((res) => {
      console.log(res.data);
      // 取得したデータをセット
      setToDos(res.data);
    });
  }

  return { getAllTodos };
}