// import React from 'react'
// import { GoShieldCheck } from 'react-icons/go'
// import { IoPeopleOutline } from 'react-icons/io5'
// import { LuUserCog } from 'react-icons/lu'
// import { MdHistory } from 'react-icons/md'
// import { RxDashboard } from 'react-icons/rx'
// import { NavLink } from 'react-router-dom'
// // import { assets } from '../../assets/assets'

// const Sidebar = () => {
//   return (
//     <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 text-gray-600'>
//         <NavLink end={true} to='/admin' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//             <RxDashboard />
//             <p className='hidden md:inline-block'>Dashboard</p>
//         </NavLink>

//         <NavLink  to='/admin/add-provider' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//             <IoPeopleOutline />
//             <p className='hidden md:inline-block'>View Providers</p>
//         </NavLink>

//         <NavLink  to='/admin/manage-user' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//            <LuUserCog />
//             <p className='hidden md:inline-block'>Manage user</p>
//         </NavLink>

//         <NavLink  to='/admin/settlement-history' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//             <MdHistory />
//             <p className='hidden md:inline-block'>Settlement History</p>
//         </NavLink>

//         <NavLink  to='/admin/security' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//             <GoShieldCheck />
//             <p className='hidden md:inline-block'>Scecurity</p>
//         </NavLink>
//     </div>
//   )
// }

// export default Sidebar



import React, { useState } from 'react'
import { BsGraphUpArrow } from 'react-icons/bs'
import { GoBell, GoShieldCheck } from 'react-icons/go'
import { IoPeopleOutline } from 'react-icons/io5'
import { LuUserCog } from 'react-icons/lu'
import { MdHistory } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: RxDashboard, end: true },
    { to: '/admin/add-provider', label: 'View Providers', icon: IoPeopleOutline },
    { to: '/admin/manage-user', label: 'Manage User', icon: LuUserCog },
    { to: '/admin/settlement-history', label: 'Settlement History', icon: MdHistory },
    { to: '/admin/analytics', label: 'Analytics', icon: BsGraphUpArrow },
    { to: '/admin/notification', label: 'Notification', icon: GoBell },
  ]

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className='fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-md md:hidden text-cyan-600 hover:bg-cyan-50 transition-colors'
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
          fixed md:relative z-40 h-full overflow-y-auto`}
      >
        {/* Header */}
        <div className='px-6 py-8 border-b border-gray-100'>
          <h2 className='text-xl font-semibold text-gray-800'>Admin Panel</h2>
          <p className='text-xs text-gray-500 mt-1'>Management Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className='flex-1 py-6 px-3 lg:px-4'>
          <div className='space-y-1'>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  end={item.end}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                      ? 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 shadow-sm border-l-4 border-cyan-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 flex-shrink-0 ${isActive
                            ? 'bg-cyan-100 text-cyan-700'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                          }`}
                      >
                        <Icon className='text-lg' />
                      </div>
                      <span
                        className={`lg:inline-block font-medium text-sm ${isOpen || 'hidden lg:inline-block' ? 'block' : 'hidden'
                          } ${isActive ? 'text-cyan-700' : 'text-gray-700'}`}
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
        <div className='px-6 py-6 border-t border-gray-100'>
          <div className={`${isOpen ? 'block' : 'hidden lg:block'} bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100`}>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
              <span className='text-xs font-medium text-gray-700'>System Status</span>
            </div>
            <p className='text-xs text-gray-600'>All systems operational</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar