import React from 'react';

const TaskModal = ({ showModal, setShowModal, newTask, setNewTask, addTasknew }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="p-6 rounded-lg shadow-lg bg-white w-96">
        <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="w-full p-2 border rounded mb-2"
        />
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">Deadline</label>
          <input
            type="datetime-local"
            value={newTask.deadline.slice(0, 16)}
            onChange={(e) => setNewTask({ ...newTask, deadline: new Date(e.target.value).toISOString() })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">Reminder Time</label>
          <input
            type="datetime-local"
            value={newTask.reminderTime.slice(0, 16)}
            onChange={(e) => setNewTask({ ...newTask, reminderTime: new Date(e.target.value).toISOString() })}
            className="w-full p-2 border rounded"
          />
        </div>
        <label className="text-sm text-gray-600">Priority</label>
        <select
          value={newTask.priority}
          onChange={(e) =>
            setNewTask({ ...newTask, priority: e.target.value })
          }
          className="w-full p-2 border rounded mb-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <label className="text-sm text-gray-600">Category</label>
        <select
          value={newTask.category}
          onChange={(e) =>
            setNewTask({ ...newTask, category: e.target.value })
          }
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
        </select>
        <label className="text-sm text-gray-600">Status</label>
        <select
          value={newTask.status}
          onChange={(e) =>
            setNewTask({ ...newTask, status: e.target.value })
          }
          className="w-full p-2 border rounded mb-4"
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={addTasknew}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal; 
