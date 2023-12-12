import { FC, memo } from 'react';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

type Props = {
  isConfirmOpen: boolean;
  onConfirmClose: () => void;
  message: string;
};

// 確認モーダルのコンポーネント
// 表示するメッセージを受け取り、表示する
export const ConfirmModal: FC<Props> = memo((props: Props) => {
  const { isConfirmOpen, onConfirmClose, message } = props;

  return (
    <>
      <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>確認</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {message}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onConfirmClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
