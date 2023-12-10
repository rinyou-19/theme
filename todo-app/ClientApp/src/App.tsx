import { ChakraProvider } from '@chakra-ui/react';
import { useDisclosure} from '@chakra-ui/react';
import { useState } from 'react';

import { TodoProvider } from './providers/TodoProvider';
import { Header } from './components/organism/Header';
import { Query } from './components/organism/Query';
import { DataTable } from './components/organism/DataTable';
import { Footer } from './components/organism/Footer';
import { TaskModal } from './components/organism/TaskModal';

export const App = () => {
  // Todo一覧のヘッダー項目
  const headerItems = ['id', '内容', '完了予定日', '完了日'];
  // Todo一覧のデータ
  const { isOpen, onOpen, onClose } = useDisclosure();
  // 検索条件の選択状態
  const [selectedOption, setSelectedOption] = useState('すべて');

  return (
    <>
      <ChakraProvider>
        <TodoProvider>
          <Header />
          <Query selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          <DataTable headerItems={headerItems} onOpen={onOpen} />
          <Footer onOpen={onOpen} />
          <TaskModal isOpen={isOpen} onClose={onClose} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </TodoProvider>
      </ChakraProvider> 
    </>
  )
}