import { MoreHorizontal, Search, UserPlus } from 'lucide-react';
import React from 'react';

const AdminUsers = () => {
  return (
    <div className="space-y-6 my-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profiles</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <button className="flex text-sm items-center px-4 py-2 justify-center rounded-md text-accent bg-accent-foreground">
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
                <tr className="t-row">
                  <td className="t-data">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-violet-600" />
                      <div>
                        <div className="font-medium text-sm">BobMills</div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          07/04/2025
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="t-data">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      user
                    </div>
                  </td>
                  <td className="t-data hidden md:table-cell">
                    <div className="text-xs sm:text-sm">April 5, 2025</div>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
