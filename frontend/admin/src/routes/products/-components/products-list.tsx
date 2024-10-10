import { useGetApiV1Products } from "../../../api/types";
import { Checkbox, Flex, Table } from "@mantine/core";
import TablePagination from "../../../components/table-pagination.tsx";
import { useEffect, useState } from "react";

interface ProductsListProps {
  readonly pageIndex: number;
  readonly setPageIndex: (index: number) => void;
  readonly pageSize: number;
  readonly setPageSize: (index: number) => void;
}

const ProductsList = ({
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
}: ProductsListProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { data } = useGetApiV1Products({
    pageIndex,
    pageSize,
  });

  useEffect(() => {
    setSelectedRows([]);
  }, [data?.products]);

  const rows =
    data?.products.map((p) => (
      <Table.Tr key={p.id}>
        <Table.Td>
          <Checkbox
            checked={selectedRows.includes(p.id)}
            onChange={(e) => {
              setSelectedRows(
                e.currentTarget.checked
                  ? [...selectedRows, p.id]
                  : selectedRows.filter((id) => id !== p.id),
              );
            }}
          />
        </Table.Td>
        <Table.Td>{p.name}</Table.Td>
        <Table.Td>{p.description}</Table.Td>
        <Table.Td>{p.price}</Table.Td>
      </Table.Tr>
    )) ?? [];

  return (
    <Flex direction="column" gap="md">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Price</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <TablePagination
        total={data?.total ?? 0}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        sePageSize={setPageSize}
      />
    </Flex>
  );
};

export default ProductsList;
