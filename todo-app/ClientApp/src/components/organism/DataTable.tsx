import { FC, memo, useCallback } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import { useTodo } from '../../hooks/useTodo';

type Props = {
  headerItems: Array<string>;
  onOpen: () => void;
};

// Todo一覧を表示するコンポーネント
export const DataTable: FC<Props> = memo((props: Props) => {
  // テーブルのヘッダー項目一覧
  const { headerItems, onOpen } = props;
  // Todo一覧と更新フラグ
  const { toDos, setUpdateFlag } = useTodo();
  // 選択したTodo
  const { setSelectedToDo } = useTodo();
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const onClickTableRow = useCallback(
    (id: number) => {
      // ダイアログの表示要素を切り替える
      setUpdateFlag(true);
      // 選択したTodoを設定する
      if (toDos === null) return;
      const tageetTodo = toDos.find((todo) => todo.id === id);
      // 選択したTodoを設定する
      setSelectedToDo(tageetTodo!);
      onOpen();
    },
    [toDos, onOpen, setUpdateFlag, setSelectedToDo]
  );

  // 内容の省略表示
  const controllStringlength = (str: string) => {
    if (str.length > 5) {
      return str.substring(0, 5) + '...';
    }
    return str;
  };

  return (
    <TableContainer height="calc(100vh - 229.2px)" overflowY="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            {headerItems.map((headerItem) => (
              <Th key={headerItem}>{headerItem}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {!toDos ? (
            <></>
          ) : (
            toDos.map((toDo) =>
              date > toDo.expectedEndOfDate! ? (
                <Tr
                  key={toDo.id}
                  onClick={() => onClickTableRow(toDo.id as number)}
                  bg="red.100"
                >
                  <Td key={toDo.id! + 5}>{toDo.id}</Td>
                  <Td key={toDo.id! + 6}>
                    {controllStringlength(toDo.contents)}
                  </Td>
                  <Td key={toDo.id! + 7}>{toDo.expectedEndOfDate}</Td>
                  <Td key={toDo.id! + 8}>{toDo.endOfDate}</Td>
                </Tr>
              ) : (
                <Tr
                  key={toDo.id}
                  onClick={() => onClickTableRow(toDo.id as number)}
                >
                  <Td key={toDo.id! + 5}>{toDo.id}</Td>
                  <Td key={toDo.id! + 6}>
                    {controllStringlength(toDo.contents)}
                  </Td>
                  <Td key={toDo.id! + 7}>{toDo.expectedEndOfDate}</Td>
                  <Td key={toDo.id! + 8}>{toDo.endOfDate}</Td>
                </Tr>
              )
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
});
