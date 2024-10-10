import {
  createRootRoute,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { AppShell, Burger, Flex, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFlower } from "@tabler/icons-react";

export const Route = createRootRoute({
  component: () => <Root />,
});

function Root() {
  const [opened, { toggle }] = useDisclosure();
  const { routesByPath } = useRouter();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Flex
          justify="flex-start"
          align="center"
          w="100%"
          h="100%"
          p="md"
          gap="sm"
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconFlower size={32} />
          <Title order={3}>Tamaplante</Title>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          label="Products"
          to={routesByPath["/products"].to}
        />
      </AppShell.Navbar>
      <AppShell.Main bg="#F5F7FA">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
