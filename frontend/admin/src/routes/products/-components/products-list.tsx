import {
  useDeleteApiV1Products,
  useGetApiV1Products,
} from "../../../api/types";
import { Button, Checkbox, Flex, Table } from "@mantine/core";
import TablePagination from "../../../components/table-pagination.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import AddProduct from "./add-product.tsx";
import EditProduct from "./edit-product.tsx";

const ProductsList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

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

  const selectedProduct = useMemo(() => {
    if (selectedRows.length !== 1) return;

    return productsQuery.data?.products.find(
      (product) => product.id === selectedRows[0],
    );
  }, [productsQuery.data?.products, selectedRows]);

  const rows =
    productsQuery.data?.products.map((p) => (
      <Table.Tr
        key={p.id}
        bg={
          selectedRows.includes(p.id)
            ? "var(--mantine-color-blue-light)"
            : undefined
        }
      >
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
    <>
      <AddProduct
        opened={addOpened}
        onSave={productsQuery.refetch}
        onClose={closeAdd}
      />
      {selectedProduct && (
        <EditProduct
          product={selectedProduct}
          opened={editOpened}
          onSave={productsQuery.refetch}
          onClose={closeEdit}
        />
      )}
      <Flex direction="column" gap="xs">
        <Flex gap="xs">
          <Button color="green" onClick={openAdd}>
            ADD
          </Button>
          <Button
            color="blue"
            onClick={openEdit}
            disabled={selectedRows.length !== 1}
          >
            EDIT
          </Button>
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
              <Table.Th />
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
    </>
  );
};

export default ProductsList;
