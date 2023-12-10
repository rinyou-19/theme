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
} from '@chakra-ui/react';

import axios from 'axios';

import { useTodo } from '../../hooks/useTodo';
import { useSelectTodos } from '../../hooks/useSelectTodos';

type Props = {
  isConfirmOpen: boolean;
  onConfirmClose: () => void;
  message: string;
};

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
            <Button colorScheme="blue" mr={3} onClick={onConfirmClose}>
              閉じる
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
