import { useGetApiV1Tags } from "../../../api/types";
import { Button, Checkbox, Flex, Table } from "@mantine/core";
import TablePagination from "../../../components/table-pagination.tsx";
import { useEffect, useState } from "react";
import AddTag from "./add-tag.tsx";
import { useDisclosure } from "@mantine/hooks";

const TagsList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);

  const tagsQuery = useGetApiV1Tags({
    pageIndex,
    pageSize,
  });
  useEffect(() => {
    setSelectedRows([]);
  }, [tagsQuery.data?.tags]);

  const rows =
    tagsQuery.data?.tags.map((t) => (
      <Table.Tr
        key={t.id}
        bg={
          selectedRows.includes(t.id)
            ? "var(--mantine-color-blue-light)"
            : undefined
        }
      >
        <Table.Td>
          <Checkbox
            checked={selectedRows.includes(t.id)}
            onChange={(e) => {
              setSelectedRows(
                e.currentTarget.checked
                  ? [...selectedRows, t.id]
                  : selectedRows.filter((id) => id !== t.id),
              );
            }}
          />
        </Table.Td>
        <Table.Td>{t.name}</Table.Td>
      </Table.Tr>
    )) ?? [];

  return (
    <>
      <AddTag
        opened={addOpened}
        onSave={tagsQuery.refetch}
        onClose={closeAdd}
      />
      <Flex direction="column" gap="xs">
        <Flex gap="xs">
          <Button color="green" onClick={openAdd}>
            ADD
          </Button>
        </Flex>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              <Table.Th>Name</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <TablePagination
          total={tagsQuery.data?.total ?? 0}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          sePageSize={setPageSize}
        />
      </Flex>
    </>
  );
};

export default TagsList;
