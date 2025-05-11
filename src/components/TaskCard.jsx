import React from 'react';
import { FaCheckCircle, FaRegCircle, FaTrash } from "react-icons/fa";
import { FaCalendarAlt, FaBell } from "react-icons/fa";

const TaskCard = ({ task, index, toggleStatus, deletetask, getPriorityColor }) => {
  const priorityColor = getPriorityColor(task.priority);

  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const isOverdue = () => {
    try {
      const deadline = new Date(task.deadline);
      return deadline < new Date() && task.status !== "Completed";
    } catch (error) {
      console.error('Error checking overdue status:', error);
      return false;
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${priorityColor.split(" ")[1]} hover:shadow-lg transition-shadow ${
        isOverdue() ? 'border-red-500' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
        <h3 className="font-semibold text-lg break-words">{task.title}</h3>
        <span
          className={`text-xs font-semibold ${priorityColor.split(" ")[0]} border border-gray-200 px-2 py-0.5 rounded-full self-start`}
        >
          {task.priority}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3 break-words">{task.description}</p>
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center text-sm text-gray-500">
          <FaCalendarAlt className="mr-1" />
          <span className={isOverdue() ? 'text-red-500 font-semibold' : ''}>
            Deadline: {formatDateTime(task.deadline)}
          </span>
        </div>
        {task.reminderTime && (
          <div className="flex items-center text-sm text-gray-500">
            <FaBell className="mr-1" />
            <span>
              Reminder: {formatDateTime(task.reminderTime)}
            </span>
          </div>
        )}
        <span className="bg-gray-100 px-2 py-1 rounded-full self-start">
          {task.category}
        </span>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center">
          {task.status === "Completed" ? (
            <FaCheckCircle
              className="text-green-500 text-xl cursor-pointer hover:text-green-600 transition-colors"
              onClick={() => toggleStatus(task._id)}
            />
          ) : (
            <FaRegCircle
              className="text-gray-400 text-xl cursor-pointer hover:text-gray-500 transition-colors"
              onClick={() => toggleStatus(task._id)}
            />
          )}
          <span
            className={`ml-2 ${
              task.status === "Completed"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {task.status}
          </span>
        </div>
        <button
          className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
          onClick={() => deletetask(task._id)}
          title="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskCard; 
