import React, { useState } from 'react';
import { FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TaskCalendar = ({ selectedDate, setSelectedDate, tasks, setShowModal, setNewTask }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Function to handle date click and open modal with pre-filled date
  const handleDateClick = (dateString) => {
    try {
      // Create a date object and set it to midnight UTC
      const date = new Date(dateString);
      date.setUTCHours(0, 0, 0, 0);
      
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString);
        return;
      }
      
      setSelectedDate(dateString);
      
      // Create reminder date (1 hour before deadline)
      const reminderDate = new Date(date);
      reminderDate.setUTCHours(23, 0, 0, 0); // Set to 11 PM UTC of the previous day
      
      setNewTask(prevTask => ({
        ...prevTask,
        deadline: date.toISOString(),
        reminderTime: reminderDate.toISOString()
      }));
      // Open the modal
      setShowModal(true);
    } catch (error) {
      console.error('Error handling date click:', error);
    }
  };

  // Function to check if a task belongs to a specific date
  const isTaskOnDate = (task, dateString) => {
    try {
      if (!task.deadline) return false;
      
      // Create date objects and set them to midnight UTC for comparison
      const taskDate = new Date(task.deadline);
      taskDate.setUTCHours(0, 0, 0, 0);
      
      const compareDate = new Date(dateString);
      compareDate.setUTCHours(0, 0, 0, 0);
      
      // Check if either date is invalid
      if (isNaN(taskDate.getTime()) || isNaN(compareDate.getTime())) {
        return false;
      }
      
      // Compare the dates after normalizing to midnight UTC
      return taskDate.getTime() === compareDate.getTime();
    } catch (error) {
      console.error('Error comparing dates:', error);
      return false;
    }
  };

  // Function to format date for display
  const formatDate = (dateString, includeTime = true) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      
      if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
      }
      
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // Function to navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Function to navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg justify-center items-center gap-10">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mt-4">Task Calendar</h3>
        <button className="cursor-pointer" onClick={() => setShowModal(true)}>
          <FiPlus />
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Previous Month"
          >
            <FiChevronLeft />
          </button>
          <span className="font-semibold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </span>
          <button 
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Next Month"
          >
            <FiChevronRight />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {/* Empty cells for days before the first day of the month */}
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <div key={`empty-${index}`} className="h-10" />
          ))}
          {/* Days of the month */}
          {[...Array(daysInMonth).keys()].map((day) => {
            const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
              day + 1
            ).padStart(2, "0")}`;
            
            // Check if there are tasks for this date
            const hasTasks = tasks.some(task => isTaskOnDate(task, dateString));
            
            return (
              <button
                key={day}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedDate === dateString
                    ? "bg-blue-500 text-white"
                    : hasTasks 
                      ? "bg-blue-100 hover:bg-blue-200" 
                      : "hover:bg-gray-200"
                }`}
                onClick={() => handleDateClick(dateString)}
                title={hasTasks ? "View tasks for this date" : "Add task for this date"}
              >
                {day + 1}
                {hasTasks && (
                  <span className="absolute bottom-0 w-1 h-1 bg-blue-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-semibold">
          Tasks for {selectedDate ? formatDate(selectedDate, false) : 'No date selected'}
        </h3>
        <button
          onClick={() => setSelectedDate(null)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Clear
        </button>
      </div>
      <div>
        <div className="bg-white p-4 rounded-lg shadow mt-4">
          {selectedDate && tasks.filter((task) => isTaskOnDate(task, selectedDate)).length ? (
            tasks
              .filter((task) => isTaskOnDate(task, selectedDate))
              .map((task) => (
                <div
                  key={task._id}
                  className="p-3 mb-2 shadow-xl rounded flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-semibold">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex gap-2 mt-1">
                      {task.category && (
                        <span className="px-2 py-1 text-xs bg-gray-200 rounded">
                          {task.category}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="text-xs text-gray-500">
                        Deadline: {formatDate(task.deadline)}
                      </span>
                      {task.reminderTime && (
                        <span className="text-xs text-gray-500">
                          Reminder: {formatDate(task.reminderTime)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      task.priority === "High"
                        ? "bg-red-600"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  ></span>
                </div>
              ))
          ) : (
            <p className="text-gray-500">No tasks for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar; 
