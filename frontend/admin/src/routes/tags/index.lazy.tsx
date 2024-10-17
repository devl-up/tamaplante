import { createLazyFileRoute } from "@tanstack/react-router";
import { Paper } from "@mantine/core";
import TagsList from "./-components/tags-list.tsx";

export const Route = createLazyFileRoute("/tags/")({
  component: Tags,
});

function Tags() {
  return (
    <Paper p="md">
      <TagsList />
    </Paper>
  );
}
