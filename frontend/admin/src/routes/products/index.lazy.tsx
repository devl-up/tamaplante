import { createLazyFileRoute } from "@tanstack/react-router";
import { Paper, Tabs } from "@mantine/core";
import AddProduct from "./-components/add-product.tsx";
import ProductsList from "./-components/products-list.tsx";
import { useState } from "react";

export const Route = createLazyFileRoute("/products/")({
  component: Products,
});

function Products() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Paper>
      <Tabs defaultValue="list">
        <Tabs.List>
          <Tabs.Tab value="list">Product List</Tabs.Tab>
          <Tabs.Tab value="add">Add Product</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="list" p="lg">
          <ProductsList
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        </Tabs.Panel>
        <Tabs.Panel value="add" p="lg">
          <AddProduct pageIndex={pageIndex} pageSize={pageSize} />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
