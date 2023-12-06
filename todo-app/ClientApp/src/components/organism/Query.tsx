import { FC
       , memo
} from 'react';
import { Card
       , CardBody
       , CardHeader   
       , Flex
       , Heading
} from '@chakra-ui/react';

import { PrimaryButton } from '../atoms/PrimaryButton';
import { RadioButton } from '../atoms/RadioButton';
import { useSelectTodos } from '../../hooks/useSelectTodos';

enum TodoStatus {
  ALL = 11,
  INCOMPLETE = 12,
  COMPLETE = 13
}

export const Query: FC = memo(() => {

  const { getAllTodos } = useSelectTodos();
  // 検索条件の項目
  const selectedItems = [ { id: 11, title: 'すべて' }
                        , { id: 12, title: '未完了' }
                        , { id: 13, title: '完了済み' }];

  const onClickSearchButton = () => {
    // データ取得
    getAllTodos();
  }
  return (
    <>
      <Card height="96px">
        <CardHeader p={2}>
          <Heading size='md'>検索条件</Heading>
        </CardHeader>
        <CardBody p={2}>
          <Flex justify='left'>
            <RadioButton radioButtonItems={selectedItems}/>     
            <PrimaryButton title="表示" onClick={onClickSearchButton}/>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
});