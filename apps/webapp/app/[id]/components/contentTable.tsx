"use client";

import { Checkbox, Table } from "flowbite-react";
import { useContext } from "react";
export function ContentTable() {
  const api = useContext(ApiContext);
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
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {"Web Programming"}
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
        </Table.Body>
      </Table>
    </div>
  );
}
