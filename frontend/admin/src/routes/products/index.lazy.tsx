import { createLazyFileRoute } from "@tanstack/react-router";
import { Paper, Tabs } from "@mantine/core";
import AddProduct from "./-components/add-product.tsx";

export const Route = createLazyFileRoute("/products/")({
  component: Products,
});

function Products() {
  return (
    <Paper>
      <Tabs defaultValue="add">
        <Tabs.List>
          <Tabs.Tab value="add">Add Product</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="add" p="lg">
          <AddProduct />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
