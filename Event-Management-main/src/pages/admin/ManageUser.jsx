import React, { useState, useEffect } from "react";

import { BsDot } from "react-icons/bs";
import { PiDotDuotone } from "react-icons/pi";
import { Search } from 'lucide-react';
import axios from "axios";


const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");


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
        console.log(res,"res");
        

        setUsers(res.data.data || []); // assuming backend sends { success, data: [...] }
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    // Temporary mock data so UI works
    const mockUsers = [
      {
        userId: "USER001",
        name: "Rahul Kumar",
        email: "rahul@gmail.com",
        phone: "9876543210",
        totalBookings: 5,
        status: "Active",
      },
      {
        userId: "USER002",
        name: "Sneha Menon",
        email: "sneha@gmail.com",
        phone: "9845112233",
        totalBookings: 2,
        status: "Blocked",
      },
      {
        userId: "USER003",
        name: "Kiran",
        email: "kiran@gmail.com",
        phone: "9998887776",
        totalBookings: 7,
        status: "Active",
      }
    ];

    setUsers(mockUsers);
  }, []);

 

  // Delete user

const deleteUser = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;
const id =userId
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

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-600">Manage Users</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-1 p-3 rounded-xl w-full mb-6 max-w-[350px] border border-gray-400">
        <Search className="w-[20px] text-gray-500"/>
        <input
        type="text"
        className="outline-none text-gray-600 "
        placeholder="Search by name, email or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-400">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-500 text-sm">
              <th className="p-3 font-semibold">User ID</th>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Phone</th>
              <th className="p-3 font-semibold">Bookings</th>
           
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.userId} className=" hover:bg-gray-50 text-sm text-gray-500">
                <td className="p-3">{u._id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.phone}</td>
                <td className="p-3">{u.totalBookings}</td>

       

                {/* ACTIONS */}
                <td className="p-3 flex gap-3">

          

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteUser(u._id)}
                    className=" rounded-md border border-gray-600 px-1 bg-gray-200 text-gray-700 text-xs p-1 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageUser;
