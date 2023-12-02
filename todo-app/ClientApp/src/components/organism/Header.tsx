import { FC
       , memo
} from 'react';
import { Flex
       , Heading
 } from '@chakra-ui/react';

 export const Header: FC = memo(() => {
  return (
    <Flex as='nav' bg='teal.500' justify='center' padding={{ base: 3, md: 5}} height="83.2px">
      <Heading as='h1' size='xl' color='white'>
        Todoアプリ
      </Heading>
    </Flex>
  );
 });