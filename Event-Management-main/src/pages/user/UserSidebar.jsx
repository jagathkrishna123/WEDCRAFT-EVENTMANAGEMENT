// import React from 'react'
// import { RxDashboard } from 'react-icons/rx'
// import { HiQuestionMarkCircle } from 'react-icons/hi'
// import { NavLink } from 'react-router-dom'

// const UserSidebar = () => {
//   return (
//     <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 text-gray-600'>
//         <NavLink end={true} to='/user-dashboard' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//             <RxDashboard />
//             <p className='hidden md:inline-block'>My Bookings</p>
//         </NavLink>

//         <NavLink to='/user-dashboard/faq' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-cyan-800 border-r-4 border-blue-500 text-gray-200"}`}>
//            <HiQuestionMarkCircle />
//             <p className='hidden md:inline-block'>FAQ</p>
//         </NavLink>
//     </div>
//   )
// }

// export default UserSidebar

import React from 'react'
import { RxDashboard } from 'react-icons/rx'
import { HiQuestionMarkCircle } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-100 min-h-full bg-white shadow-sm'>
      {/* Header */}
      <div className='px-6 py-8 border-b border-gray-100'>
        <h2 className='text-lg font-semibold text-gray-800'>Dashboard</h2>
        <p className='text-sm text-gray-500 mt-1'>Manage your account</p>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-3 py-6 space-y-2'>
        <NavLink 
          end={true} 
          to='/user-dashboard' 
          className={({isActive})=> `
            group flex items-center gap-3 py-3 px-4 rounded-lg
            transition-all duration-200 ease-in-out
            hover:bg-gray-50
            ${isActive 
              ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 shadow-sm border-l-4 border-cyan-600' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          <RxDashboard className={`text-xl transition-transform group-hover:scale-110`} />
          <span className='hidden md:inline-block font-medium'>My Bookings</span>
        </NavLink>

        <NavLink 
          to='/user-dashboard/faq' 
          className={({isActive})=> `
            group flex items-center gap-3 py-3 px-4 rounded-lg
            transition-all duration-200 ease-in-out
            hover:bg-gray-50
            ${isActive 
              ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 shadow-sm border-l-4 border-cyan-600' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          <HiQuestionMarkCircle className={`text-xl transition-transform group-hover:scale-110`} />
          <span className='hidden md:inline-block font-medium'>FAQ</span>
        </NavLink>
      </nav>

      {/* Footer - Optional Help Section */}
      <div className='px-6 py-6 border-t border-gray-100 bg-gray-50'>
        <div className='hidden md:block'>
          <p className='text-xs font-semibold text-gray-700 mb-2'>Need Help?</p>
          <p className='text-xs text-gray-500 leading-relaxed'>
            Contact our support team for assistance
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSidebar