import { MoreHorizontal, Search, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getAllProfileUsers } from '../../../services/auth-service';
import { formatIntl } from '../../../lib/utility';

type ProfileUser = {
  id: string;
  username: string;
  role: string;
  created_at: string;
  avatar_url: string;
};

const AdminUsers = () => {
  const [profileUser, setProfileUser] = useState<ProfileUser[]>([]);

  useEffect(() => {
    getAllProfileUsers()
      .then((users) => setProfileUser(users))
      .catch((error) => console.error(error));
  }, []);

  const getProfileRoleColor = (role: string): string => {
    switch (role) {
      case 'user':
        return 'bg-violet-100 text-violet-600';
      case 'admin':
        return 'bg-red-100 text-red-600';
      case 'editor':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-violet-100 text-violet-600';
    }
  };

  return (
    <div className="space-y-6 my-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profiles</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <button className="flex text-sm items-center cursor-pointer px-4 py-2 justify-center rounded-md text-accent bg-accent-foreground/90 hover:bg-accent-foreground duration-300 transition-colors ease-i-out">
          <UserPlus className="mr-2 h-4 w-4" />
          New Profile
        </button>
      </div>

      {/* Content */}
      <div className="border border-gray-300 rounded-lg p-6">
        <div className="my-4">
          <h3 className="text-2xl">Profile Management</h3>
          <p className="text-sm text-muted-foreground">
            View and Manage all user profiles. Edit roles and details.
          </p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative w-full">
              <Search className="size-4 absolute h-full inset-y-0 left-2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search profiles..."
                className="pr-4 pl-8 py-2 rounded-md border border-gray-400 outline-none w-full bg-transparent text-sm text-muted-foreground focus:outline-1 focus:offset-2 focus:border-gray-500"
              />
            </div>
            <div>
              <select className="border border-gray-400 text-sm w-full rounded-md px-4 py-2">
                <option value="filterByRole">Filter by Role</option>
              </select>
            </div>
          </div>

          {/*  User Table */}
          <div className="rounded-md border border-gray-300">
            <table className="w-full">
              <thead>
                <tr className="t-row text-sm text-muted-foreground font-light">
                  <th className="t-head">User</th>
                  <th className="t-head">Role</th>
                  <th className="t-head hidden md:table-cell">Created</th>
                  <th className="t-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profileUser.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="h-24 text-center">
                      No user data found!
                    </td>
                  </tr>
                ) : (
                  profileUser.map((user) => (
                    <tr className="t-row">
                      <td className="t-data">
                        <div className="flex items-center gap-2">
                          <div className="">
                            <img
                              src={user.avatar_url}
                              alt="user avatar"
                              className="w-12 h-12 rounded-full object-cover hidden md:block"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {user.username}
                            </div>
                            <div className="text-xs text-muted-foreground md:hidden">
                              {formatIntl(user.created_at)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="t-data">
                        <div
                          className={`${getProfileRoleColor(
                            user.role,
                          )} inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                        >
                          {user.role}
                        </div>
                      </td>
                      <td className="t-data hidden md:table-cell">
                        <div className="text-xs sm:text-sm">
                          {formatIntl(user.created_at)}
                        </div>
                      </td>
                      <td className="t-data">
                        <button
                          type="button"
                          className="cursor-pointer hover:bg-gray-200 rounded-md p-1.5"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
