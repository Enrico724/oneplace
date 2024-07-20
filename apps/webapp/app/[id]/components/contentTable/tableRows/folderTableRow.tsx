import { ProviderContext } from "@/app/provider";
import { Folder } from "@/openapi";
import { Button, Checkbox, Table } from "flowbite-react";
import { useContext } from "react";

interface FolderTableRowProps {
  folder: Folder;
}

export function FolderTableRow({ folder }: FolderTableRowProps) {
  const api = useContext(ProviderContext);
  const onClick = () => (window.location.href = `/${folder.id}`);
  const isShared = !(folder.share == null);

  return (
    <Table.Row
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
      onClick={onClick}
    >
      <Table.Cell className="p-4">
        <Checkbox />
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {folder.name}
      </Table.Cell>
      <Table.Cell>31/01/2001</Table.Cell>
      <Table.Cell>124.5 MB</Table.Cell>
      <Table.Cell>{isShared ? "si" : "Privato"}</Table.Cell>
      <Table.Cell>
        <Button
          size="xs"
          color="blue"
          onClick={async (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
          ) => {
            event.stopPropagation();
            const { data, headers } =
              await api.folder.folderControllerDownloadFolder(folder.id, {
                responseType: "blob",
              });
            const imageUrlObject = URL.createObjectURL(data!);
            const link = document.createElement("a");
            link.href = imageUrlObject;
            console.log(headers);
            link.download = `${folder.name}.zip`;
            link.click();
            URL.revokeObjectURL(imageUrlObject);
          }}
        >
          Download
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
