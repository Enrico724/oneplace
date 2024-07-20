import { Button, Label, List, Modal, TextInput } from "flowbite-react";
import { InvitableUserListItem } from "./list/invitableUserListItem";
import { useContext, useEffect, useState } from "react";
import { InvitableUser, InvitedUser } from "@/openapi";
import { ProviderContext } from "@/app/provider";
import { InvitedUserListItem } from "./list/invitedUserListItem";

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
          <div>
            <Label>In Condivisione con</Label>
            <List
              unstyled
              className="max-w divide-y divide-gray-200 dark:divide-gray-700"
            >
              {invitedUsers.map((user) => (
                <InvitedUserListItem key={user.user.userId} user={user} />
              ))}
            </List>
          </div>
          <div className="space-y-2">
            <Label>Invita</Label>
            <TextInput onChange={getInvitableUser} placeholder="Cerca Utenti" />
            <List
              unstyled
              className="max-w divide-y divide-gray-200 dark:divide-gray-700"
            >
              {invitableUsers.map((user) => (
                <InvitableUserListItem key={user.userId} user={user} folderId={props.folderId} onInvite={onInvite} />
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
