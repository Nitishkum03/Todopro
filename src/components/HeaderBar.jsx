import React, { useState } from 'react';
import { FiPlus, FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import { FaHome, FaCalendarAlt, FaChartPie } from "react-icons/fa";
import UserProfile from './UserProfile';

const HeaderBar = ({ 
  filter, 
  searchTerm, 
  setSearchTerm, 
  setShowModal, 
  currentView, 
  changeView,
  user,
  onLogout 
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-semibold">
          {filter === "All" ? "All Tasks" : `${filter} Tasks`}
        </h2>
        <div className="flex items-center space-x-6">
          <div className="space-x-10 justify-center text-xl md:text-2xl font-semibold text-gray-500">
            <button 
              className={`cursor-pointer transition-colors ${currentView === "list" ? "text-blue-500" : "hover:text-blue-500"}`}
              onClick={() => changeView("list")}
              title="List View"
            >
              <FaHome />
            </button>
            <button 
              className={`cursor-pointer transition-colors ${currentView === "calendar" ? "text-blue-500" : "hover:text-blue-500"}`}
              onClick={() => changeView("calendar")}
              title="Calendar View"
            >
              <FaCalendarAlt />
            </button>
            <button 
              className={`cursor-pointer transition-colors ${currentView === "chart" ? "text-blue-500" : "hover:text-blue-500"}`}
              onClick={() => changeView("chart")}
              title="Chart View"
            >
              <FaChartPie />
            </button>
            <button 
              className="cursor-pointer hover:text-blue-500 transition-colors" 
              onClick={() => setShowModal(true)}
              title="Add New Task"
            >
              <FiPlus />
            </button>
          </div>
          
          {/* User Icon and Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FiUser className="text-xl" />
            </button>
            
            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">{user?.email || ''}</p>
                </div>
                <button
                  onClick={() => {
                    setShowProfile(true);
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <FiUser />
                  <span>Profile</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors"
        >
          <FiPlus className="mr-1" />
          Add Task
        </button>
      </div>

      {/* User Profile Modal */}
      {showProfile && (
        <UserProfile
          user={user}
          onLogout={onLogout}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default HeaderBar; 
