import { FC, memo } from 'react';

import { Flex } from '@chakra-ui/react';

import { PrimaryButton } from '../atoms/PrimaryButton';
import { useToDo } from '../../hooks/useToDo';

type Props = {
  onOpen: () => void;
};

// フッターのコンポーネント
export const Footer: FC<Props> = memo((props: Props) => {
  const { onOpen } = props;
  const { setUpdateFlag } = useToDo();

  // 新規作成ボタン押下時の処理
  const onClickButton = () => {
    setUpdateFlag(false);
    onOpen();
  };

  return (
    <Flex height="50px" alignItems="center" justifyContent="center">
      <PrimaryButton title="新規作成" onClick={onClickButton} />
    </Flex>
  );
});
