import { FileUserPermission, InvitableUser, InvitedUser } from "@/openapi";
import { Avatar, List } from "flowbite-react";

export function InvitedUserListItem({ userPermission }: { userPermission: FileUserPermission }) {
  const { user, permission } = userPermission;
  return (
    <List.Item className="group rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700 sm:p-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <img
          className="h-10 w-10 rounded-full"
          src={user.picture}
          alt={user.name}
          referrerPolicy="no-referrer"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {user.name} {user.name}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {user.id}
          </p>
        </div>
        <div>{permission}</div>
      </div>
    </List.Item>
  );
}
