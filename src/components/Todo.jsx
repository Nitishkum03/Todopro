import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { taskApi } from '../services/api';

import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';
import TaskList from './TaskList';
import TaskCalendar from './TaskCalendar';
import TaskDistributionChart from './TaskDistributionChart';
import TaskModal from './TaskModal';

export default function TaskMaster() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const [loading, setLoading] = useState(true);

  const now = new Date();

  const loggedInUser = localStorage.getItem("loggedInUser");
  useEffect(() => {
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setIsAuthenticated(true);
      console.log("User logged in:", JSON.parse(loggedInUser));
    } else {
      setUser(null);
      setIsAuthenticated(false);
      console.log("No user logged in");
    }
  }, [loggedInUser]);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        console.log("Fetching tasks...");
        console.log("Auth token:", localStorage.getItem('token'));
        const fetchedTasks = await taskApi.getAllTasks();
        console.log("Fetched tasks:", fetchedTasks);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error details:", error.response || error);
        toast.error(`Failed to fetch tasks: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      console.log("User is authenticated, fetching tasks");
      fetchTasks();
    } else {
      console.log("User is not authenticated, not fetching tasks");
    }
  }, [isAuthenticated]);

  // Count overdue tasks
  const overdueCount = tasks.filter(
    (task) => {
      const deadline = new Date(task.deadline);
      return deadline < now && task.status !== "Completed";
    }
  ).length;

  // Prepare task data grouped by category
  const categories = ["Work", "Personal", "Shopping", "Health"];
  const categoryData = categories.map((cat) => ({
    name: cat,
    value: tasks.filter((task) => task.category === cat).length,
  }));

  // Add overdue slice
  const pieData = [...categoryData, { name: "Overdue", value: overdueCount }];

  // Define colors (same order)
  const COLORS = ["#3b82f6", "#10b981", "#f97316", "#a855f7", "#ef4444"];

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: new Date().toISOString(),
    reminderTime: new Date().toISOString(),
    priority: "Low",
    category: "",
    status: "Active",
  });

  const addTasknew = async () => {
    if (!newTask.title.trim() || !newTask.category.trim()) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      console.log("Creating new task:", newTask);
      const createdTask = await taskApi.createTask(newTask);
      console.log("Created task:", createdTask);
      setTasks([...tasks, createdTask]);
      setNewTask({
        title: "",
        description: "",
        deadline: new Date().toISOString(),
        reminderTime: new Date().toISOString(),
        priority: "Low",
        category: "",
        status: "Active",
      });
      setShowModal(false);
      toast.success("Task added Successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(`Failed to add task: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
  };

  const toggleStatus = async (taskId) => {
    try {
      console.log("Toggling status for task:", taskId);
      const updatedTask = await taskApi.toggleTaskStatus(taskId);
      console.log("Updated task:", updatedTask);
      setTasks(tasks.map(task => 
        task._id === taskId ? updatedTask : task
      ));
    } catch (error) {
      console.error("Error toggling task status:", error);
      toast.error(`Failed to update task status: ${error.response?.data?.message || error.message}`);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "All") return true;
      if (filter === "Active" || filter === "Completed") {
        return task.status === filter;
      }
      return task.category === filter;
    })
    .filter((task) => {
      const term = searchTerm.toLowerCase();
      return (
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      );
    });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500 border-red-300";
      case "Medium":
        return "text-yellow-500 border-yellow-300";
      case "Low":
      default:
        return "text-blue-500 border-blue-300";
    }
  };

  const deletetask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      console.log("Deleting task:", taskId);
      await taskApi.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(`Failed to delete task: ${error.response?.data?.message || error.message}`);
    }
  };

  // Function to change the current view
  const changeView = (view) => {
    setCurrentView(view);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Sidebar 
        filter={filter}
        setFilter={setFilter}
        handleLogout={handleLogout}
      />

      <main className="flex-1 p-6 ml-16 overflow-auto">
        <HeaderBar
          filter={filter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowModal={setShowModal}
          currentView={currentView}
          changeView={changeView}
        />

        {currentView === "list" && (
          <TaskList
            filteredTasks={filteredTasks}
            toggleStatus={toggleStatus}
            deletetask={deletetask}
            getPriorityColor={getPriorityColor}
          />
        )}

        {currentView === "calendar" && (
          <TaskCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            tasks={tasks}
            setShowModal={setShowModal}
            setNewTask={setNewTask}
          />
        )}

        {currentView === "chart" && (
          <TaskDistributionChart
            tasks={tasks}
          />
        )}

        <TaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          newTask={newTask}
          setNewTask={setNewTask}
          addTasknew={addTasknew}
        />
      </main>
    </div>
  );
}