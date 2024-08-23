import { Alert, Button, Label, List, Modal, TextInput } from "flowbite-react";
import { InvitableUserListItem } from "./list/invitableUserListItem";
import { useContext, useEffect, useState } from "react";
import { FileUserPermission, InvitableUser, InvitedUser } from "@/openapi";
import { ProviderContext } from "@/app/provider";
import { InvitedUserListItem } from "./list/invitedUserListItem";
import { HiClipboard, HiOutlineClipboard } from "react-icons/hi2";

interface ShareFileModalProps {
  fileId: string;
  isModalVisible: boolean;
  closeModal: () => void;
}

export function ShareFileModal({ fileId, isModalVisible, closeModal }: ShareFileModalProps) {
  const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
  const api = useContext(ProviderContext);
  const [invitableUsers, setInvitableUsers] = useState<InvitableUser[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<FileUserPermission[]>([]);

  async function getInvitableUser() {
    const { data } =
      await api.share.shareControllerGetInvitableUsersForSharingFile(fileId);
    setInvitableUsers(data);
  }

  async function getInvitedUser() {
    const { data } = await api.share.shareControllerGetInvitedUsersForFile(fileId);
    setInvitedUsers(data);
  }

  async function onInvite() {
    await getInvitedUser();
    await getInvitableUser();
  }

  useEffect(() => {
    if (api.loading) return;
    getInvitedUser();
  }, [api.loading]);

  return (
    <Modal show={isModalVisible} onClose={closeModal}>
      <Modal.Body>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Link di Condivisione</Label>
            <div className="relative">
              <input
                type="text"
                className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-4 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={`${APP_BASE_URL}/shared/${fileId}`}
                disabled
                readOnly
              />
              <button className="absolute end-2.5 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
                <span className="inline-flex items-center">
                  <HiOutlineClipboard className="mr-2 h-4 w-4" />
                  <span className="text-xs font-semibold">Copia</span>
                </span>
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>In Condivisione con</Label>
            <List
              unstyled
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {invitedUsers.length === 0 && (
                <Alert color="info">
                  <span className="font-medium">Stato Condivisione</span>:
                  Nessun utente ha accesso a questa cartella
                </Alert>
              )}
              {invitedUsers.map((user) => (
                <InvitedUserListItem
                  key={"modal-invited-" + user.user.id}
                  userPermission={user}
                />
              ))}
            </List>
          </div>
          <div className="space-y-2">
            <Label>Invita</Label>
            <TextInput onChange={getInvitableUser} placeholder="Cerca Utenti" />
            <List
              unstyled
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {invitableUsers.map((user) => (
                <InvitableUserListItem
                  key={"modal-invitable-" + user.id}
                  user={user}
                  fileId={fileId}
                  onInvite={onInvite}
                />
              ))}
            </List>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Cancel</Button>
        <Button>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
