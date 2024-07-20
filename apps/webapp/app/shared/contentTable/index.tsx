import { Folder, SharedFolder } from "@/openapi";
import { Checkbox, Table } from "flowbite-react";
import { FolderTableRow } from "./tableRows/folderTableRow";
import { FileTableRow } from "./tableRows/fileTableRow";

interface ContentTableProps {
  folders: SharedFolder[];
  onAction: () => void;
}

export function ContentTable({ folders, onAction }: ContentTableProps) {
  return (
    <div className="overflow-x-auto py-3">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell>Ultima Modifica</Table.HeadCell>
          <Table.HeadCell>Dimensione File</Table.HeadCell>
          <Table.HeadCell>Condivisione</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {folders.map((folder) => (
            <FolderTableRow key={folder.folder.id} sharedFolder={folder} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
