import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import CreateTaskModal from '../components/CreateTaskModal';
import { taskContext } from '../context/TaskContextProvider';
import { authContext } from '../context/AuthContextProvider';
import { getTimeOfDay, notify } from '../components/utils';
import bellIcon from '../assets/icons/bell.svg';
import lightIcon from '../assets/icons/light.svg';
import forwardIcon from '../assets/icons/forward.svg';
import homeIcon from '../assets/icons/home.svg';
import settingIcon from '../assets/icons/setting.svg';
import boardIcon from '../assets/icons/board.svg';
import teamsIcon from '../assets/icons/teams.svg';
import analyticsIcon from '../assets/icons/analytics.svg';
import filterIcon from '../assets/icons/filter.svg';
import sharingIcon from '../assets/icons/share-icon.svg';
import plusIcon from '../assets/icons/plus.svg';
import automationIcon from '../assets/icons/automation.svg';
import userIcon from '../assets/icons/user.svg';
import helpIcon from '../assets/icons/help.svg';
import calenderIcon from '../assets/icons/calender.svg';
import shareIcon from '../assets/icons/share.svg';
import accessIcon from '../assets/icons/access.svg';
import tagsIcon from '../assets/icons/tags.svg';
import TaskCard from '../components/TaskCard';
import '../css/landing.css';

export default function Landing() {
  const { tasks, setTasks, getAllTasks, updateTask, isOpen, setIsOpen } = useContext(taskContext);
  const { logoutUser } = useContext(authContext);
  const customerInfo = JSON.parse(localStorage.getItem('user'));

  const handleTaskUpdate = async ({ targetStatus, taskId, event: e }) => {
    const updateResponse = await updateTask(taskId, targetStatus);
    if (updateResponse) {
      const response = await getAllTasks();
      setTasks(response);
      notify(e, 'update-success');
    } else {
      notify(e, 'update-failure');
    }
  };
  useEffect(() => {
    const fetchTasks = async () => {
      await getAllTasks();
    };
    fetchTasks();
  }, []);

  return (
    <>
      <div className="home">
        <nav className="navbar">
          <span className="user-header">
            <img src={userIcon} alt="" />
            <p className="user-name">{customerInfo.fullName || 'John Doe'}</p>
          </span>

          <div className="shortcuts">
            <span className="shortcut-icons">
              <img src={bellIcon} alt="" />
              <img src={lightIcon} alt="" />
              <img src={forwardIcon} alt="" />
            </span>
            <button className="logout-btn" onClick={() => logoutUser()}>
              Logout
            </button>
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
            <button className="create-task-btn" onClick={() => setIsOpen(true)}>
              Create new task <img src={plusIcon} alt="" />
            </button>
          </div>
        </nav>
        <main className="main-content">
          <div className="header">
            {' '}
            <h2 className="main-heading">
              Good {getTimeOfDay()}, {customerInfo.fullName.split(' ')[0] || 'John'}!
            </h2>
            <span className="user-header">
              <p>Help & Feedback</p>
              <img src={helpIcon} alt="" />
            </span>
          </div>

          <div className="features">
            <div className="feature">
              <img src={tagsIcon} alt="" />
              <span>
                <h4 className="feature-heading">Introducing tags</h4>
                <p className="feature-desc">
                  Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient
                </p>
              </span>
            </div>
            <div className="feature">
              <img src={shareIcon} alt="" />
              <span>
                <h4 className="feature-heading">Share Notes Instantly</h4>
                <p className="feature-desc">
                  Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing
                  options.
                </p>
              </span>
            </div>
            <div className="feature">
              <img src={accessIcon} alt="" />
              <span>
                <h4 className="feature-heading">Access Anywhere</h4>
                <p className="feature-desc">
                  Sync your notes across all devices. Stay productive whether youre on your phone, tablet, or computer.
                </p>
              </span>
            </div>
          </div>
          <div className="filters">
            <input type="text" name="" id="" placeholder="Search" className="search" />
            <div className="filter-btns">
              <button className="filter-btn">
                {' '}
                Calender View
                <img src={calenderIcon} alt="" />
              </button>
              <button className="filter-btn">
                Automation <img src={automationIcon} alt="" />
              </button>
              <button className="filter-btn">
                Filter <img src={filterIcon} alt="" />
              </button>
              <button className="filter-btn">
                Share <img src={sharingIcon} alt="" />
              </button>
              <button className="create-task-btn2" onClick={() => setIsOpen(true)}>
                Create new <img src={plusIcon} alt="" />
              </button>
            </div>
          </div>
          <div className="task-manager">
            {[
              { status: 'toDo', heading: 'To Do' },
              { status: 'inProgress', heading: 'In Progress' },
              { status: 'underReview', heading: 'Under Review' },
              { status: 'finished', heading: 'Finished' }
            ].map((obj) => (
              <div key={obj.status} className="task-bar">
                <TaskCard
                  key={obj.status}
                  status={obj.status}
                  tasks={tasks}
                  onTaskUpdate={handleTaskUpdate}
                  heading={obj.heading}
                />
              </div>
            ))}
          </div>
          {isOpen && <CreateTaskModal closeModal={setIsOpen} />}
        </main>
      </div>
    </>
  );
}
