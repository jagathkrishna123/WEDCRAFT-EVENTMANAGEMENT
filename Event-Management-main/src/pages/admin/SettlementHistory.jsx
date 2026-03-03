//#allbookings

import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import axios from "axios";
const SettlementHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        // Retrieve token from storage
        const token = localStorage.getItem("token"); // or sessionStorage / cookie

        const response = await axios.get("/getAllBookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response, "response");


        const data = response.data?.data; // adjust based on your API response shape
        // e.g. if your API returns { bookings: [...] }, use response.data.bookings

        setBookings(data);

        // Calculate Total Revenue (Completed Only)
        const revenue = data
          .filter((b) => b.status === "confirmed")
          .reduce((sum, b) => sum + b.totalPrice, 0);

        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);

        // Optional: handle 401 Unauthorized
        if (error.response?.status === 401) {
          // e.g. redirect to login
          // navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  // ---- END OF MOCK DATA ----

  if (loading) return <Loader />;

  return (
    <div className="p-6 w-full">
      {/* Revenue Section */}
      <div className="bg-cyan-600 rounded-xl shadow-md p-6 mb-6 border-2 border-gray-300 max-w-sm">
        <h3 className="text-xl font-bold mb-2 text-gray-700">Total Revenue</h3>
        <p className="text-3xl font-medium text-gray-200">₹{totalRevenue}</p>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-500">All Booking Details</h2>

      <div className="overflow-x-auto rounded-xl border border-gray-400">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-[15px] text-gray-600">
              <th className="p-3 font-semibold">Booking ID</th>
              <th className="p-3 font-semibold">Customer</th>
              <th className="p-3 font-semibold">Provider</th>
              <th className="p-3 font-semibold">Service Type</th>
              <th className="p-3 font-semibold">Event Date</th>
              <th className="p-3 font-semibold">Amount</th>
              <th className="p-3 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className=" hover:bg-gray-50 text-gray-600 text-sm">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{b.customerName}</td>
                <td className="p-3">{b.providerName}</td>
                <td className="p-3">{b.categoryModel}</td>
                <td className="p-3">{new Date(b.eventDate).toLocaleDateString("en-IN")}</td>
                <td className="p-3">₹{b.totalPrice}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${b.status === "Pending"
                      ? "bg-yellow-200 text-yellow-600"
                      : b.status === "Approved"
                        ? "bg-blue-600"
                        : b.status === "confirmed"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-600"
                      }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default SettlementHistory;
