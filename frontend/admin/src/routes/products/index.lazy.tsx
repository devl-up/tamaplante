import { createLazyFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Anchor, Breadcrumbs, Flex, Paper } from "@mantine/core";
import ProductsList from "./-components/products-list.tsx";

export const Route = createLazyFileRoute("/products/")({
  component: Products,
});

function Products() {
  const { routesByPath } = useRouter();

  return (
    <Flex direction="column" gap="sm">
      <Paper p="md">
        <Breadcrumbs>
          <Anchor component={Link} to={routesByPath["/products"].to}>
            Products
          </Anchor>
        </Breadcrumbs>
      </Paper>

      <Paper p="md">
        <ProductsList />
      </Paper>
    </Flex>
  );
}
