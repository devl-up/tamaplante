import { createLazyFileRoute } from "@tanstack/react-router";
import { Paper } from "@mantine/core";
import ProductsList from "./-components/products-list.tsx";

export const Route = createLazyFileRoute("/products/")({
  component: Products,
});

function Products() {
  return (
    <Paper p="md">
      <ProductsList />
    </Paper>
  );
}
