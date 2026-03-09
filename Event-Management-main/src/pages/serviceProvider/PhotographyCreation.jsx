import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Video,
  Users,
  Mail,
  MapPin,
  Phone,
  Info,
  Plus,
  Trash2,
  ImageIcon,
  X,
  Save,
  CheckCircle2,
  Package,
  Clock,
  IndianRupee,
  Layers,
  ChevronRight,
  Sparkles
} from "lucide-react";

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="flex flex-col space-y-2">
    <label className="flex items-center text-sm font-semibold text-slate-700 ml-1">
      <Icon className="w-4 h-4 mr-2 text-sky-500" />
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md"
    />
  </div>
);

const PhotographyCreation = () => {
  // -------- BASIC DETAILS --------
  const [studioName, setStudioName] = useState("");
  const [photographerName, setPhotographerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // -------- SERVICE TYPES --------
  const [serviceTypes, setServiceTypes] = useState([]);

  const toggleServiceType = (type) => {
    setServiceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // -------- PORTFOLIO --------
  const [images, setImages] = useState([]);

  const handlePortfolioUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 4) {
      alert("Maximum 4 portfolio images allowed");
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

  // -------- PACKAGES --------
  const [packages, setPackages] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [packagePricePerHour, setPackagePricePerHour] = useState("");

  const addPackage = () => {
    if (!packageName || !packageDescription || !packagePricePerHour) {
      alert("Fill all package fields");
      return;
    }

    setPackages((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: packageName,
        description: packageDescription,
        pricePerHour: Number(packagePricePerHour),
      },
    ]);

    setPackageName("");
    setPackageDescription("");
    setPackagePricePerHour("");
  };

  const removePackage = (id) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  const [loading, setLoading] = useState(false);

  // -------- SUBMIT --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (packages.length === 0) {
      alert("Please add at least one package");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("studioName", studioName);
      formData.append("photographerName", photographerName);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("serviceTypes", JSON.stringify(serviceTypes));
      formData.append("packages", JSON.stringify(packages));
      formData.append("category", "photography");

      images.forEach((img) => {
        formData.append("images", img.file);
      });

      await axios.post("/addPhotography", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Photography Service Created Successfully!");

      // RESET
      setStudioName("");
      setPhotographerName("");
      setPhone("");
      setEmail("");
      setLocation("");
      setDescription("");
      setServiceTypes([]);
      setPackages([]);
      setImages([]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-4 sm:p-8 bg-slate-50/50"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Photography Studio Setup
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Capture life's most beautiful moments</p>
          </div>
          <div className="flex items-center space-x-2 text-sky-600 bg-sky-50 px-4 py-2 rounded-full border border-sky-100">
            <Camera className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Certified Studio</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info Section */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-sky-100 p-3 rounded-2xl">
                  <span className="text-sky-600">
                    <Users className="w-6 h-6" />
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Studio Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Studio / Company Name"
                  icon={Camera}
                  type="text"
                  placeholder="e.g. LensCraft Studios"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  required
                />
                <InputField
                  label="Lead Photographer"
                  icon={Users}
                  type="text"
                  placeholder="Professional Name"
                  value={photographerName}
                  onChange={(e) => setPhotographerName(e.target.value)}
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
                <InputField
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  placeholder="hello@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mt-6">
                <InputField
                  label="Studio Location"
                  icon={MapPin}
                  type="text"
                  placeholder="Operational City or Physical Address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="mt-8">
                <label className="flex items-center text-sm font-semibold text-slate-700 ml-1 mb-2">
                  <Info className="w-4 h-4 mr-2 text-sky-500" />
                  Studio Philosophy
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your style (Candid, Traditional, Cinematic)..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </motion.div>

            {/* Service Types Section */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-indigo-100 p-3 rounded-2xl">
                  <Layers className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Specializations</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Wedding", "Engagement", "Candid", "Traditional", "Drone",
                  "Video Coverage", "Baby Shoot", "Maternity", "Birthday", "Corporate", "Pre-Wedding"
                ].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all duration-200 border-2
                      ${serviceTypes.includes(type)
                        ? "bg-sky-50 border-sky-500 text-sky-700 shadow-sm"
                        : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={serviceTypes.includes(type)}
                      onChange={() => toggleServiceType(type)}
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
                      ${serviceTypes.includes(type) ? "border-sky-500 bg-sky-500" : "border-slate-300"}
                    `}>
                      {serviceTypes.includes(type) && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm font-bold">{type}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Package Management Section */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <Package className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Hourly Packages</h3>
              </div>

              <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Package Name"
                    icon={Package}
                    type="text"
                    placeholder="e.g. Basic Event Session"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                  />
                  <InputField
                    label="Price per Hour (₹)"
                    icon={IndianRupee}
                    type="number"
                    placeholder="Rate per hour"
                    value={packagePricePerHour}
                    onChange={(e) => setPackagePricePerHour(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center text-sm font-semibold text-slate-700 ml-1">
                    <Info className="w-4 h-4 mr-2 text-sky-500" />
                    Package Coverage
                  </label>
                  <textarea
                    placeholder="Details about deliverables (photos, edits, raw files)..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all duration-200 shadow-sm resize-none"
                    rows={2}
                    value={packageDescription}
                    onChange={(e) => setPackageDescription(e.target.value)}
                  />
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={addPackage}
                  className="w-full py-4 bg-sky-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-sky-100"
                >
                  <Plus className="w-5 h-5" />
                  <span>Configure Package</span>
                </motion.button>
              </div>

              <div className="mt-8 space-y-4">
                <AnimatePresence>
                  {packages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-sky-50 p-2 rounded-xl">
                          <Clock className="w-5 h-5 text-sky-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{pkg.name}</h4>
                          <p className="text-xs text-sky-600 font-bold tracking-wider">₹{pkg.pricePerHour} / HOUR</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePackage(pkg.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Portfolio Upload */}
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Portfolio</h3>
                <span className="text-xs font-bold text-slate-400">Max 4</span>
              </div>

              <div className="space-y-4">
                <label className="group relative flex flex-col items-center justify-center w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-sky-50 hover:border-sky-300 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-sky-500 transition-colors mb-2" />
                    <p className="text-xs font-bold text-slate-500 group-hover:text-sky-600 tracking-wider">ADD WORK</p>
                  </div>
                  <input type="file" multiple accept="image/*" onChange={handlePortfolioUpload} className="hidden" />
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <AnimatePresence>
                    {images.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
                      >
                        <img src={img.preview} alt="Work preview" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm text-rose-500 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {images.length === 0 && (
                  <div className="text-center py-8">
                    <Sparkles className="w-8 h-8 mx-auto text-slate-200 mb-2" />
                    <p className="text-xs text-slate-400 font-medium italic">Showcase your best shots</p>
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
                  : "bg-gradient-to-br from-sky-600 via-indigo-600 to-sky-700 text-white shadow-sky-200 hover:shadow-sky-300"
                }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Create Service</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default PhotographyCreation;
