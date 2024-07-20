import CreateFolderButton from "./buttons/createFolderButton";
import UploadFileButton from "./buttons/uploadFileButton";
import ShareFolderButton from "./buttons/shareFolderButton";
import { Banner } from "flowbite-react";

interface ToolbarProps {
  folderId: string;
  onCreated: () => void;
}

export function Toolbar(props: ToolbarProps) {
  return (
    <Banner>
      <div className="my-2 flex rounded-lg border p-2">
        <div className="flex gap-2">
          <ShareFolderButton folderId={props.folderId} />
          <CreateFolderButton
            folderId={props.folderId}
            onCreated={props.onCreated}
          />
          <UploadFileButton
            folderId={props.folderId}
            onUpload={props.onCreated}
          />
        </div>
      </div>
    </Banner>
  );
}
