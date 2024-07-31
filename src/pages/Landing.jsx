import { NavLink } from 'react-router-dom';
import '../css/landing.css';
export default function Landing() {
  return (
    <>
      <div className="home">
        <nav className="navbar">
          <h3>Shubh Arya</h3>
          <div className="links">
            <NavLink
              style={{
                textDecoration: 'none'
              }}
              to="/"
            >
              {<span className="">Home</span>}
            </NavLink>
            <NavLink
              style={{
                textDecoration: 'none'
              }}
              to="/explore"
            >
              {<span className=""> Boards</span>}
            </NavLink>
            <NavLink to="/bookmark">{<span className=""> Settings</span>}</NavLink>
            <NavLink to="/profile">{<span className=""> Teams</span>}</NavLink>
            <NavLink to="/profile">{<span className=""> Analytics</span>}</NavLink>
            <button className="create-post-btn">Create new Task +</button>
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
            <input type="text" name="" id="" />
            <div className="filter-btns">
              <button>Calender View</button>
              <button>Automation</button>
              <button>Filter</button>
              <button>Share</button>
              <button>Create new +</button>
            </div>
          </div>
          <div className="task-manager">
            <div>
              <h2>To do</h2>
              <div className="task-card"></div>
              <button>Add new +</button>
            </div>
            <div>
              <h2>In Progress</h2>
              <div className="task-card"></div>
              <button>Add new +</button>
            </div>
            <div>
              <h2>Under Review</h2>
              <div className="task-card"></div>
              <button>Add new +</button>
            </div>
            <div>
              <h2>Finished</h2>
              <div className="task-card"></div>
              <button>Add new +</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
