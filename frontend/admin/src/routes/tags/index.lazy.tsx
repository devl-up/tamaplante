import { createLazyFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Anchor, Breadcrumbs, Flex, Paper } from "@mantine/core";
import TagsList from "./-components/tags-list.tsx";

export const Route = createLazyFileRoute("/tags/")({
  component: Tags,
});

function Tags() {
  const { routesByPath } = useRouter();

  return (
    <Flex direction="column" gap="sm">
      <Paper p="md">
        <Breadcrumbs>
          <Anchor component={Link} to={routesByPath["/tags"].to}>
            Tags
          </Anchor>
        </Breadcrumbs>
      </Paper>

      <Paper p="md">
        <TagsList />
      </Paper>
    </Flex>
  );
}
