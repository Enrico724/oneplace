import { SelectedFileContext } from "@/app/components/provider";
import { ProviderContext } from "@/app/provider";
import Utils from "@/app/utils";
import { ModelFile } from "@/openapi";
import { Button, Checkbox, Dropdown, Table } from "flowbite-react";
import Link from "next/link";
import { useContext } from "react";
import { HiEllipsisHorizontal, HiPencil } from "react-icons/hi2";

interface FileTableRowProps {
  file: ModelFile;
  onDelete: () => void;
}

export function FileTableRow({ file, onDelete }: FileTableRowProps) {
  const api = useContext(ProviderContext);
  const { setSelectedFile, deselectFile } = useContext(SelectedFileContext);
  const onClick = () => setSelectedFile(file);

  return (
    <Table.Row
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
      onClick={onClick}
    >
      <Table.Cell className="p-4">
        <Checkbox />
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {file.name}
      </Table.Cell>
      <Table.Cell className="md:inherit hidden">31/01/2001</Table.Cell>
      <Table.Cell className="md:inherit hidden">
        {Utils.formatBytes(file.size)}
      </Table.Cell>
      <Table.Cell>Privato</Table.Cell>
      <Table.Cell className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
        <Dropdown
          placement="left"
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <span>
              <HiEllipsisHorizontal className="size-6" />
            </span>
          )}
        >
          <Dropdown.Item
            onClick={() => {
              api.file
                .fileControllerDeleteFile(file.id)
                .then(deselectFile)
                .then(onDelete);
            }}
          >
            Delete
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              api.file
                .fileControllerDeleteFile(file.id)
                .then(deselectFile)
                .then(onDelete);
            }}
          >
            Condividi
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href={`/documents/${file.id}`}>Open</Link>
          </Dropdown.Item>
        </Dropdown>
      </Table.Cell>
    </Table.Row>
  );
}
