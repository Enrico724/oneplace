import { Folder } from "@/openapi";
import { Checkbox, Table } from "flowbite-react";
import { FolderTableRow } from "./tableRows/folderTableRow";
import { FileTableRow } from "./tableRows/fileTableRow";

interface ContentTableProps {
  folder: Folder;
  onAction: () => void;
}

export function ContentTable(props: ContentTableProps) {
  const { subfolders, files } = props.folder;
  return (
    <div className="overflow-x-auto py-3">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell className="hidden md:inherit">Ultima Modifica</Table.HeadCell>
          <Table.HeadCell className="hidden md:inherit">Dimensione File</Table.HeadCell>
          <Table.HeadCell>Condivisione</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Actions</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {subfolders.map((folder) => (
            <FolderTableRow key={"sub-"+folder.id} folder={folder} />
          ))}
          {files.map((file) => (
            <FileTableRow key={"file-"+file.id} file={file} onDelete={props.onAction} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
