import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  MapPin,
  Phone,
  Users,
  IndianRupee,
  Clock,
  Info,
  Image as ImageIcon,
  X,
  Plus,
  Save,
  ShieldCheck,
  Zap
} from "lucide-react";

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="flex flex-col space-y-2">
    <label className="flex items-center text-sm font-medium text-slate-700 ml-1">
      <Icon className="w-4 h-4 mr-2 text-indigo-500" />
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md"
    />
  </div>
);

const TextAreaField = ({ label, icon: Icon, ...props }) => (
  <div className="flex flex-col space-y-2">
    <label className="flex items-center text-sm font-medium text-slate-700 ml-1">
      <Icon className="w-4 h-4 mr-2 text-indigo-500" />
      {label}
    </label>
    <textarea
      {...props}
      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md resize-none"
    />
  </div>
);

const AuditoriumCreation = () => {
  const [auditoriumName, setAuditoriumName] = useState("");
  const [location, setLocation] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [overtimePrice, setOvertimePrice] = useState("");
  const [acType, setAcType] = useState("");
  const [description, setDescription] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------- IMAGE UPLOAD ----------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      alert("You can upload only 4 images.");
      return;
    }
    const previewImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previewImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("auditoriumName", auditoriumName);
    formData.append("location", location);
    formData.append("ownerContact", ownerContact);
    formData.append("capacity", capacity);
    formData.append("pricePerDay", price);
    formData.append("pricePerHour", pricePerHour);
    formData.append("overtimePrice", overtimePrice);
    formData.append("acType", acType);
    formData.append("description", description);
    formData.append("openingTime", openingTime);
    formData.append("closingTime", closingTime);
    formData.append("cancellationPolicy", cancellationPolicy);
    formData.append("category", "auditorium");

    images.forEach((img) => {
      formData.append("images", img.file);
    });

    try {
      await axios.post("/addAuditorium", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Auditorium created successfully!");
      // RESET
      setAuditoriumName("");
      setLocation("");
      setOwnerContact("");
      setCapacity("");
      setPrice("");
      setPricePerHour("");
      setOvertimePrice("");
      setAcType("");
      setDescription("");
      setOpeningTime("");
      setClosingTime("");
      setCancellationPolicy("");
      setImages([]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4 sm:p-8 bg-slate-50/50"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-violet-600 bg-clip-text text-transparent">
              Create New Auditorium
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Manage your venue listings and details</p>
          </div>
          <div className="flex items-center space-x-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Premium Listing</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details Section */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <Building2 className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Primary Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Auditorium Name"
                  icon={Building2}
                  type="text"
                  placeholder="e.g. Grand Plaza Hall"
                  value={auditoriumName}
                  onChange={(e) => setAuditoriumName(e.target.value)}
                  required
                />
                <InputField
                  label="Location"
                  icon={MapPin}
                  type="text"
                  placeholder="Full address here..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <InputField
                  label="Owner Contact"
                  icon={Phone}
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  value={ownerContact}
                  onChange={(e) => setOwnerContact(e.target.value)}
                  required
                />
                <InputField
                  label="Capacity"
                  icon={Users}
                  type="number"
                  placeholder="Max guests..."
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </div>

              <div className="mt-8 space-y-6">
                <TextAreaField
                  label="Description"
                  icon={Info}
                  rows={4}
                  placeholder="Describe the venue, amenities, and unique features..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <IndianRupee className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Pricing & Availability</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField
                  label="Price per Day"
                  icon={IndianRupee}
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <InputField
                  label="Price per Hour"
                  icon={Clock}
                  type="number"
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(e.target.value)}
                  required
                />
                <InputField
                  label="Overtime / Hour"
                  icon={Zap}
                  type="number"
                  value={overtimePrice}
                  onChange={(e) => setOvertimePrice(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <InputField
                  label="Opening Time"
                  icon={Clock}
                  type="time"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  required
                />
                <InputField
                  label="Closing Time"
                  icon={Clock}
                  type="time"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  required
                />
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-700 ml-1">
                    <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" />
                    AC Type
                  </label>
                  <select
                    value={acType}
                    onChange={(e) => setAcType(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <option value="">Select</option>
                    <option value="AC">Central AC</option>
                    <option value="Non-AC">Non AC</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-8">
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-3 rounded-2xl">
                    <ImageIcon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Media</h3>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{images.length}/4</span>
              </div>

              <div className="space-y-4">
                <label className="group relative flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-[1.5rem] hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer overflow-hidden">
                  <div className="flex flex-col items-center justify-center py-6 text-slate-400 group-hover:text-indigo-500 transition-colors">
                    <Plus className="w-10 h-10 mb-2" />
                    <p className="text-sm font-semibold">Add Images</p>
                    <p className="text-xs mt-1">High-quality photos</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <AnimatePresence>
                    {images.map((img, index) => (
                      <motion.div
                        key={img.preview}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative group h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
                      >
                        <img
                          src={img.preview}
                          alt="preview"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-rose-100 p-3 rounded-2xl">
                  <ShieldCheck className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Policies</h3>
              </div>
              <TextAreaField
                label="Cancellation Policy"
                icon={Info}
                rows={5}
                placeholder="Details about cancellation rules..."
                value={cancellationPolicy}
                onChange={(e) => setCancellationPolicy(e.target.value)}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-5 rounded-[1.5rem] font-bold text-lg shadow-2xl transition-all flex items-center justify-center space-x-3 
                ${loading
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-200 hover:shadow-indigo-300"
                }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>List Auditorium</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AuditoriumCreation;
