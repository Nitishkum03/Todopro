import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TaskDistributionChart = ({ tasks }) => {
  const [chartType, setChartType] = useState('category'); // 'category' or 'priority'

  // Prepare category data
  const categories = ["Work", "Personal", "Shopping", "Health"];
  const categoryData = categories.map((cat) => ({
    name: cat,
    value: tasks.filter((task) => task.category === cat).length,
  }));

  // Prepare priority data
  const priorities = ["High", "Medium", "Low"];
  const priorityData = priorities.map((priority) => ({
    name: priority,
    value: tasks.filter((task) => task.priority === priority).length,
  }));

  // Define colors for categories
  const CATEGORY_COLORS = ["#3b82f6", "#10b981", "#f97316", "#a855f7"];
  
  // Define colors for priorities
  const PRIORITY_COLORS = ["#ef4444", "#f97316", "#3b82f6"];

  const currentData = chartType === 'category' ? categoryData : priorityData;
  const currentColors = chartType === 'category' ? CATEGORY_COLORS : PRIORITY_COLORS;

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              chartType === 'category'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setChartType('category')}
          >
            By Category
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              chartType === 'priority'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setChartType('priority')}
          >
            By Priority
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={currentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {currentData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={currentColors[index % currentColors.length]}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value} tasks`, name]}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskDistributionChart; 
