import { ProviderContext } from "@/app/provider";
import { Folder } from "@/openapi";
import { AxiosRequestConfig } from "axios";
import { Button, Checkbox, Dropdown, Table } from "flowbite-react";
import { useContext } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";

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
      <Table.Cell className="hidden md:inherit">31/01/2001</Table.Cell>
      <Table.Cell className="hidden md:inherit">124.5 MB</Table.Cell>
      <Table.Cell>
        {isShared ? (
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {folder.share.permissions.map(({ user }) => (
              <img
                key={"sub-"+folder.id+"-user-"+user.id}
                className="size-10 rounded-full border-2 border-white dark:border-gray-800"
                src={user.picture}
                referrerPolicy="no-referrer"
                alt=""
              />
            ))}
          </div>
        ) : (
          "Privato"
        )}
      </Table.Cell>
      <Table.Cell onClick={(event) => event.stopPropagation()} className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <Dropdown placement="bottom-start" label="" dismissOnClick={false} renderTrigger={() => <span><HiEllipsisHorizontal className="size-6"/></span>}>
          <Dropdown.Item>
            <button
              onClick={async (event: any) => {
                event.stopPropagation();
                const options: AxiosRequestConfig = { responseType: "blob" };
                const { data, headers } = await api.folder.folderControllerDownloadFolder(folder.id, options);
                const imageUrlObject = URL.createObjectURL(data!);
                const link = document.createElement("a");
                link.href = imageUrlObject;
                link.download = `${folder.name}.zip`;
                link.click();
                URL.revokeObjectURL(imageUrlObject);
              }}
            >
              Download
            </button>
          </Dropdown.Item>
        </Dropdown>
      </Table.Cell>
    </Table.Row>
  );
}
