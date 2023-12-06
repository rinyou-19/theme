import { FC
       , memo
} from 'react';
import { Radio
       , RadioGroup
} from '@chakra-ui/react';

type radioButtonElement = {
  id: number;
  title: string;
}

type Props = {
  radioButtonItems: Array<radioButtonElement>
}

export const RadioButton: FC<Props> = memo((props: Props) => {
  // ラジオボタンのvalue
  const { radioButtonItems } = props;

  return (
    <>
      <RadioGroup mr={4} p={2} defaultValue={radioButtonItems[0].title}>
        {radioButtonItems.map((radioButtonItem) => (
          <Radio key={radioButtonItem.id} value={radioButtonItem.title}>{radioButtonItem.title}</Radio>
        ))}
      </RadioGroup>
    </>
  );
});