import { FC
       , memo
} from 'react';
import { Radio
       , RadioGroup
} from '@chakra-ui/react';

import { useTodo } from '../../hooks/useTodo';

type buttonElement = {
  id: number;
  title: string;
}

type Props = {
  selectedItems: Array<buttonElement>
}

export const RadioButton: FC<Props> = memo((props: Props) => {
  // ラジオボタンのvalue
  const { selectedItems } = props;
  // Todo検索条件
  const { todoStatus, setTodoStatus } = useTodo();

  return (
    <>
      <RadioGroup mr={4} p={2} defaultValue={selectedItems[0].title}>
        {selectedItems.map((item) => (
          <Radio key={item.id} value={item.title}>{item.title}</Radio>
        ))}
      </RadioGroup>
    </>
  );
});