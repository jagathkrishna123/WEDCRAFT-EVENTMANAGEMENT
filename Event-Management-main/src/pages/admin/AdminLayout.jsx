// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { IoIosArrowBack } from "react-icons/io";

// const AdminLayout = () => {
//   const navigate = useNavigate();

//   const logout = () => {
//     navigate("/");
//   };
//   return (
//     <>
//       <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200">
//         <button
//           onClick={() => window.history.back()}
//           className="text-sm px-4 py-2 bg-gray-600 border rounded-full hover:bg-gray-700 flex items-center gap-2 text-gray-100"
//         >
//           {" "}
//           <IoIosArrowBack />
//           Back
//         </button>
//         <button
//           onClick={logout}
//           className="text-sm px-8 py-2 bg-cyan-700 text-white rounded-full cursor-pointer"
//         >
//           Logout
//         </button>
//       </div>
//       <div className="flex h-[calc(100vh-70px)]">
//         <Sidebar />
//         <Outlet />
//       </div>
//     </>
//   );
// };

// export default AdminLayout;


import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 sm:px-8">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <IoIosArrowBack className="text-lg group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="hidden sm:inline">Back</span>
            </button>
            
            <div className="hidden md:block h-6 w-px bg-gray-300"></div>
            
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
              <p className="text-xs text-gray-500">Manage your platform</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <IoNotificationsOutline className="text-xl" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <FiSettings className="text-xl" />
            </button>

            <div className="hidden sm:block h-6 w-px bg-gray-300 mx-1"></div>

            {/* User Profile */}
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                A
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="group flex items-center mr-20 md:mr-0 gap-2 px-4 sm:px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <HiOutlineLogout className="text-lg  group-hover:translate-x-0.5 transition-transform duration-200" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {/* <div className="flex h-[calc(100vh-64px)]"> */}
      <div className="flex h-[calc(100vh-20px)]">
        {/* Sidebar */}
        <aside className="flex-shrink-0">
          <Sidebar />
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 no-scrollbar">
          <div className="p-6 sm:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;