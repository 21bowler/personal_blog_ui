import { Search, UserPlus, Trash2, Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  getAllProfileUsers,
  deleteUserFromProfile,
} from '../../../services/auth-service';
import { formatIntl } from '../../../lib/utility';
import type { ProfileUser } from 'lib/types';
import { toast } from 'sonner';
import DeletePopup from '../../../components/DeletePopup';

const AdminUsers = () => {
  const [profileUser, setProfileUser] = useState<ProfileUser[]>([]);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    getAllProfileUsers()
      .then((users) => setProfileUser(users))
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUserFromProfile(userId);

      toast.success(`User deleted successfully.`);

      // refresh the user list after deletion.
      const updatedUsers = await getAllProfileUsers();
      setProfileUser(updatedUsers);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Error deleting user. Please, try again!');
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedUserId) {
      await handleDeleteUser(selectedUserId);
      setShowDeletePopup(false);
      setSelectedUserId(null);
    }
  };

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
        <button className="flex text-sm items-center cursor-pointer px-4 py-2 justify-center rounded-md text-accent bg-accent-foreground/90 hover:bg-accent-foreground duration-300 transition-colors ease-in-out">
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

          {/* Delete Pop up */}
          {showDeletePopup && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <DeletePopup
                onConfirm={handleDeleteConfirm}
                onCancel={() => {
                  setShowDeletePopup(false);
                }}
              />
            </div>
          )}

          {/*  User Table */}
          <div className="rounded-md border border-gray-300 relative overflow-auto">
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
                    <tr key={user.id} className="t-row">
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
                        <div className="flex gap-3 items-center py-2">
                          <button
                            type="button"
                            onClick={() =>
                              console.log(`Edit ${user.id} clicked!!`)
                            }
                            className="cursor-pointer border border-muted-foreground/70 bg-destructive-foreground/70 p-1.5 rounded-md hover:border-muted-foreground ease-in-out duration-200 hover:bg-destructive-foreground"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUserId(user.id);
                              setShowDeletePopup(true);
                            }}
                            className="cursor-pointer border border-muted-foreground/70 bg-destructive-foreground/70 p-1.5 rounded-md hover:border-muted-foreground ease-in-out duration-200 hover:bg-destructive-foreground"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
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
