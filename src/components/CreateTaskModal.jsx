/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import statusIcon from '../assets/icons/status.svg';
import priorityIcon from '../assets/icons/priority.svg';
import calenderIcon from '../assets/icons/calender.svg';
import descriptionIcon from '../assets/icons/description.svg';
import '../css/profilemodal.css';

export default function ProfileModal({ closeModal }) {
  //   const { state } = useContext(postContext);
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
            <div>
              <button>Share</button>
              <button>Favorite</button>
            </div>
          </div>
          <div className="modal-header">
            <label htmlFor="firstName" style={{ color: 'black' }}></label>
            <input type="text" name="firstName" id="firstName" className="title" placeholder="Title" />
          </div>
          <div className="modal-body">
            <div className="task-field">
              <img src={statusIcon} alt="" />

              <h4>Status</h4>
              <select name="" id="" className="status">
                <option value="toDo" defaultValue="Not Selected">
                  Not Selected
                </option>
                <option value="toDo">To Do</option>
                <option value="toDo">In Progress</option>
                <option value="toDo">Under Review</option>
                <option value="toDo">Finished</option>
              </select>
            </div>
            <div className="task-field">
              <img src={priorityIcon} alt="" />
              <h4>Priority</h4>
              <select name="" id="" className="status">
                <option value="toDo" defaultValue="Not Selected">
                  Not Selected
                </option>
                <option value="toDo">Urgent</option>
                <option value="toDo">Medium</option>
                <option value="toDo">Low</option>
              </select>
            </div>
            <div className="task-field">
              <img src={calenderIcon} alt="" />
              <h4>Deadline</h4>
              <input type="date" name="" id="" />
            </div>
            <div className="task-field">
              <img src={descriptionIcon} alt="" />
              <h4>Description</h4>
              <input type="text" name="" id="" placeholder="Start typing..." />
            </div>
            <p>+ Add custom property</p>
          </div>
          <div className="modal-footer">
            <button onClick={() => closeModal(false)} className="cancel-btn">
              Save
            </button>
            {/* <button onClick={() => saveProfile()}>Update Profile</button> */}
          </div>
        </div>
      </div>
    </>
  );
}
