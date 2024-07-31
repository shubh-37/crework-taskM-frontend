import showMoreIcon from '../assets/icons/show-more.svg';
import clockIcon from '../assets/icons/clock.svg';
import '../css/taskcard.css';
import moment from 'moment';

export default function TaskCard({ status, tasks, onTaskUpdate, heading }) {
  function handleOnDragStart(e, taskId) {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceStatus', status);
  }

  function handleOnDrop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const sourceStatus = e.dataTransfer.getData('sourceStatus');

    if (sourceStatus !== status) {
      onTaskUpdate({
        sourceStatus,
        targetStatus: status,
        taskId
      });
    }
  }

  function handleOnDragOver(e) {
    e.preventDefault();
  }

  return (
    <div onDrop={handleOnDrop} onDragOver={handleOnDragOver} className="task-column">
      <span className="status-header">
        <h4>{heading}</h4>
        <img src={showMoreIcon} alt="Show more" />
      </span>

      {tasks[status]?.map((task, index) => (
        <div
          className="task-card"
          key={task._id}
          draggable
          onDragStart={(e) => handleOnDragStart(e, task._id, index)}
          data-index={index}
        >
          <h4 className="task-heading">{task.taskTitle}</h4>
          <p className="task-desc">{task.description}</p>
          <p className={`priority ${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </p>
          <p className="deadline">
            <img src={clockIcon} alt="Clock" />
            {moment(task.deadline).format('YYYY-MM-DD')}
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
