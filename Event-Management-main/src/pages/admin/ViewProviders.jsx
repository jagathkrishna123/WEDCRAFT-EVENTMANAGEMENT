// import React, { useEffect, useState } from "react";
// import { IoSearch, IoSearchOutline } from "react-icons/io5";
// import axios from "axios";

// const ViewProviders = () => {
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchProviders = async () => {
//       try {
//         const token = localStorage.getItem("token"); // 🔐 admin token

//         const response = await axios.get(
//           "/viewProvidres",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // 👈 send token
//             },
//           }
//         );
//         console.log(response, "res");

//         // If your backend sends { success, data: [...] }
//         setProviders(response.data.data || response.data);
//       } catch (err) {
//         console.error(
//           "Error fetching providers",
//           err.response?.data || err.message
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProviders();
//   }, []);

//   // Change provider status
//   const updateStatus = async (providerId, status) => {
//     if (!window.confirm(`Are you sure you want to ${status} this provider?`))
//       return;

//     console.log(providerId,status,"dsasa");
    
//     try {
//       const token = localStorage.getItem("token");
//       const id = providerId;
 

//       const response = await axios.put(
//         `/updateProviderStatus/${id}`,
//         { status },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // 👈 send token
//           },
//         }
//       );

//       alert("Status updated!");
//       setProviders(
//         providers.map((p) =>
//           p._id === id ? { ...p, status } : p
//         )
//       );
//     } catch (err) {
//       alert("Error updating status");
//     }
//   };

//   const deleteProvider = async (providerId) => {
//     if (!window.confirm("Delete this provider?")) return;
//     const id = providerId
//     console.log(id,"id");
    

//     try {
//    const token = localStorage.getItem("token"); // 🔐 get your JWT token

//     const response = await axios.delete(
//       `/deleteProvider/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // 👈 send token
//         },
//       }
//     );


//       alert("Provider deleted!");
//       setProviders(providers.filter((p) => p._id !== providerId));
//     } catch (err) {
//       alert("Error deleting provider");
//     }
//   };

//   // Search filter
//   const filteredProviders = providers.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.services.join(" ").toLowerCase().includes(search.toLowerCase())
//   );



//   if (loading) return <p className="p-6">Loading providers...</p>;

//   return (
//     <div className="p-6 w-full">
//       <h2 className="text-3xl font-bold mb-6 text-gray-600">
//         Manage Providers
//       </h2>

//       {/* Search */}

//       <div className="flex items-center border border-gray-400 p-3 rounded-xl w-full mb-6 max-w-[300px] text-gray-600 gap-2">
//         <IoSearch />
//         <input
//           type="text"
//           placeholder="Search by name or service..."
//           className="text-gray-600 outline-none"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-xl border border-gray-500">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-gray-500">
//               <th className="p-3 font-semibold">Provider ID</th>
//               <th className="p-3 font-semibold">Name</th>
//               <th className="p-3 font-semibold">Email</th>
//               <th className="p-3 font-semibold">Phone</th>
//               <th className="p-3 font-semibold">Services</th>
//               <th className="p-3 font-semibold">Status</th>
//               <th className="p-3 font-semibold">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredProviders.map((p,i) => (
//               <tr
//                 key={p._id}
//                 className="border-b border-gray-200 hover:bg-gray-50 text-sm"
//               >
//                 <td className="p-3 text-gray-500">{i+1}</td>
//                 <td className="p-3 text-gray-500">{p.name}</td>
//                 <td className="p-3 text-gray-500">{p.email}</td>
//                 <td className="p-3 text-gray-500">{p.phone}</td>

//                 <td className="p-3">
//                   {p.services.map((s) => (
//                     <span
//                       key={s._id}
//                       className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs mr-1"
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </td>

//                 <td className="p-3">
//                   <span
//                     className={` text-sm ${
//                       p.status === "Pending"
//                         ? "text-yellow-500"
//                         : p.status === "Approved"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {p.status}
//                   </span>
//                 </td>

//                 <td className="p-3 flex gap-2 text-sm">
//                   {/* Approve */}
//                   {p.status !== "Approved" && (
//                     <button
//                       onClick={() => updateStatus(p._id, "Approved")}
//                       className="text-green-600 hover:text-green-700 border border-gray-500 rounded-md px-1 text-xs"
//                     >
//                       Approve
//                     </button>
//                   )}

//                   {/* Reject */}
//                   {p.status !== "Rejected" && (
//                     <button
//                       onClick={() => updateStatus(p._id, "Rejected")}
//                       className="text-red-600 hover:text-red-700 border border-gray-500 rounded-md px-1 text-xs"
//                     >
//                       Reject
//                     </button>
//                   )}

//                   {/* Delete */}
//                   <button
//                     onClick={() => deleteProvider(p._id)}
//                     className="text-gray-600 hover:text-gray-700 border border-gray-500 rounded-md px-1 text-xs"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewProviders;



import React, { useEffect, useState } from "react";
import { IoSearch, IoSearchOutline } from "react-icons/io5";
import { FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import axios from "axios";

const ViewProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔐 admin token

        const response = await axios.get(
          "/viewProvidres",
          {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 send token
            },
          }
        );
        console.log(response, "res");

        // If your backend sends { success, data: [...] }
        setProviders(response.data.data || response.data);
      } catch (err) {
        console.error(
          "Error fetching providers",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Change provider status
  const updateStatus = async (providerId, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this provider?`))
      return;

    console.log(providerId, status, "dsasa");

    try {
      const token = localStorage.getItem("token");
      const id = providerId;

      const response = await axios.put(
        `/updateProviderStatus/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 👈 send token
          },
        }
      );

      alert("Status updated!");
      setProviders(
        providers.map((p) => (p._id === id ? { ...p, status } : p))
      );
    } catch (err) {
      alert("Error updating status");
    }
  };

  const deleteProvider = async (providerId) => {
    if (!window.confirm("Delete this provider?")) return;
    const id = providerId;
    console.log(id, "id");

    try {
      const token = localStorage.getItem("token"); // 🔐 get your JWT token

      const response = await axios.delete(`/deleteProvider/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 send token
        },
      });

      alert("Provider deleted!");
      setProviders(providers.filter((p) => p._id !== providerId));
    } catch (err) {
      alert("Error deleting provider");
    }
  };

  // Search filter
  const filteredProviders = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.services.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading providers...</p>
        </div>
      </div>
    );

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-6 border border-cyan-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <HiOutlineUserGroup className="text-2xl text-cyan-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Manage Providers
            </h2>
            <p className="text-sm text-gray-600 mt-0.5">
              View and manage all service providers
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Providers</p>
              <p className="text-2xl font-bold text-gray-800">{providers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <HiOutlineUserGroup className="text-xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {providers.filter((p) => p.status === "Approved").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <FiCheck className="text-xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {providers.filter((p) => p.status === "Pending").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <span className="text-xl text-yellow-600">⏱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Search Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative max-w-md">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by name or service..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredProviders.map((p, i) => (
                <tr
                  key={p._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-700">
                      #{i + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{p.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{p.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {p.services.map((s) => (
                        <span
                          key={s._id}
                          className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-100"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : p.status === "Approved"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {/* Approve */}
                      {p.status !== "Approved" && (
                        <button
                          onClick={() => updateStatus(p._id, "Approved")}
                          className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-lg text-xs font-medium transition-all duration-200"
                        >
                          <FiCheck className="text-sm" />
                          Approve
                        </button>
                      )}

                      {/* Reject */}
                      {p.status !== "Rejected" && (
                        <button
                          onClick={() => updateStatus(p._id, "Rejected")}
                          className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg text-xs font-medium transition-all duration-200"
                        >
                          <FiX className="text-sm" />
                          Reject
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => deleteProvider(p._id)}
                        className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg text-xs font-medium transition-all duration-200"
                      >
                        <FiTrash2 className="text-sm" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoSearchOutline className="text-3xl text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-1">No providers found</p>
            <p className="text-sm text-gray-500">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProviders;