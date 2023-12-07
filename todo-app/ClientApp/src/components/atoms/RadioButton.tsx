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
  radioButtonItems: Array<radioButtonElement>;
  selectedOption: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButton: FC<Props> = memo((props: Props) => {
  // ラジオボタンのvalue
  const { radioButtonItems, selectedOption, onChange } = props;

  return (
    <>
      <RadioGroup mr={4} p={2} defaultValue={radioButtonItems[0].title}>
        {radioButtonItems.map((radioButtonItem) => (
          <Radio key={radioButtonItem.id} value={radioButtonItem.title} checked={selectedOption === radioButtonItem.title}
          onChange={onChange}>{radioButtonItem.title}</Radio>
        ))}
      </RadioGroup>
    </>
  );
});