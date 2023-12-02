import { FC
       , memo
} from 'react';
import { Button
} from '@chakra-ui/react';

type Props = {
  title: string;
  onClick: () => void;
}

export const PrimaryButton: FC<Props> = memo((props) => {
  const { title, onClick } = props;
  return (
    <Button onClick={onClick}>{title}</Button>
  );
});