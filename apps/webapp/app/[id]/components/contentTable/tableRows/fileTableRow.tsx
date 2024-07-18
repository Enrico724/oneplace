import Utils from "@/app/utils";
import { ModelFile } from "@/openapi";
import { Checkbox, Table } from "flowbite-react";

interface FileTableRowProps {
    file: ModelFile;
}
  
export function FileTableRow({ file }: FileTableRowProps) { 
    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="p-4">
          <Checkbox />
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {file.name}
        </Table.Cell>
        <Table.Cell>31/01/2001</Table.Cell>
        <Table.Cell>
            {Utils.formatBytes(file.size)}
        </Table.Cell>
        <Table.Cell>Privato</Table.Cell>
        <Table.Cell>
          <a
            href="#"
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          >
            Edit
          </a>
        </Table.Cell>
      </Table.Row>
    );
}
  