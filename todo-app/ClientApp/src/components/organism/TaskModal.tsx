import { ChangeEvent, FC, memo, useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

import axios from 'axios';

import { useToDo } from '../../hooks/useToDo';
import { useSelectToDos } from '../../hooks/useSelectToDos';
import { ConfirmModal } from './ConfirmModal';
import { PrimaryButton } from '../atoms/PrimaryButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
};

type TodoItem = {
  id?: number;
  Contents: string;
  ExpectedEndOfDate: string;
  EndOfDate: string | null;
};

// ToDoの登録・更新・削除を行うコンポーネント
export const TaskModal: FC<Props> = memo((props: Props) => {

  const { isOpen, onClose, selectedOption } = props;
  const { updateFlag, selectedToDo } = useToDo();
  const { isOpen: isConfrimModalOpen, onOpen: onConfrimModalOpen, onClose: onConfrimModalClose } = useDisclosure();
  const [message, setMessage] = useState<string>('');
  const { getToDos } = useSelectToDos();

  // 入力値のstate
  const [contents, setContents] = useState<string>('');
  const [expectedEndOfDate, setexpectedEndOfDate] = useState<string>('');
  const [endOfDate, setendOfDate] = useState<string>('');

  useEffect(() => {
    if (selectedToDo !== null) {
      // 設定されたTodoをセットする
      setContents(selectedToDo.contents);
      setexpectedEndOfDate(selectedToDo.expectedEndOfDate as string);
      const endOfDateValue = selectedToDo.endOfDate === null ? '' : selectedToDo.endOfDate;
      setendOfDate(endOfDateValue);
    }
  }, [selectedToDo]);

  // 入力要素のChangeイベント
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContents(e.target.value);
  const onExpectedEndOfDate = (e: ChangeEvent<HTMLInputElement>) =>
    setexpectedEndOfDate(e.target.value);
  const onEndOfDate = (e: ChangeEvent<HTMLInputElement>) =>
    setendOfDate(e.target.value);

  // 登録ボタンのクリックイベント
  const onClickCreateButton = () => {
    // 入力値のチェック
    const checkErrorMessages = checkInputItem();

    if (checkErrorMessages !== '') {
      // チェック処理に問題がある場合
      showConfirmModal(checkErrorMessages);
      return;
    }

    const todoItem: TodoItem = {
      Contents: contents,
      ExpectedEndOfDate: expectedEndOfDate,
      EndOfDate: null,
    };

    axios
      .post('/api/TodoItems', todoItem)
      .then(() => {
        showConfirmModal('登録しました。');
        closeModel();
      })
      .catch(() => {
        showConfirmModal('登録できませんでした。');
      });
  };

  // 削除ボタンのクリックイベント
  const onClickDeleteButton = () => {
    axios
      .delete(`/api/TodoItems/${selectedToDo!.id}`)
      .then(() => {
        showConfirmModal('削除しました。');
        closeModel();
      })
      .catch(() => {
        showConfirmModal('削除できませんでした。');
      });
  };

  // 更新ボタンのクリックイベント
  const onClickUpdateButton = () => {
    // 入力値のチェック
    const checkErrorMessages = checkInputItem();

    if (checkErrorMessages !== '') {
      // チェック処理に問題がある場合
      showConfirmModal(checkErrorMessages);
      return;
    }

    const endOfDateValue = endOfDate === '' ? null : endOfDate;
    const todoItem: TodoItem = {
      id: selectedToDo!.id,
      Contents: contents,
      ExpectedEndOfDate: expectedEndOfDate,
      EndOfDate: endOfDateValue,
    };

    axios
      .put(`/api/TodoItems/${selectedToDo!.id}`, todoItem)
      .then(() => {
        showConfirmModal('更新しました。');
        closeModel();
      })
      .catch(() => {
        showConfirmModal('更新できませんでした。');
      });
  };

  // 項目のチェック処理
  const checkInputItem = () => {
    // 内容のチェック
    if (contents === '') {
      return 'ToDoを入力してください';
    }
    // 完了予定日のチェック
    if (expectedEndOfDate === '') {
      return '完了予定日を入力してください';
    }
    // チェック処理に問題がない場合
    return '';
  };

  // 入力項目初期化
  const initInputItems = () => {
    setContents('');
    setexpectedEndOfDate('');
    setendOfDate('');
  };

  // 確認ダイアログを表示する処理
  const showConfirmModal = (confirmMessage: string) => {
    setMessage(confirmMessage);
    onConfrimModalOpen();
  }

  // モーダルを閉じる際の処理
  const closeModel = () => {
    initInputItems();
    onClose();
    getToDos(selectedOption);
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
                <Textarea
                  value={contents}
                  onChange={onChangeContents}
                  maxLength={100}
                />
              </FormControl>
              <FormControl>
                <FormLabel>完了予定日</FormLabel>
                <Input
                  type={'date'}
                  value={expectedEndOfDate}
                  onChange={onExpectedEndOfDate}
                />
              </FormControl>
              {updateFlag && (
                <FormControl>
                  <FormLabel>完了日</FormLabel>
                  <Input
                    type={'date'}
                    value={endOfDate}
                    onChange={onEndOfDate}
                  />
                </FormControl>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              閉じる
            </Button>
            {updateFlag ? (
              <PrimaryButton title="削除" onClick={onClickDeleteButton} />
            ) : (
              <></>
            )}
            {updateFlag ? (
              <PrimaryButton title="更新" onClick={onClickUpdateButton} />
            ) : (
              <></>
            )}
            {updateFlag ? (
              <></>
            ) : (
              <PrimaryButton title="作成" onClick={onClickCreateButton} />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ConfirmModal isConfirmOpen={isConfrimModalOpen} onConfirmClose={onConfrimModalClose} message={message} />
    </>
  );
});
