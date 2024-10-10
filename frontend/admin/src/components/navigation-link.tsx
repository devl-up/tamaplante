import { NavLink, NavLinkProps } from "@mantine/core";
import { createLink, CreateLinkProps, Link } from "@tanstack/react-router";
import { ForwardedRef, forwardRef } from "react";

const CustomLink = (
  props: CreateLinkProps & NavLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  return (
    <Link to={props.to}>
      {({ isActive }) => (
        <NavLink {...props} ref={ref} active={isActive}></NavLink>
      )}
    </Link>
  );
};

export const NavigationLink = createLink(forwardRef(CustomLink));
