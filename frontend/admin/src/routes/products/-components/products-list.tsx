import {
  useDeleteApiV1Products,
  useGetApiV1Products,
} from "../../../api/types";
import { Button, Checkbox, Flex, Table } from "@mantine/core";
import TablePagination from "../../../components/table-pagination.tsx";
import { useCallback, useEffect, useState } from "react";

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

  const productsQuery = useGetApiV1Products({
    pageIndex,
    pageSize,
  });

  const deleteMutation = useDeleteApiV1Products({
    mutation: {
      onSuccess: async (_, variables) => {
        const total = productsQuery.data?.total ?? 0;
        const newTotal = total - variables.data.productIds.length;

        if (pageIndex !== 0 && newTotal < pageIndex * pageSize + 1) {
          setPageIndex(pageIndex - 1);
        } else {
          await productsQuery.refetch();
        }
      },
    },
  });

  const handleDelete = useCallback(async () => {
    await deleteMutation.mutateAsync({ data: { productIds: selectedRows } });
  }, [deleteMutation, selectedRows]);

  useEffect(() => {
    setSelectedRows([]);
  }, [productsQuery.data?.products]);

  const rows =
    productsQuery.data?.products.map((p) => (
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
    <Flex direction="column" gap="xs">
      <Flex>
        <Button
          color="red"
          disabled={!selectedRows.length}
          loading={deleteMutation.isPending}
          onClick={handleDelete}
        >
          DELETE
        </Button>
      </Flex>
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
        total={productsQuery.data?.total ?? 0}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        sePageSize={setPageSize}
      />
    </Flex>
  );
};

export default ProductsList;
