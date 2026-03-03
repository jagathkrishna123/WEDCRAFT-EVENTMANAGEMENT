// import React, { useEffect, useState } from 'react'
// import { adminDashboard_data } from '../../constants/data'

// const AdminDashboard = () => {

//   const [dashboardData, setDashboardData] = useState({
//     Totalusers: 0,
//     Totalproviders: 0,
//     Totalbookings: 0,
//     registrations: 0,
//     feedbackReceived: 0
//   })

//   const fetchDashboard = async () => {
//     setDashboardData(adminDashboard_data)
//   }

//   useEffect(() => {
//     fetchDashboard()
//   }, [])

//   return (
//     <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

//       <div className='flex flex-wrap gap-4'>

//         {/* Total Users */}
//         <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashboardData.Totalusers}</p>
//             <p className='text-gray-400 font-light'>Total Users</p>
//           </div>
//         </div>

//         {/* Total Providers */}
//         <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashboardData.Totalproviders}</p>
//             <p className='text-gray-400 font-light'>Total Providers</p>
//           </div>
//         </div>

//         {/* Total Bookings */}
//         <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashboardData.Totalbookings}</p>
//             <p className='text-gray-400 font-light'>Total Bookings</p>
//           </div>
//         </div>

//         {/* Registrations */}
//         <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashboardData.registrations}</p>
//             <p className='text-gray-400 font-light'>Registrations</p>
//           </div>
//         </div>

//         {/* Feedback Received */}
//         <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashboardData.feedbackReceived}</p>
//             <p className='text-gray-400 font-light'>Feedback Received</p>
//           </div>
//         </div>

//       </div>

//       {/* ------- Latest Blogs Table ------- */}
//       <div>
//         <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
//           <p>Latest Bookings</p>
//         </div>

//         <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white'>
//           <table className='w-full text-sm text-gray-500'>
//             <thead className='text-xs text-gray-600 text-left uppercase'>
//               <tr>
//                 <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
//                 <th scope='col' className='px-2 py-4'>Bookings</th>
//                 <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
//                 <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
//                 <th scope='col' className='px-2 py-4'>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Dynamic blog table goes here */}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default AdminDashboard

import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { ChevronsRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  const [latestBookings, setLatestBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token"); // or wherever you store it

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Dashboard data
        const res = await axios.get(
          "/dashboardData",
          config
        );
        console.log(res,"res111");
        

        setDashboardData(res.data);

        // Latest bookings
        const lbRes = await axios.get(
          "/getAllBookings",
          config
        );

        console.log(lbRes, "res1");


        setLatestBookings(lbRes.data?.data);

      } catch (err) {
        console.error("Dashboard fetch error:", err.response?.data || err.message);

        // Fallback mock data
    

 
        setLatestBookings([]); // safer fallback
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-2xl font-bold text-gray-700">{dashboardData.users?.length ?? 0}</p>
          <p className="text-gray-500">Total Users</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-2xl font-bold text-gray-700">{dashboardData.providers?.length ?? 0}</p>
          <p className="text-gray-500">Total Providers</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-2xl font-bold text-gray-700">{dashboardData.bookings?.length ?? 0}</p>
          <p className="text-gray-500">Total Bookings</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-2xl font-bold text-green-600">₹{dashboardData.bookings?.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0) ?? 0}</p>
          <p className="text-gray-500">Total Revenue</p>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-2xl font-bold text-yellow-600">{dashboardData.providers?.filter(p => p.status === "Pending").length ?? 0}</p>
          <p className="text-gray-500">Pending Provider Approvals</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-2xl font-bold text-orange-600">{dashboardData.bookings?.filter(b => b.status === "Pending").length ?? 0}</p>
          <p className="text-gray-500">Pending Bookings</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
          <p className="text-2xl font-bold text-blue-600">{dashboardData.totalFeedback}</p>
          <p className="text-gray-500">Feedback Received</p>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Latest Bookings</h3>

        <div className="overflow-x-auto shadow rounded-xl bg-white">
          <table className="w-full text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Booking ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Provider</th>
                <th className="p-3">Service</th>
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestBookings.map((b, i) => (
                <tr key={i} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{b.customerName}</td>
                  <td className="p-3">{b.providerName}</td>
                  <td className="p-3">{b.categoryModel}</td>
                  <td className="p-3">{new Date(b.eventDate).toISOString().split("T")[0]}</td>
                  <td className="p-3">₹{b.totalPrice
                    ?? "-"}</td>
                  <td className="p-3">
                    <span
                      className={` ${b.status === "Completed" ? "bg-green-200 text-green-600 p-1 px-1 rounded-md" :
                        b.status === "Pending" ? "bg-yellow-200 text-yellow-600 p-1 px-1 rounded-md" :
                          "bg-blue-600"
                        }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {latestBookings.length === 0 && (
                <tr><td colSpan={7} className="p-4 text-center text-gray-500">No recent bookings</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NavLink to="/admin/add-provider" className="bg-cyan-700 hover:bg-cyan-800 transition-all duration-500 shadow-md p-4 rounded-xl hover:shadow-md text-gray-100 max-w-[300px] flex justify-between">Manage Providers <ChevronsRight /></NavLink>
        <NavLink to="/admin/manage-user" className="bg-cyan-700 hover:bg-cyan-800 transition-all duration-500 shadow-md p-4 rounded-xl hover:shadow-md text-gray-100 max-w-[300px] flex justify-between">Manage Users <ChevronsRight /></NavLink>
        <NavLink to="/admin/settlement-history" className="bg-cyan-700 hover:bg-cyan-800 transition-all duration-500 shadow-md p-4 rounded-xl hover:shadow-md text-gray-100 max-w-[300px] flex justify-between">All Bookings <ChevronsRight /></NavLink>
      </div>
    </div>
  );
};

export default AdminDashboard;
