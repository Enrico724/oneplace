"use client";

import { Sidebar } from "flowbite-react";
import { useContext } from "react";
import { SelectedFileContext } from "../provider";
import Utils from "@/app/utils";
import { HiDocumentText } from "react-icons/hi2";

export function ContentSidebar() {
  const { selectedFile } = useContext(SelectedFileContext);
  return (
    <div
      className="fixed right-0 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
      aria-label="Default sidebar example"
    >
      <div className="h-full justify-items-stretch overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        {selectedFile ? (
          <ul className="space-y-2 font-medium">
            <li className="flex">
              <HiDocumentText className="mr-2 h-6 w-6" />
              <span className="font-semibold">{selectedFile.name}</span>
              <HiDocumentText className="h-6 w-6" />
            </li>
            <li>{selectedFile.id}</li>
            <li>{selectedFile.mimeType}</li>
            <li>{Utils.formatBytes(selectedFile.size)}</li>
          </ul>
        ) : (
          <ul className="space-y-2 font-medium">
            <li>
              <h2 className="text-lg font-semibold">Seleziona un file</h2>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
