import { FC, memo } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  title: string;
  onClick: () => void;
};

// ボタンのコンポーネント
// ボタンのタイトルとクリック時の処理を受け取る
export const PrimaryButton: FC<Props> = memo((props) => {
  const { title, onClick } = props;
  return <Button mr={3} colorScheme="blue" onClick={onClick}>{title}</Button>;
});
