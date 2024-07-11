"use client";

import useInternalRouter from "@hooks/useInternalRouter";
import { ComponentPropsWithoutRef } from "react";
import Button from "./button";

interface Props extends ComponentPropsWithoutRef<typeof Button> {
  path: `/${string}`;
}

export default function RouteButton({ children, path, ...rest }: Props) {
  const { push } = useInternalRouter();

  return (
    <Button onClick={() => push(path)} {...rest}>
      {children}
    </Button>
  );
}
