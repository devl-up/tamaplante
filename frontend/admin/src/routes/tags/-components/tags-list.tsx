import { useDeleteApiV1Tags, useGetApiV1Tags } from "../../../api/types";
import { Button, Checkbox, Flex, Modal, Table } from "@mantine/core";
import TablePagination from "../../../components/table-pagination.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddTag from "./add-tag.tsx";
import { useDisclosure } from "@mantine/hooks";
import EditTag from "./edit-tag.tsx";

const TagsList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  const tagsQuery = useGetApiV1Tags({
    pageIndex,
    pageSize,
  });

  const deleteMutation = useDeleteApiV1Tags({
    mutation: {
      onSuccess: async (_, variables) => {
        const total = tagsQuery.data?.total ?? 0;
        const newTotal = total - variables.data.tagIds.length;

        if (pageIndex !== 0 && newTotal < pageIndex * pageSize + 1) {
          setPageIndex(pageIndex - 1);
        } else {
          await tagsQuery.refetch();
        }
      },
    },
  });

  const handleDelete = useCallback(async () => {
    await deleteMutation.mutateAsync({ data: { tagIds: selectedRows } });
  }, [deleteMutation, selectedRows]);

  useEffect(() => {
    setSelectedRows([]);
  }, [tagsQuery.data?.tags]);

  const selectedTag = useMemo(() => {
    if (selectedRows.length !== 1) return;

    return tagsQuery.data?.tags.find((tag) => tag.id === selectedRows[0]);
  }, [tagsQuery.data?.tags, selectedRows]);

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
      {addOpened && (
        <Modal opened={addOpened} onClose={closeAdd} title={"Add Tag"}>
          <AddTag
            onSave={async () => {
              await tagsQuery.refetch();
              closeAdd();
            }}
            onClose={closeAdd}
          />
        </Modal>
      )}
      <Modal opened={editOpened} onClose={closeEdit} title={"Edit Tag"}>
        <EditTag
          tag={selectedTag}
          onSave={async () => {
            await tagsQuery.refetch();
            closeEdit();
          }}
          onClose={closeEdit}
        />
      </Modal>
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
