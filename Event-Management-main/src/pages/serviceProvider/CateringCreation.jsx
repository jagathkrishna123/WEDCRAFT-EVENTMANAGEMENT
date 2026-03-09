import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import {
  Utensils,
  User,
  Phone,
  MapPin,
  Plus,
  Trash2,
  Image as ImageIcon,
  X,
  Save,
  ChefHat,
  Package,
  Tag,
  Info,
  ChevronRight
} from "lucide-react";

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="flex flex-col space-y-2">
    <label className="flex items-center text-sm font-semibold text-slate-700 ml-1">
      <Icon className="w-4 h-4 mr-2 text-emerald-500" />
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-indigo-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md"
    />
  </div>
);

const CateringCreation = () => {
  // Provider info
  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");

  // Packages
  const [packages, setPackages] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [pricePerPerson, setPricePerPerson] = useState("");
  const [packageDescription, setPackageDescription] = useState("");

  // Images
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------- ADD PACKAGE ----------
  const addPackage = () => {
    if (!packageName || !pricePerPerson) {
      alert("Fill package name and price");
      return;
    }

    setPackages((prev) => [
      ...prev,
      {
        id: Date.now(),
        packageName,
        foodType,
        pricePerPerson,
        description: packageDescription,
      },
    ]);

    setPackageName("");
    setFoodType("veg");
    setPricePerPerson("");
    setPackageDescription("");
  };

  const removePackage = (id) => {
    setPackages(packages.filter((p) => p.id !== id));
  };

  // ---------- IMAGE UPLOAD ----------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      alert("Max 4 images");
      return;
    }

    setImages((prev) => [
      ...prev,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (packages.length === 0) {
      alert("Please add at least one catering package.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("ownerName", ownerName);
      formData.append("contactNumber", contactNumber);
      formData.append("location", location);
      formData.append("packages", JSON.stringify(packages));
      formData.append("category", "catering");

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      await axios.post("/addCatering", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Catering Service Created Successfully!");

      // Reset
      setCompanyName("");
      setOwnerName("");
      setContactNumber("");
      setLocation("");
      setPackages([]);
      setImages([]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              Catering Service Setup
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Create a delicious profile for your catering business</p>
          </div>
          <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
            <ChefHat className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Professional Provider</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Provider Section */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-emerald-100 p-3 rounded-2xl">
                  <Utensils className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Catering Business Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Company Name"
                  icon={Utensils}
                  type="text"
                  placeholder="e.g. Royal Delights Catering"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
                <InputField
                  label="Owner Name"
                  icon={User}
                  type="text"
                  placeholder="Owner's full name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
                <InputField
                  label="Contact Number"
                  icon={Phone}
                  type="text"
                  placeholder="+91 XXXXX XXXXX"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
                <InputField
                  label="Location"
                  icon={MapPin}
                  type="text"
                  placeholder="City, Area..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            {/* Packages Section */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <Package className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Menu Packages</h3>
              </div>

              <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Package Name"
                    icon={Tag}
                    type="text"
                    placeholder="e.g. Platinum Wedding Menu"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                  />
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center text-sm font-semibold text-slate-700 ml-1">
                      <ChefHat className="w-4 h-4 mr-2 text-emerald-500" />
                      Food Type
                    </label>
                    <select
                      value={foodType}
                      onChange={(e) => setFoodType(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 shadow-sm"
                    >
                      <option value="veg">Pure Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                      <option value="both">Veg & Non-Veg Mixed</option>
                    </select>
                  </div>
                  <InputField
                    label="Price per Person (₹)"
                    icon={ChefHat}
                    type="number"
                    placeholder="Rate per plate"
                    value={pricePerPerson}
                    onChange={(e) => setPricePerPerson(e.target.value)}
                  />
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center text-sm font-semibold text-slate-700 ml-1">
                      <Info className="w-4 h-4 mr-2 text-emerald-500" />
                      Description
                    </label>
                    <textarea
                      placeholder="List main dishes or specialties..."
                      className="w-full px-4 py-2 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 shadow-sm resize-none"
                      rows={1}
                      value={packageDescription}
                      onChange={(e) => setPackageDescription(e.target.value)}
                    />
                  </div>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addPackage}
                  className="mt-6 w-full py-3 bg-white text-emerald-600 border-2 border-emerald-500 border-dashed rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-emerald-50 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Package to List</span>
                </motion.button>
              </div>

              {/* Added Packages List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {packages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group flex items-center justify-between p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 hover:bg-emerald-50 transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-emerald-500 p-2 rounded-xl text-white">
                          <ChefHat className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{pkg.packageName}</h4>
                          <p className="text-sm text-slate-500 font-medium capitalize">
                            {pkg.foodType} • ₹{pkg.pricePerPerson}/plate
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePackage(pkg.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {packages.length === 0 && (
                  <div className="text-center py-10 text-slate-400 italic font-medium border-2 border-dashed border-slate-100 rounded-[2rem]">
                    No packages added yet.
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-rose-100 p-3 rounded-2xl">
                    <ImageIcon className="w-6 h-6 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Food Gallery</h3>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{images.length}/4</span>
              </div>

              <div className="space-y-4">
                <label className="group relative flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-[1.5rem] hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer overflow-hidden">
                  <div className="flex flex-col items-center justify-center py-6 text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <Plus className="w-10 h-10 mb-2" />
                    <p className="text-sm font-semibold">Upload Photos</p>
                    <p className="text-xs mt-1">Showcase your menu</p>
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

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-5 rounded-[1.5rem] font-bold text-lg shadow-2xl transition-all flex items-center justify-center space-x-3 
                ${loading
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-200 hover:shadow-emerald-300"
                }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating...</span>
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Launch Service</span>
                </>
              )}
            </motion.button>
            <p className="text-center text-xs text-slate-400 font-medium px-4">
              By launching, you agree to our service provider terms and food safety guidelines.
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CateringCreation;
