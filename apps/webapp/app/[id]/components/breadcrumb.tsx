"use client";

import { Folder } from "@/openapi";
import { Breadcrumb } from "flowbite-react";

interface AppBreadcrumbProps {
  folder: Folder;
}

export function AppBreadcrumb({ folder }: AppBreadcrumbProps) {
  return (
    <Breadcrumb
      aria-label="Solid background breadcrumb example"
      className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
    >
      <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
      <Breadcrumb.Item>{folder.name}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
