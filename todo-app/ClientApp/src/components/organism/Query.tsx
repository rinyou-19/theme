import { FC, memo } from 'react';
import { Card, CardBody, CardHeader, Flex, Heading } from '@chakra-ui/react';

import { PrimaryButton } from '../atoms/PrimaryButton';
import { RadioButton } from '../atoms/RadioButton';
import { useSelectTodos } from '../../hooks/useSelectTodos';

type Props = {
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
};

export const Query: FC<Props> = memo((props: Props) => {
  const { selectedOption, setSelectedOption } = props;
  const { getToDos } = useSelectTodos();
  // 検索条件の項目
  const selectedItems = [
    { id: 11, title: 'すべて' },
    { id: 12, title: '未完了' },
    { id: 13, title: '完了済み' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const onClickSearchButton = () => {
    // データ取得
    getToDos(selectedOption);
  };

  return (
    <>
      <Card height="96px">
        <CardHeader p={2}>
          <Heading size="md">検索条件</Heading>
        </CardHeader>
        <CardBody p={2}>
          <Flex justify="left">
            <RadioButton
              radioButtonItems={selectedItems}
              selectedOption={selectedOption}
              onChange={handleChange}
            />
            <PrimaryButton title="表示" onClick={onClickSearchButton} />
          </Flex>
        </CardBody>
      </Card>
    </>
  );
});
