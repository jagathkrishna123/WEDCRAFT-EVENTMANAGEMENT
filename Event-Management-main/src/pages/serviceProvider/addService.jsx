import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Building2,
  UtensilsCrossed,
  Camera,
  Sparkles,
  Plus,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Star,
  Globe
} from "lucide-react";

const AddService = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "Auditorium",
      subtitle: "Large venues, banquet halls, and open spaces.",
      icon: Building2,
      color: "from-blue-500 to-indigo-600",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      path: "/provider/add-service/auditorium"
    },
    {
      name: "Catering / Food",
      subtitle: "Gourmet dining, buffets, and specialized cuisines.",
      icon: UtensilsCrossed,
      color: "from-emerald-500 to-teal-600",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      path: "/provider/add-service/catering"
    },
    {
      name: "Stage Decoration",
      subtitle: "Floral setups, themed stages, and event lighting.",
      icon: Sparkles,
      color: "from-rose-500 to-pink-600",
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
      path: "/provider/add-service/stage-decoration"
    },
    {
      name: "Photography",
      subtitle: "Cinematic videos, candid shots, and portfolio work.",
      icon: Camera,
      color: "from-sky-500 to-blue-600",
      lightColor: "bg-sky-50",
      textColor: "text-sky-600",
      path: "/provider/add-service/photography"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center space-x-2 text-indigo-600 font-bold tracking-widest uppercase text-xs mb-3">
              <Star className="w-4 h-4" />
              <span>Service Provider Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Expand Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Empire</span>
            </h1>
            <p className="text-slate-500 mt-3 text-md md:text-lg font-medium max-w-xl">
              Choose a category to launch your new service and start connecting with thousands of event organizers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex items-center space-x-4 bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="bg-indigo-50 p-3 rounded-2xl">
              <Globe className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Verified Status</p>
              <div className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="font-bold text-slate-700">Premium Partner</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => navigate(service.path)}
              className="group cursor-pointer relative overflow-hidden bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50"
            >
              {/* Animated Background Blob */}
              <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-all duration-700 blur-3xl`} />

              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-4">
                  <div className={`${service.lightColor} w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm border border-slate-50`}>
                    <service.icon className={`w-8 h-8 ${service.textColor}`} />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-slate-500 mt-2 font-medium leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm font-bold text-indigo-600 pt-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    <span>Create Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-inner">
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* New Service Suggestion Card */}
          <motion.div
            variants={item}
            className="md:col-span-2 mt-8 p-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[3rem] text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <Plus className="w-12 h-12 mx-auto text-indigo-400 bg-white/5 p-3 rounded-2xl" />
              <h2 className="text-3xl font-bold text-white">Need a dynamic category?</h2>
              <p className="text-slate-400 font-medium">
                We're constantly expanding our horizons. If your specialized event service isn't listed here, reach out to our support team and we'll build it for you.
              </p>
              <button className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl">
                Contact Support
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white rounded-2xl shadow-lg border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Reach</p>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-slate-600">Joined by 10k+ Providers</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddService;
