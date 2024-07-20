import { InvitableUser, InvitedUser } from "@/openapi";
import { Avatar, List } from "flowbite-react";

export function InvitedUserListItem({ user: invited }: { user: InvitedUser }) {
  const { user, permission } = invited;
  return (
    <List.Item className="group rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700 sm:p-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <Avatar img={user.picture} alt={`${user.name}`} rounded size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {user.name} {user.givenName}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {user.userId}
          </p>
        </div>
        <div>{permission}</div>
      </div>
    </List.Item>
  );
}
