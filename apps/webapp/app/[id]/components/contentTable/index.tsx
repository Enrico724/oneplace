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

  const isEmpty = subfolders.length === 0 && files.length === 0;

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
          <Table.HeadCell className="px-4 py-3 flex items-center justify-end">
            <span className="sr-only">Actions</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          { isEmpty && (
            <Table.Row>
              <Table.Cell colSpan={6} className="text-center py-4">
                Questa Cartella è vuota.<br />Aggiungi dei file o delle cartelle
              </Table.Cell>
            </Table.Row>
          )}
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
