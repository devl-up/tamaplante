import { useGetApiV1Tags } from "../../../api/types";
import { Checkbox, Flex, Table } from "@mantine/core";
import TablePagination from "../../../components/table-pagination.tsx";
import { useEffect, useState } from "react";

const TagsList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const tagsQuery = useGetApiV1Tags({
    pageIndex,
    pageSize,
  });
  useEffect(() => {
    setSelectedRows([]);
  }, [tagsQuery.data?.tags]);

  const rows =
    tagsQuery.data?.tags.map((t) => (
      <Table.Tr key={t.id}>
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
    <Flex direction="column" gap="xs">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
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
  );
};

export default TagsList;
