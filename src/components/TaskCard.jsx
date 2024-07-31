/* eslint-disable react/prop-types */
import showMoreIcon from '../assets/icons/show-more.svg';
import clockIcon from '../assets/icons/clock.svg';
import '../css/taskcard.css';
export default function TaskCard({ status, tasks, onTaskUpdate, heading }) {
  // Handle drag start by setting the taskId, sourceStatus, and draggedIndex in dataTransfer
  function handleOnDragStart(e, taskId, index) {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceStatus', status);
    e.dataTransfer.setData('draggedIndex', index);
  }

  // Handle drop event
  function handleOnDrop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const sourceStatus = e.dataTransfer.getData('sourceStatus');
    const draggedIndex = parseInt(e.dataTransfer.getData('draggedIndex'));
    const dropIndex = parseInt(e.target.dataset.index);

    if (sourceStatus === status) {
      // Reordering within the same column
      const updatedTasks = [...tasks[status]];
      const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(dropIndex, 0, draggedTask);

      // Update state in the parent component
      onTaskUpdate(status, updatedTasks);
    } else {
      // Moving tasks between columns
      const updatedSourceTasks = tasks[sourceStatus].filter((t) => t.id !== parseInt(taskId));
      const task = tasks[sourceStatus].find((t) => t.id === parseInt(taskId));
      const updatedTargetTasks = [...tasks[status], task];
      onTaskUpdate(sourceStatus, updatedSourceTasks, status, updatedTargetTasks);
    }
  }

  // Prevent default behavior to allow dropping
  function handleOnDragOver(e) {
    e.preventDefault();
  }

  return (
    <div onDrop={handleOnDrop} onDragOver={handleOnDragOver} className="task-column">
      <span className="status-header">
        <h4>{heading}</h4>
        <img src={showMoreIcon} alt="" />
      </span>

      {tasks[status].map((task, index) => (
        <div
          className="task-card"
          key={task.id}
          draggable
          onDragStart={(e) => handleOnDragStart(e, task.id, index)}
          data-index={index}
        >
          <h4 className="task-heading">{task.title}</h4>
          <p className="task-desc">{task.desc}</p>
          <p className={`priority ${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </p>
          <p className="deadline">
            <img src={clockIcon} alt="" />
            {task.deadline}
          </p>
          <p>1 hr ago</p>
        </div>
      ))}
      <button className="add-new-btn">
        <span>Add new</span>
        <span>+</span>
      </button>
    </div>
  );
}
