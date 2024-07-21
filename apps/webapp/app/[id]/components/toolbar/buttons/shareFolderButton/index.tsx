import { ProviderContext } from "@/app/provider";
import { InvitableUser } from "@/openapi";
import {
  Avatar,
  Button,
  FileInput,
  Label,
  List,
  Modal,
  TextInput,
} from "flowbite-react";
import React, { useContext } from "react";
import { HiOutlineShare } from "react-icons/hi2";
import { ShareFolderModal } from "./modal";

interface ShareFolderButtonProps {
  folderId: string;
}

const ShareFolderButton: React.FC<ShareFolderButtonProps> = ({ folderId }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <>
      <Button outline onClick={showModal}>
        <HiOutlineShare className="size-6" />
      </Button>
      <ShareFolderModal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        folderId={folderId}
      />
    </>
  );
};

export default ShareFolderButton;
