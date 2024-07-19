import CreateFolderButton from "./buttons/createFolderButton";
import UploadFileButton from "./buttons/uploadFileButton";
import ShareFolderButton from "./buttons/shareFolderButton";

interface ToolbarProps {
  folderId: string;
  onCreated: () => void;
}

export function Toolbar(props: ToolbarProps) {
  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 px-0">
        <div className="flex gap-2 ">
          <ShareFolderButton folderId={props.folderId} />
          <CreateFolderButton folderId={props.folderId} onCreated={props.onCreated}  />
          <UploadFileButton folderId={props.folderId} onUpload={props.onCreated} />
        </div>
      </div>
    </nav>
  );
}
