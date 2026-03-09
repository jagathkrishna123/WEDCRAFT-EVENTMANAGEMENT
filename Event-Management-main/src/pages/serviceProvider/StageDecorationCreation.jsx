import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Building2,
  MapPin,
  Phone,
  Info,
  Plus,
  Trash2,
  ImageIcon,
  X,
  Save,
  Star,
  Heart,
  Palette,
  Layout,
  IndianRupee,
  ChevronRight
} from "lucide-react";

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="flex flex-col space-y-2">
    <label className="flex items-center text-sm font-semibold text-slate-700 ml-1">
      <Icon className="w-4 h-4 mr-2 text-rose-500" />
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md"
    />
  </div>
);

const StageDecorationCreation = () => {
  // Main details
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  // Packages
  const [decorations, setDecorations] = useState([]);

  // Package builder fields
  const [decTitle, setDecTitle] = useState("");
  const [decDescription, setDecDescription] = useState("");
  const [decCategory, setDecCategory] = useState("Affordable");
  const [decPricePerDay, setDecPricePerDay] = useState("");
  const [decImage, setDecImage] = useState(null);
  const [decImagePreview, setDecImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);

  // ---------- HANDLE IMAGE ----------
  const handleDecorationImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setDecImage(file);
    setDecImagePreview(URL.createObjectURL(file));
  };

  const removeBuilderImage = () => {
    setDecImage(null);
    setDecImagePreview(null);
  };

  // ---------- ADD PACKAGE ----------
  const addDecoration = () => {
    if (!decTitle || !decDescription || !decPricePerDay || !decImage) {
      alert("Fill all package fields before adding!");
      return;
    }

    setDecorations((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: decTitle,
        description: decDescription,
        category: decCategory,
        pricePerDay: Number(decPricePerDay),
        image: decImage,
        preview: decImagePreview,
      },
    ]);

    // Reset builder
    setDecTitle("");
    setDecDescription("");
    setDecCategory("Affordable");
    setDecPricePerDay("");
    setDecImage(null);
    setDecImagePreview(null);
  };

  const removeDecoration = (id) => {
    setDecorations(decorations.filter((item) => item.id !== id));
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (decorations.length === 0) {
      alert("Please add at least one decoration package.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("address", address);
      formData.append("location", location);
      formData.append("phone", phone);
      formData.append("description", description);
      formData.append("category", "stage-decoration");

      const packagesData = decorations.map((item) => {
        formData.append("images", item.image);
        return {
          title: item.title,
          description: item.description,
          category: item.category,
          pricePerDay: item.pricePerDay,
        };
      });

      formData.append("packages", JSON.stringify(packagesData));

      await axios.post("/addstage-decoration", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Stage Decoration Service Created Successfully!");

      // RESET
      setCompanyName("");
      setAddress("");
      setLocation("");
      setPhone("");
      setDescription("");
      setDecorations([]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen p-4 sm:p-8 bg-rose-50/30"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Stage Decor Setup
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Create magical stages for unforgettable events</p>
          </div>
          <div className="flex items-center space-x-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Premium Decorator</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info Section */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-rose-100 p-3 rounded-2xl">
                  <Building2 className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Company Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Company Name"
                  icon={Building2}
                  type="text"
                  placeholder="e.g. Starline Stage Decor"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
                <InputField
                  label="Address"
                  icon={MapPin}
                  type="text"
                  placeholder="Street address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <InputField
                  label="Location"
                  icon={MapPin}
                  type="text"
                  placeholder="City or Area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <InputField
                  label="Phone Number"
                  icon={Phone}
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mt-8">
                <label className="flex items-center text-sm font-semibold text-slate-700 ml-1 mb-2">
                  <Info className="w-4 h-4 mr-2 text-rose-500" />
                  About Service
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your themes, floral styles, and unique setups..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            {/* Package Builder Section */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <Palette className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Add Decoration Packages</h3>
              </div>

              <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Package Title"
                    icon={Layout}
                    type="text"
                    placeholder="e.g. Royal Floral Stage"
                    value={decTitle}
                    onChange={(e) => setDecTitle(e.target.value)}
                  />
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center text-sm font-semibold text-slate-700 ml-1">
                      <Star className="w-4 h-4 mr-2 text-rose-500" />
                      Category
                    </label>
                    <select
                      value={decCategory}
                      onChange={(e) => setDecCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all duration-200 shadow-sm"
                    >
                      <option>Affordable</option>
                      <option>Premium</option>
                      <option>Luxury</option>
                    </select>
                  </div>
                  <InputField
                    label="Price per Day (₹)"
                    icon={IndianRupee}
                    type="number"
                    placeholder="Rent per day"
                    value={decPricePerDay}
                    onChange={(e) => setDecPricePerDay(e.target.value)}
                  />
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center text-sm font-semibold text-slate-700 ml-1">
                      <ImageIcon className="w-4 h-4 mr-2 text-rose-500" />
                      Upload Theme Photo
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="cursor-pointer bg-white border-2 border-dashed border-rose-200 px-4 py-2 rounded-xl text-rose-500 font-bold hover:bg-rose-50 transition-all flex-1 text-center">
                        {decImage ? "Change Image" : "Choose File"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleDecorationImage}
                          className="hidden"
                        />
                      </label>
                      {decImagePreview && (
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden border">
                          <img src={decImagePreview} className="h-full w-full object-cover" />
                          <button onClick={removeBuilderImage} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center text-sm font-semibold text-slate-700 ml-1">
                    <Info className="w-4 h-4 mr-2 text-rose-500" />
                    Package Description
                  </label>
                  <textarea
                    placeholder="Short list of items included in this theme..."
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all duration-200 shadow-sm resize-none"
                    rows={1}
                    value={decDescription}
                    onChange={(e) => setDecDescription(e.target.value)}
                  />
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={addDecoration}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-rose-200"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Package to Catalog</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Added Decorations Preview */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-100 p-3 rounded-2xl">
                    <Heart className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Your Catalog</h3>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{decorations.length} Items</span>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence>
                  {decorations.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:border-rose-200 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <img src={item.preview} className="h-16 w-16 rounded-2xl object-cover shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 truncate">{item.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 bg-rose-100 text-rose-600 rounded-full">
                              {item.category}
                            </span>
                            <span className="text-xs font-bold text-slate-500">₹{item.pricePerDay}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDecoration(item.id)}
                          className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {decorations.length === 0 && (
                  <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
                    <Sparkles className="w-8 h-8 mx-auto text-slate-200 mb-2" />
                    <p className="text-xs text-slate-400 font-medium">Build your collection</p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-5 rounded-[2.5rem] font-bold text-lg shadow-2xl transition-all flex items-center justify-center space-x-3 
                ${loading
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 text-white shadow-rose-200 hover:shadow-rose-300"
                }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Styling Stages...</span>
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Publish Service</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default StageDecorationCreation;
