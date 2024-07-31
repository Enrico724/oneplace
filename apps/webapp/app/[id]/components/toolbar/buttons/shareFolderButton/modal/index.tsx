import { Button, Label, List, Modal, TextInput } from "flowbite-react";
import { InvitableUserListItem } from "./list/invitableUserListItem";
import { useContext, useEffect, useState } from "react";
import { InvitableUser, InvitedUser } from "@/openapi";
import { ProviderContext } from "@/app/provider";
import { InvitedUserListItem } from "./list/invitedUserListItem";
import { HiClipboard, HiOutlineClipboard } from "react-icons/hi2";

interface ShareFolderModalProps {
  folderId: string;
  isModalVisible: boolean;
  closeModal: () => void;
}

export function ShareFolderModal(props: ShareFolderModalProps) {
  const api = useContext(ProviderContext);
  const [invitableUsers, setInvitableUsers] = useState<InvitableUser[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);

  async function getInvitableUser() {
    const { folderId } = props;
    const { data } =
      await api.share.shareControllerGetInvitableUsersForSharing(folderId);
    setInvitableUsers(data);
  }

  async function getInvitedUser() {
    const { folderId } = props;
    const { data } = await api.share.shareControllerGetInvitedUsers(folderId);
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
    <Modal show={props.isModalVisible} onClose={props.closeModal}>
      <Modal.Body>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Link di Condivisione</Label>
            <div className="relative">
              <input 
                type="text" 
                className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={`https://.../shared/${props.folderId}`}
                disabled 
                readOnly 
              />
              <button className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
                <span className="inline-flex items-center">
                  <HiOutlineClipboard className="w-4 h-4 mr-2" />
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
              {invitedUsers.map((user) => <InvitedUserListItem key={"modal-invited-"+user.user.id} user={user} />)}
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
                  key={"modal-invitable-"+user.userId}
                  user={user}
                  folderId={props.folderId}
                  onInvite={onInvite}
                />
              ))}
            </List>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.closeModal}>Cancel</Button>
        <Button>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
