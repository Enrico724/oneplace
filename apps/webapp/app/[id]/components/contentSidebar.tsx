'use client';

import { Sidebar } from "flowbite-react";

export function ContentSidebar() {
  return (
    <Sidebar className="fixed right-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item>
            Informazione 1
          </Sidebar.Item>
          <Sidebar.Item>
            Informazione 2
          </Sidebar.Item>
          <Sidebar.Item>
            Informazione 3
          </Sidebar.Item>
          <Sidebar.Item>
            Informazione 4
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}