import { Folder } from "@/openapi";
import { Checkbox, Table } from "flowbite-react";

interface FolderTableRowProps {
    folder: Folder;
}

export function FolderTableRow({ folder }: FolderTableRowProps) { 
    const onClick = () => window.location.href = `/${folder.id}`;

    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={onClick}>
        <Table.Cell className="p-4">
            <Checkbox />
        </Table.Cell>
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {folder.name}
        </Table.Cell>
        <Table.Cell>31/01/2001</Table.Cell>
        <Table.Cell>124.5 MB</Table.Cell>
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