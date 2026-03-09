// import React from 'react'
// import { BiImages } from 'react-icons/bi'
// import { BsCardChecklist } from 'react-icons/bs'
// import { CgAddR } from 'react-icons/cg'
// import { LuMessageSquareText } from 'react-icons/lu'
// import { RxDashboard } from 'react-icons/rx'
// import { HiQuestionMarkCircle } from 'react-icons/hi'
// import { NavLink } from 'react-router-dom'
// import { GoBell } from 'react-icons/go'

// const Sidebar = () => {
//   return (
//     <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 text-gray-600'>
//         <NavLink end={true} to='/provider' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//             <RxDashboard />
//             <p className='hidden md:inline-block'>Dashboard</p>
//         </NavLink>

//         <NavLink  to='/provider/add-service' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//            <CgAddR />
//             <p className='hidden md:inline-block'>Add Service</p> 
//         </NavLink>

//         <NavLink  to='/provider/booking-details' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//             <BsCardChecklist />
//             <p className='hidden md:inline-block'>Booking Details</p>
//         </NavLink>

//         <NavLink  to='/provider/review' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//             <LuMessageSquareText />
//             <p className='hidden md:inline-block'>Review</p>
//         </NavLink>

//         <NavLink  to='/provider/my-services' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//            <BiImages />
//             <p className='hidden md:inline-block'>My Services</p>
//         </NavLink>
//         <NavLink  to='/provider/notification' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//            <GoBell />
//             <p className='hidden md:inline-block'>Notification</p>
//         </NavLink>

//         <NavLink  to='/provider/faq' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//            <HiQuestionMarkCircle />
//             <p className='hidden md:inline-block'>FAQ</p>
//         </NavLink>
//     </div>
//   )
// }

// export default Sidebar



import React, { useState } from 'react'
import { BiImages } from 'react-icons/bi'
import { BsCardChecklist } from 'react-icons/bs'
import { CgAddR } from 'react-icons/cg'
import { LuMessageSquareText } from 'react-icons/lu'
import { RxDashboard } from 'react-icons/rx'
import { HiQuestionMarkCircle, HiMenuAlt3, HiX } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import { GoBell } from 'react-icons/go'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { to: '/provider', label: 'Dashboard', icon: RxDashboard, end: true },
    { to: '/provider/add-service', label: 'Add Service', icon: CgAddR },
    { to: '/provider/booking-details', label: 'Booking Details', icon: BsCardChecklist },
    { to: '/provider/review', label: 'Review', icon: LuMessageSquareText },
    { to: '/provider/my-services', label: 'My Services', icon: BiImages },
    { to: '/provider/notification', label: 'Notification', icon: GoBell },
    { to: '/provider/faq', label: 'FAQ', icon: HiQuestionMarkCircle },
  ]

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className='fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden text-emerald-600 hover:bg-emerald-50 transition-colors'
      >
        {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`flex flex-col bg-white border-r border-gray-100 min-h-screen shadow-sm transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full w-0 md:translate-x-0 md:w-20 lg:w-72'}
          fixed md:relative z-40 h-full overflow-y-auto hide-scrollbar`}
      >
        {/* Header */}
        <div className='px-4 md:px-8 py-8 border-b border-gray-100'>
          <h2 className='text-xl font-semibold text-gray-800 hidden lg:block'>Provider Panel</h2>
          <h2 className='text-xl font-semibold text-gray-800 lg:hidden md:hidden block'>Provider Panel</h2>
          <p className='text-xs text-gray-500 mt-1 hidden lg:block'>Service Management</p>
        </div>

        {/* Navigation */}
        <nav className='flex-1 py-6 px-3 lg:px-4'>
          <div className='space-y-2'>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  end={item.end}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 px-4 lg:px-5 py-4 rounded-xl transition-all duration-200 ${isActive
                      ? 'bg-gradient-to-r from-emerald-100 to-teal-200 text-emerald-700 shadow-sm border-l-4 border-emerald-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-200 flex-shrink-0 ${isActive
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                          }`}
                      >
                        <Icon className='text-xl' />
                      </div>
                      <span
                        className={`lg:inline-block font-medium text-sm ${isOpen || 'hidden lg:inline-block' ? 'block' : 'hidden'
                          } ${isActive ? 'text-emerald-700' : 'text-gray-700'}`}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className='px-4 lg:px-8 py-6 border-t border-gray-100'>
          <div className={`${isOpen ? 'block' : 'hidden lg:block'} bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100`}>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              <span className='text-xs font-medium text-gray-700'>Service Status</span>
            </div>
            <p className='text-xs text-gray-600'>All services active</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar