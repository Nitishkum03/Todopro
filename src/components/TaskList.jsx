import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ filteredTasks, toggleStatus, deletetask, getPriorityColor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          index={index}
          toggleStatus={toggleStatus}
          deletetask={deletetask}
          getPriorityColor={getPriorityColor}
        />
      ))}
    </div>
  );
};

export default TaskList; 
