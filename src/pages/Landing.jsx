import { NavLink } from 'react-router-dom';
import '../css/landing.css';
import bellIcon from '../assets/icons/bell.svg';
import lightIcon from '../assets/icons/light.svg';
import forwardIcon from '../assets/icons/forward.svg';
import homeIcon from '../assets/icons/home.svg';
import settingIcon from '../assets/icons/setting.svg';
import boardIcon from '../assets/icons/board.svg';
import teamsIcon from '../assets/icons/teams.svg';
import analyticsIcon from '../assets/icons/analytics.svg';
import plusIcon from '../assets/icons/plus.svg';
import userIcon from '../assets/icons/user.svg';
import TaskCard from '../components/TaskCard';
import { useState } from 'react';
import ProfileModal from '../components/CreateTaskModal';
export default function Landing() {
  const [tasks, setTasks] = useState({
    toDo: [{ id: 1, text: 'Implement User Authentication' }],
    underReview: [{ id: 2, text: 'Design Home Page UI' }],
    inProgress: [{ id: 3, text: 'Integrate Cloud Storage' }],
    finished: [{ id: 4, text: 'Conduct User Feedback Survey' }]
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleTaskUpdate = (sourceStatus, updatedSourceTasks, targetStatus, updatedTargetTasks) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [sourceStatus]: updatedSourceTasks,
      [targetStatus]: updatedTargetTasks
    }));
  };

  return (
    <>
      <div className="home">
        <nav className="navbar">
          <span className="user-header">
            <img src={userIcon} alt="" />
            <p className="user-name">Shubh Arya</p>
          </span>

          <div className="shortcuts">
            <span className="shortcut-icons">
              <img src={bellIcon} alt="" />
              <img src={lightIcon} alt="" />
              <img src={forwardIcon} alt="" />
            </span>
            <button className="logout-btn">Logout</button>
          </div>
          <div className="links">
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <span className={isActive ? 'active-link' : 'link'}>
                  <img src={homeIcon} alt="" />
                  Home
                </span>
              )}
            </NavLink>
            <NavLink to="/boards" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <span className={isActive ? 'active-link link' : 'link'}>
                  <img src={boardIcon} alt="" /> Boards
                </span>
              )}
            </NavLink>
            <NavLink to="/settings" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <span className={isActive ? 'active-link' : 'link'}>
                  {' '}
                  <img src={settingIcon} alt="" />
                  Settings
                </span>
              )}
            </NavLink>
            <NavLink to="/teams" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <span className={isActive ? 'active-link' : 'link'}>
                  <img src={teamsIcon} alt="" /> Teams
                </span>
              )}
            </NavLink>
            <NavLink to="/analytics" style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <span className={isActive ? 'active-link' : 'link'}>
                  <img src={analyticsIcon} alt="" /> Analytics
                </span>
              )}
            </NavLink>
            <button className="create-task-btn">
              Create new task <img src={plusIcon} alt="" />
            </button>
          </div>
        </nav>
        <main className="main-content">
          <h4>Good Morning Shubh!</h4>
          <div className="features">
            <div>
              <h3>Introducing Tags</h3>
              <p>
                Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient
              </p>
            </div>
            <div>
              <h3>Share Notes Instantly</h3>
              <p>
                Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing
                options.
              </p>
            </div>
            <div>
              <h3>Access Anywhere</h3>
              <p>
                Sync your notes across all devices. Stay productive whether youre on your phone, tablet, or computer.
              </p>
            </div>
          </div>
          <div className="filters">
            <input type="text" name="" id="" placeholder="Search" />
            <div className="filter-btns">
              <button>Calender View</button>
              <button>Automation</button>
              <button>Filter</button>
              <button>Share</button>
              <button onClick={() => setIsOpen(true)}>Create new +</button>
            </div>
          </div>
          <div className="task-manager">
            {['toDo', 'inProgress', 'underReview', 'finished'].map((status) => (
              <div key={status}>
                <TaskCard key={status} status={status} tasks={tasks} onTaskUpdate={handleTaskUpdate} />
              </div>
            ))}
          </div>
          {isOpen && <ProfileModal closeModal={setIsOpen} />}
        </main>
      </div>
    </>
  );
}
