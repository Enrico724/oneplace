import { SelectedFileContext } from "@/app/components/provider";
import { ProviderContext } from "@/app/provider";
import Utils from "@/app/utils";
import { ModelFile } from "@/openapi";
import { Button, Checkbox, Table } from "flowbite-react";
import Link from "next/link";
import { useContext } from "react";

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
      <Table.Cell className="hidden md:inherit">31/01/2001</Table.Cell>
      <Table.Cell className="hidden md:inherit">{Utils.formatBytes(file.size)}</Table.Cell>
      <Table.Cell>Privato</Table.Cell>
      <Table.Cell>
        <Button
          size="xs"
          color="red"
          onClick={() => {
            api.file
              .fileControllerDeleteFile(file.id)
              .then(deselectFile)
              .then(onDelete);
          }}
        >
          Delete
        </Button>
        <Button
          size="xs"
          color="red"
          onClick={() => {
            api.file
              .fileControllerDeleteFile(file.id)
              .then(deselectFile)
              .then(onDelete);
          }}
        >
          Condividi
        </Button>
        <Link href={`/documents/${file.id}`}>
          <Button size="xs" color="blue">
            Open
          </Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}
