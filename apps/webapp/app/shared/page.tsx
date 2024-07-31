"use client";

import { useContext, useEffect, useState } from "react";
import { SharedFolder } from "@/openapi";
import AppNavbar from "../components/navbar";
import { SelectedFileProvider } from "../components/provider";
import AppSidebar from "../components/sidebar";
import { ContentSidebar } from "../components/contentSidebar";
import { ProviderContext } from "../provider";
import { ContentTable } from "./contentTable";

interface ContentPageProps {
  params: {
    id: string;
  };
}

export default function ContentPage({ params: { id } }: ContentPageProps) {
  const api = useContext(ProviderContext);
  const [folders, setFolders] = useState<SharedFolder[]>([]);

  function fetchFolders() {
    api.shared
      .sharedControllerGetSharedFolder()
      .then((response) => setFolders(response.data))
      .catch(console.error);
  }

  useEffect(() => {
    fetchFolders();
  }, [id]);

  return (
    <main className="h-screen">
      <AppNavbar />
      {folders && (
        <SelectedFileProvider>
          <div className="flex">
            <div className="hidden w-64 flex-none md:block">
              <AppSidebar />
            </div>
            <div className="w-64 grow gap-2 p-3">
              <ContentTable folders={folders} onAction={fetchFolders} />
            </div>
            <div className="hidden w-64 flex-none xl:block">
              <ContentSidebar />
            </div>
          </div>
        </SelectedFileProvider>
      )}
    </main>
  );
}
