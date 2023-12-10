import { FC
       , memo
} from 'react';

import { Flex
} from '@chakra-ui/react';

import { PrimaryButton } from '../atoms/PrimaryButton';
import { useTodo } from '../../hooks/useTodo';

type Props = {
  onOpen: () => void;
}

export const Footer: FC<Props> = memo((props: Props) => {

  const { onOpen } = props;
  const { setUpdateFlag } = useTodo();

  const onClickButton = () => {
    setUpdateFlag(false);
    onOpen();
  }

  return (
    <Flex height="50px" alignItems="center" justifyContent="center" >
      <PrimaryButton title="新規作成" onClick={onClickButton}/>
    </Flex>
  );
});