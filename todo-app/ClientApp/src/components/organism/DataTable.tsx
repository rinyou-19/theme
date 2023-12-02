import { FC
       , memo
       , useCallback
} from 'react';
import { Table
       , Thead
       , Tbody
       , Tr
       , Th
       , Td
       , TableContainer
} from '@chakra-ui/react';

import { useTodo } from '../../hooks/useTodo';
import { useSelectTodo } from '../../hooks/useSelectTodo';

type Props = {
  headerItems: Array<string>;
  onOpen: () => void;
}

export const DataTable: FC<Props> = memo((props: Props) => {
  const { headerItems, onOpen } = props;

  const { toDos, setUpdateFlag } = useTodo();
  const { onSelectTodo } = useSelectTodo();

  const onClickDataTable = useCallback((id: number) => {
    // ダイアログの表示要素を切り替える
    setUpdateFlag(true);
    // 選択したTodoを設定する
    //onSelectTodo({id, toDos as any});
    onOpen();
  },[]);

  const onClickTest = () => {
    alert('test');
  }

  return (
    <TableContainer height="calc(100vh - 229.2px)">
      <Table variant='striped' colorScheme='teal'>
        <Thead>
          <Tr>
            {
              headerItems.map((headerItem) => (
                <Th key={headerItem}>{headerItem}</Th>
              ))
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            !toDos ? <></> : toDos.map((toDo) => (
              <Tr key={toDo.id} onClick={onClickTest} >
                <Td key={toDo.id! + 5}>{toDo.id}</Td>
                <Td key={toDo.id! + 6}>{toDo.contents}</Td>
                <Td key={toDo.id! + 7}>{toDo.expectedEndOfDate}</Td>
                <Td key={toDo.id! + 8}>{toDo.endOfDate}</Td>
              </Tr>
              ))
            }
        </Tbody>  
      </Table>
    </TableContainer>
  );
});