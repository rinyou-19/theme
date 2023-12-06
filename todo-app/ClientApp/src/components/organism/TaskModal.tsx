import {
         ChangeEvent
       , FC
       , memo
       , useEffect, useState
} from 'react';

import { Button
       , FormControl
       , FormLabel
       , Input
       , Modal
       , ModalOverlay
       , ModalContent
       , ModalHeader
       , ModalFooter
       , ModalBody
       , ModalCloseButton
       , Stack
       , Textarea 
} from '@chakra-ui/react';

import axios from 'axios';

import { useTodo } from '../../hooks/useTodo';
import { useSelectedTodo } from '../../hooks/useSelectedTodo';

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

type TodoItem = {
  id?: number;
  Contents : string;
  ExpectedEndOfDate : string;
  EndOfDate : string | null;
}

export const TaskModal: FC<Props> = memo((props: Props) => {

  const { isOpen, onClose } = props;
  const { updateFlag } = useTodo();

  // 選択されたTodo
  const { selectedTodo, setSelectedToDo } = useTodo();

  // 入力値のstate
  const [contents, setContents] = useState<string>('');
  const [expectedEndOfDate, setexpectedEndOfDate] = useState<string>('');
  const [endOfDate, setendOfDate] = useState<string>('');

  useEffect(() => {
    if (selectedTodo !== null) {
      // 設定されたTodoをセットする
      setContents(selectedTodo.contents);
      setexpectedEndOfDate(selectedTodo.expectedEndOfDate as string);
      setendOfDate(selectedTodo.expectedEndOfDate as string);
    }
    console.log("selectedTodo")
    console.log(selectedTodo)
  }, [selectedTodo])


  // 入力要素のChangeイベント
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => setContents(e.target.value);
  const onExpectedEndOfDate = (e: ChangeEvent<HTMLInputElement>) => setexpectedEndOfDate(e.target.value);
  const onEndOfDate = (e: ChangeEvent<HTMLInputElement>) => setendOfDate(e.target.value);

  // ボタンのクリックイベント
  const onClickTodoButton = () => {
    // const todoItem: TodoItem = {
    //   Contents: selectedTodo?.contents as string,
    //   ExpectedEndOfDate: selectedTodo?.expectedEndOfDate as string,
    //   EndOfDate: selectedTodo?.endOfDate as string,
    // }
    // console.log(todoItem);
    if (contents === '') {
      alert('Todoを入力してください。');
      return;
    }
    if (expectedEndOfDate === '') {
      alert('完了予定日を入力してください。');
      return;
    }
    // 入力値のチェック
    const todoItem: TodoItem = {
      Contents: contents,
      ExpectedEndOfDate: expectedEndOfDate,
      // 値を設定しなくてもいい方法を探す
      EndOfDate: expectedEndOfDate,
    }

    axios.post("/api/TodoItems", todoItem).then((res: any) => {
       alert('登録しました。');
       setContents('');
       setexpectedEndOfDate('');
       setendOfDate('');
    }).catch((error: any) => {
       console.log(error);
    });
  }

  // 削除ボタンのクリックイベント
  const onClickDeleteButton = () => {

    axios.delete(`/api/TodoItems/${selectedTodo!.id}`).then((res: any) => {
      alert('削除しました。');
      setContents('');
      setexpectedEndOfDate('');
      setendOfDate('');
    }).catch((error: any) => {
         console.log(error);
    });
  }

  // 更新ボタンのクリックイベント
  const onClickUpdateButton = () => {
    // 入力値のチェック
    if (contents === '') {
      alert('Todoを入力してください。');
      return;
    }
    if (expectedEndOfDate === '') {
      alert('完了予定日を入力してください。');
      return;
    }
    // 入力値のチェック
    const todoItem: TodoItem = {
      Contents: contents,
      ExpectedEndOfDate: expectedEndOfDate,
      // 値を設定しなくてもいい方法を探す
      EndOfDate: expectedEndOfDate,
    }
      
    axios.put(`/api/TodoItems/${selectedTodo!.id}`, todoItem).then((res: any) => {
      alert('登録しました。');
      setContents('');
      setexpectedEndOfDate('');
      setendOfDate('');
    }).catch((error: any) => {
      console.log(error);
    });
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Todo</FormLabel>
                <Textarea value={contents} onChange={onChangeContents} maxLength={100}/>
              </FormControl>
              <FormControl>
                <FormLabel>完了予定日</FormLabel>
                <Input type={'date'} value={expectedEndOfDate} onChange={onExpectedEndOfDate} />
              </FormControl>
              {
                updateFlag && (
                <FormControl>
                  <FormLabel>完了日</FormLabel>
                    <Input type={'date'} value={endOfDate} onChange={onEndOfDate} />
                </FormControl>)
              }
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={onClickDeleteButton}>削除</Button>
            <Button variant='ghost' onClick={onClickUpdateButton}>更新</Button>
            <Button variant='ghost' onClick={onClickTodoButton}>新規作成</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});