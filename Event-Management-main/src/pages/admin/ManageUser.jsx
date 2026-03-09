import React, { useState, useEffect } from "react";
import { Search, Users, Activity, Loader2, Trash2, Mail, Phone, CalendarCheck } from 'lucide-react';
import axios from "axios";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔐 get JWT token

        const res = await axios.get(
          "/viewUser",
          {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 pass token to backend
            },
          }
        );
        console.log(res, "res");

        setUsers(res.data.data || []); // assuming backend sends { success, data: [...] }
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    const id = userId;
    try {
      const token = localStorage.getItem("token"); // 🔐 get JWT token

      await axios.delete(
        `/deleteUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 pass token to backend
          },
        }
      );

      // ✅ Update UI only after backend success
      const updated = users.filter((u) => u._id !== userId);
      setUsers(updated);

      alert("User deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };


  // Search
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6 border border-blue-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Users className="text-2xl text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              User Management
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              View and manage registered customers
            </p>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-6 -top-10 opacity-[0.03] transform rotate-12 pointer-events-none">
          <Users size={200} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total Registered Users</p>
              <p className="text-3xl font-bold text-gray-800">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Users className="text-xl text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-3 flex items-center gap-1 font-medium"><Activity size={12} /> Active across platform</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total Bookings Made</p>
              <p className="text-3xl font-bold text-gray-800">
                {users.reduce((sum, u) => sum + (u.totalBookings || 0), 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
              <CalendarCheck className="text-xl text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-orange-500 mt-3 flex items-center gap-1 font-medium"><Activity size={12} /> Combined total</p>
        </div>
      </div>

      {/* Search and Table Container */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search Section */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name, email or phone..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer Profile
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contact Docs
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u, i) => (
                <tr
                  key={u._id}
                  className="hover:bg-blue-50/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs font-mono font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      #{u._id ? u._id.slice(-6).toUpperCase() : `USR-${i + 1}`}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm border border-blue-200">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">Joined Platform</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span className="truncate max-w-[180px]">{u.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{u.phone || "Not provided"}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                      <CalendarCheck className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">{u.totalBookings || 0}</span>
                      <span className="text-xs text-gray-500">Bookings</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Remove</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-3">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-1">No users found</p>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              We couldn't find any users matching your search. Try adjusting your filters or search terms.
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-sm text-cyan-600 hover:text-cyan-700 font-medium hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
