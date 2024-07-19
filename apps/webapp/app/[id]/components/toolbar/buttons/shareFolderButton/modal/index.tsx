import { Button, Label, List, Modal, TextInput } from "flowbite-react";
import { InvitableUserListItem } from "./list/invitableUserListItem";
import { useContext, useState } from "react";
import { InvitableUser } from "@/openapi";
import { ProviderContext } from "@/app/provider";

interface ShareFolderModalProps {
  folderId: string;
  isModalVisible: boolean;
  closeModal: () => void;
}

export function ShareFolderModal(props: ShareFolderModalProps) {
  const api = useContext(ProviderContext);
  const [invitableUsers, setInvitableUsers] = useState<InvitableUser[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<InvitableUser[]>([]);

  async function getInvitableUser() {
    const { data } = await api.share.shareControllerGetUsersForSharing(
      props.folderId,
    );
    setInvitableUsers(data);
  }

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
                <InvitableUserListItem user={user} />
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
                <InvitableUserListItem user={user} />
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
