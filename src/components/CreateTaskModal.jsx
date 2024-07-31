/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { taskContext } from '../context/TaskContextProvider';
import { notify } from './utils';
import statusIcon from '../assets/icons/status.svg';
import priorityIcon from '../assets/icons/priority.svg';
import calenderIcon from '../assets/icons/calender.svg';
import shareIcon from '../assets/icons/share-icon.svg';
import favoriteIcon from '../assets/icons/favorite.svg';
import descriptionIcon from '../assets/icons/description.svg';
import '../css/createtaskmodal.css';

export default function CreateTaskModal({ closeModal }) {
  const { createTask, setTasks, getAllTasks } = useContext(taskContext);
  const [task, setTask] = useState({});
  function inputHandler(e) {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  }
  async function submitTask(e) {
    const createResponse = await createTask(task);
    if (createResponse) {
      const response = await getAllTasks();
      setTasks(response);
      closeModal(false);
      notify(e, 'task-success');
    } else {
      notify(e, 'task-failure');
    }
  }
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      <div
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          opacity: '0.5',
          backgroundColor: 'grey'
        }}
      ></div>
      <div className="modal-background">
        <div className="modal-container">
          <div className="header">
            <button className="close-btn" onClick={() => closeModal(false)}>
              X
            </button>
            <div className="filter-btns">
              <button className="filter-btn">
                Share
                <img src={shareIcon} alt="" />
              </button>
              <button className="filter-btn">
                Favorite <img src={favoriteIcon} alt="" />
              </button>
            </div>
          </div>
          <div className="modal-header">
            <label htmlFor="title" style={{ color: 'black' }}></label>
            <input
              type="text"
              name="title"
              id="title"
              className="title"
              placeholder="Title"
              onChange={(e) => inputHandler(e)}
            />
          </div>
          <div className="modal-body">
            <div className="task-field">
              <img src={statusIcon} alt="" />
              <h4 className="field-heading">Status</h4>
              <select name="status" id="" className="status" onChange={(e) => inputHandler(e)}>
                <option value="" defaultValue="Not Selected">
                  Not Selected
                </option>
                <option value="toDo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="underReview">Under Review</option>
                <option value="finished">Finished</option>
              </select>
            </div>
            <div className="task-field">
              <img src={priorityIcon} alt="" />
              <h4 className="field-heading">Priority</h4>
              <select name="priority" id="" className="status" onChange={(e) => inputHandler(e)}>
                <option value="" defaultValue="Not Selected">
                  Not Selected
                </option>
                <option value="urgent">Urgent</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="task-field">
              <img src={calenderIcon} alt="" />
              <h4 className="field-heading">Deadline</h4>
              <input type="date" name="deadline" id="" onChange={(e) => inputHandler(e)} />
            </div>
            <div className="task-field">
              <img src={descriptionIcon} alt="" />
              <h4 className="field-heading">Description</h4>
              <input
                type="text"
                name="description"
                id=""
                placeholder="Start typing..."
                onChange={(e) => inputHandler(e)}
              />
            </div>
            <p>+ Add custom property</p>
          </div>
          <div className="modal-footer">
            <button onClick={(e) => submitTask(e)} className="cancel-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
