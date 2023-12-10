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

  // テーブルの行をクリックした際の処理
  const onClickTableRow = useCallback(
    (id: number) => {
      // ダイアログの表示要素を切り替える
      setUpdateFlag(true);
      // 選択したTodoを設定する
      if (toDos === null) return;
      const tageetTodo = toDos.find((todo) => todo.id === id);
      if (tageetTodo === undefined) return;
      setSelectedToDo(tageetTodo);
      // ダイアログを表示する
      onOpen();
    },
    [toDos, onOpen, setUpdateFlag, setSelectedToDo]
  );

  // ToDoの省略表示
  const truncateText = (text: string) => {
    if (text.length > 5) {
      return text.substring(0, 5) + '...';
    }
    return text;
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
            toDo.expectedEndOfDate === '' && date > toDo.expectedEndOfDate ? (
                <Tr
                  key={toDo.id}
                  onClick={() => onClickTableRow(toDo.id as number)}
                  bg="red.100"
                >
                  <Td>{toDo.id}</Td>
                  <Td>{truncateText(toDo.contents)}</Td>
                  <Td>{toDo.expectedEndOfDate}</Td>
                  <Td>{toDo.endOfDate}</Td>
                </Tr>
              ) : (
                <Tr
                  key={toDo.id}
                  onClick={() => onClickTableRow(toDo.id as number)}
                >
                  <Td>{toDo.id}</Td>
                  <Td>{truncateText(toDo.contents)}</Td>
                  <Td>{toDo.expectedEndOfDate}</Td>
                  <Td>{toDo.endOfDate}</Td>
                </Tr>
              )
            )
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
});
