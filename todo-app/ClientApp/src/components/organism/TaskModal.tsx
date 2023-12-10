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
import { useSelectTodos } from '../../hooks/useSelectTodos';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
}

type TodoItem = {
  id?: number;
  Contents : string;
  ExpectedEndOfDate : string;
  EndOfDate : string | null;
}

export const TaskModal: FC<Props> = memo((props: Props) => {

  const { isOpen, onClose, selectedOption } = props;
  const { updateFlag } = useTodo();

  // 選択されたTodo
  const { selectedTodo } = useTodo();
  const { getAllTodos } = useSelectTodos();

  // 入力値のstate
  const [contents, setContents] = useState<string>('');
  const [expectedEndOfDate, setexpectedEndOfDate] = useState<string>('');
  const [endOfDate, setendOfDate] = useState<string>('');

  useEffect(() => {
    if (selectedTodo !== null) {
      // 設定されたTodoをセットする
      setContents(selectedTodo.contents);
      setexpectedEndOfDate(selectedTodo.expectedEndOfDate as string);
      setendOfDate(selectedTodo.endOfDate as string);
    }
  }, [selectedTodo])


  // 入力要素のChangeイベント
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => setContents(e.target.value);
  const onExpectedEndOfDate = (e: ChangeEvent<HTMLInputElement>) => setexpectedEndOfDate(e.target.value);
  const onEndOfDate = (e: ChangeEvent<HTMLInputElement>) => setendOfDate(e.target.value);

  // 登録ボタンのクリックイベント
  const onClickCreateButton = () => {

    // 入力値のチェック
    const checkErrorMessages = checkInputItem();

    if (checkErrorMessages !== "") {
      // チェック処理に問題がある場合
      alert(checkErrorMessages);
      return;
    }

    const todoItem: TodoItem = {
      Contents: contents,
      ExpectedEndOfDate: expectedEndOfDate,
      EndOfDate: null,
    }

    axios.post("/api/TodoItems", todoItem).then((res) => {
       alert('登録しました。');
       initInputItems();
       onClose();
       // データ取得
       getAllTodos(selectedOption);
    }).catch((error) => {
      alert('失敗しました');
    });
  }

  // 削除ボタンのクリックイベント
  const onClickDeleteButton = () => {

    axios.delete(`/api/TodoItems/${selectedTodo!.id}`).then((res) => {
      alert('削除しました。');
      initInputItems();
      onClose();
      // データ取得
      getAllTodos(selectedOption);
    }).catch((error) => {
    });
  }

  // 項目のチェック処理
  const checkInputItem = () => {
    // 内容のチェック
    if (contents === '') {
      return "Todoを入力してください";
    }
    // 完了予定日のチェック
    if (expectedEndOfDate === '') {
      return "完了予定日を入力してください";
    }
    // チェック処理に問題がない場合
    return "";
  }

  // 更新ボタンのクリックイベント
  const onClickUpdateButton = () => {
    // 入力値のチェック
    const checkErrorMessages = checkInputItem();

    if (checkErrorMessages !== "") {
      // チェック処理に問題がある場合
      alert(checkErrorMessages);
      return;
    }

    const todoItem: TodoItem = {
      id: selectedTodo!.id,
      Contents: contents,
      ExpectedEndOfDate: expectedEndOfDate,
      EndOfDate: endOfDate,
    }
      
    axios.put(`/api/TodoItems/${selectedTodo!.id}`, todoItem).then((res) => {
      alert('登録しました。');
      initInputItems();
      onClose();
      // データ取得
      getAllTodos(selectedOption);
    }).catch((error) => {
    });
  }

  // 入力項目初期化
  const initInputItems = () => {
    setContents('');
    setexpectedEndOfDate('');
    setendOfDate('');
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Todo</ModalHeader>
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
            <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
            {updateFlag ? <Button variant='ghost' onClick={onClickDeleteButton}>削除</Button> : <></>}
            {updateFlag ? <Button variant='ghost' onClick={onClickUpdateButton}>更新</Button> : <></>}
            {updateFlag ? <></> : <Button variant='ghost' onClick={onClickCreateButton}>作成</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});