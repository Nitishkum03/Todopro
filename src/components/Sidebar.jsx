import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = ({ filter, setFilter, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-5 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-white bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-50 w-64 bg-white flex flex-col`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <span className="text-xl text-gray-500">Todo User</span>
        </div>
        <div className="p-6">
          <h2 className="text-xl text-gray-600 font-semibold uppercase mb-4">Views</h2>
          <ul className="space-y-1">
            <li 
              onClick={() => {
                setFilter("All");
                setIsOpen(false);
              }}
              className={`text-xl flex items-center cursor-pointer ${
                filter === "All" ? "text-blue-500 font-semibold" : "text-gray-700"
              }`}
            >
              All Tasks
            </li>
            <li 
              onClick={() => {
                setFilter("Active");
                setIsOpen(false);
              }}
              className={`text-xl flex items-center cursor-pointer ${
                filter === "Active" ? "text-blue-500 font-semibold" : "text-gray-700"
              }`}
            >
              Active
            </li>
            <li 
              onClick={() => {
                setFilter("Completed");
                setIsOpen(false);
              }}
              className={`text-xl flex items-center cursor-pointer ${
                filter === "Completed" ? "text-blue-500 font-semibold" : "text-gray-700"
              }`}
            >
              Completed
            </li>
          </ul>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-500 uppercase mb-2">Categories</h2>
          <ul className="space-y-1">
            {["Work", "Personal", "Shopping", "Health"].map((cat) => (
              <li
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setIsOpen(false);
                }}
                className={`text-xl cursor-pointer ${
                  filter === cat ? "text-blue-500 font-semibold" : "text-gray-700"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 flex items-center mt-auto">
          <button 
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="bg-red-600 w-full cursor-pointer text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 
