import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import axios from "axios";
import { IoStar, IoTimeOutline, IoPersonOutline, IoBusinessOutline } from "react-icons/io5";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews of this provider
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/reviews/provider", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setReviews(res.data.reviews);
        }
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-600">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              {/* Header: Customer and Date */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold">
                    {r.customer?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{r.customer?.name || "Anonymous User"}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                      <IoTimeOutline className="w-3 h-3" />
                      <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div className="flex items-center gap-2 mb-3 px-3 py-1.5 bg-gray-50 rounded-lg w-fit">
                <IoBusinessOutline className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {r.serviceName}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <IoStar
                    key={index}
                    className={`text-lg ${index < r.rating ? "text-amber-400" : "text-gray-200"
                      }`}
                  />
                ))}
                <span className="ml-2 text-sm font-bold text-gray-700">{r.rating}/5</span>
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{r.comment}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
