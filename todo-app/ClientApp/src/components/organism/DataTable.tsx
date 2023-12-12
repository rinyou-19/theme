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

import { useToDo } from '../../hooks/useToDo';

type Props = {
  headerItems: Array<string>;
  onOpen: () => void;
};

// ToDo一覧を表示するコンポーネント
export const DataTable: FC<Props> = memo((props: Props) => {
  // テーブルのヘッダー項目一覧
  const { headerItems, onOpen } = props;
  // ToDo一覧と更新フラグ
  const { toDos, setUpdateFlag } = useToDo();
  // 選択したToDo
  const { setSelectedToDo } = useToDo();
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  // 表示する最大文字数
  const maxTextLength = 5;

  console.log("toDos");
  console.log(toDos);

  // テーブルの行をクリックした際の処理
  const onClickTableRow = useCallback(
    (id: number) => {
      // ダイアログの表示要素を切り替える
      setUpdateFlag(true);
      // 選択したToDoを設定する
      if (toDos === null) return;
      const tageetToDo = toDos.find((toDo) => toDo.id === id);
      if (tageetToDo === undefined) return;
      setSelectedToDo(tageetToDo);
      // ダイアログを表示する
      onOpen();
    },
    [toDos, onOpen, setUpdateFlag, setSelectedToDo]
  );

  // ToDoの省略表示
  const truncateText = (text: string) => {
    if (text.length > maxTextLength) {
      return text.substring(0, maxTextLength) + '...';
    }
    return text;
  };

  return (
    <TableContainer height="calc(100vh - 229.2px)" overflowY="auto">
      <Table variant="simple">
        <Thead position="sticky" top="0" bg="white" zIndex="sticky">
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
            toDo.endOfDate === null && toDo.expectedEndOfDate != null && date > toDo.expectedEndOfDate ? (
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
