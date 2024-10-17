import { Flex, NativeSelect, Pagination, Text } from "@mantine/core";
import { useMemo } from "react";

interface TablePaginationProps {
  readonly total: number;
  readonly pageIndex: number;
  readonly setPageIndex: (index: number) => void;
  readonly pageSize: number;
  readonly sePageSize: (index: number) => void;
}

const TablePagination = ({
  total,
  pageIndex,
  setPageIndex,
  pageSize,
  sePageSize,
}: TablePaginationProps) => {
  const current = useMemo(
    () => (total === 0 ? 0 : pageIndex * pageSize + 1),
    [pageIndex, pageSize, total],
  );

  const next = useMemo(() => {
    const next = (pageIndex + 1) * pageSize;
    if (next > total) return total;
    return next;
  }, [pageIndex, pageSize, total]);

  return (
    <Flex justify="space-between" align="center">
      <Pagination
        total={Math.ceil(total / pageSize)}
        value={pageIndex + 1}
        onChange={(value) => {
          setPageIndex(value - 1);
        }}
      />
      <Flex align="center" gap="sm">
        <Text>
          {current} - {next} of {total}
        </Text>
        <NativeSelect
          data={["10", "25", "50"]}
          value={pageSize}
          onChange={(e) => {
            sePageSize(+e.target.value);
          }}
        />
      </Flex>
    </Flex>
  );
};

export default TablePagination;
